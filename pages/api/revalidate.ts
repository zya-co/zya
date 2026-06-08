import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../tina/__generated__/client";

const LOCALE = "en";

/**
 * Maps Tina Cloud webhook content paths to site URL paths for on-demand revalidation.
 * This avoids full Netlify rebuilds when content changes in Tina.
 */
function tinaPathsToSitePaths(tinaPaths: string[]): string[] {
  const sitePaths = new Set<string>();

  for (const raw of tinaPaths) {
    const p = raw.replace(/\.mdx?$/, "").trim();
    // content/page/home -> /home (and / for the root rewrite)
    if (p.startsWith("content/page/")) {
      const slug = p.replace("content/page/", "");
      sitePaths.add(`/${slug}`);
      if (slug === "home") sitePaths.add("/");
    }
    // content/blog/... -> /blog/...
    else if (p.startsWith("content/blog/")) {
      const slug = p.replace("content/blog/", "");
      sitePaths.add(`/blog/${slug}`);
    }
    // content/navigation/* handled via global revalidation below
    else if (p.startsWith("content/navigation/")) {
      sitePaths.add("/");
      sitePaths.add("/home");
    }
  }

  return Array.from(sitePaths);
}

/** Next.js i18n builds pages under /en/... — revalidate must use that prefix. */
function localizedPath(path: string): string {
  if (path.startsWith(`/${LOCALE}`)) return path;
  if (path === "/") return `/${LOCALE}`;
  return `/${LOCALE}${path}`;
}

async function revalidatePath(
  res: NextApiResponse,
  path: string
): Promise<boolean> {
  const localized = localizedPath(path);
  try {
    await res.revalidate(localized);
    return true;
  } catch (err) {
    console.error(`Revalidation failed for ${localized}:`, err);
    return false;
  }
}

/** Nav and blog changes affect data fetched on every page (nav, latest posts). */
async function revalidateAllPages(res: NextApiResponse): Promise<string[]> {
  const paths = new Set<string>(["/", "/home"]);

  try {
    const pagesResponse = await client.queries.pageConnection();
    pagesResponse.data.pageConnection.edges?.forEach((edge) => {
      const slug = edge?.node?._sys.filename;
      if (slug) paths.add(`/${slug}`);
    });
  } catch (err) {
    console.error("Failed to fetch pages for revalidation:", err);
  }

  try {
    const blogResponse = await client.queries.blogpostConnection();
    blogResponse.data.blogpostConnection.edges?.forEach((edge) => {
      const slug = edge?.node?._sys.filename;
      if (slug) paths.add(`/blog/${slug}`);
    });
  } catch (err) {
    console.error("Failed to fetch blog posts for revalidation:", err);
  }

  const revalidated: string[] = [];
  for (const path of paths) {
    if (await revalidatePath(res, path)) {
      revalidated.push(localizedPath(path));
    }
  }
  return revalidated;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = process.env.REVALIDATION_SECRET;
  if (!secret) {
    console.error("REVALIDATION_SECRET is not set");
    return res.status(500).json({ error: "Revalidation not configured" });
  }

  const auth =
    req.headers.authorization?.replace("Bearer ", "") ||
    (req.headers["x-revalidate-secret"] as string) ||
    req.body?.secret ||
    req.query?.secret;
  if (auth !== secret) {
    return res.status(401).json({ error: "Invalid secret" });
  }

  const body =
    typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  // Tina Cloud webhook payload: { clientId, branch, paths: string[], type, eventId }
  const paths: string[] = Array.isArray(body.paths) ? body.paths : [];

  if (paths.length === 0) {
    return res.json({
      revalidated: true,
      message: "No paths to revalidate",
      revalidatedPaths: [],
    });
  }

  const needsGlobalRevalidation = paths.some(
    (p) =>
      p.startsWith("content/navigation/") || p.startsWith("content/blog/")
  );

  const revalidated: string[] = [];

  if (needsGlobalRevalidation) {
    revalidated.push(...(await revalidateAllPages(res)));
  }

  const sitePaths = tinaPathsToSitePaths(paths);
  for (const path of sitePaths) {
    const localized = localizedPath(path);
    if (revalidated.includes(localized)) continue;
    if (await revalidatePath(res, path)) {
      revalidated.push(localized);
    }
  }

  return res.json({
    revalidated: true,
    revalidatedPaths: [...new Set(revalidated)],
  });
}
