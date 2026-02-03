import type { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath } from "next/cache";

/**
 * Maps Tina Cloud webhook content paths to site URL paths for on-demand revalidation.
 * This avoids full Netlify rebuilds when content changes in Tina.
 */
function tinaPathsToSitePaths(tinaPaths: string[]): string[] {
  const sitePaths = new Set<string>();

  for (const raw of tinaPaths) {
    const p = raw.replace(/\.mdx?$/, "").trim();
    // content/page/home -> / and /home
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
    // content/navigation/* -> revalidate root and dynamic routes so nav/footer refresh
    else if (p.startsWith("content/navigation/")) {
      sitePaths.add("/");
      sitePaths.add("/home");
    }
  }

  return Array.from(sitePaths);
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

  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
  // Tina Cloud webhook payload: { clientId, branch, paths: string[], type, eventId }
  const paths: string[] = Array.isArray(body.paths) ? body.paths : [];

  if (paths.length === 0) {
    return res.json({
      revalidated: true,
      message: "No paths to revalidate",
      revalidatedPaths: [],
    });
  }

  const sitePaths = tinaPathsToSitePaths(paths);
  const revalidated: string[] = [];

  for (const path of sitePaths) {
    try {
      revalidatePath(path);
      revalidated.push(path);
    } catch (err) {
      console.error(`Revalidation failed for ${path}:`, err);
    }
  }

  // If any page or blog post changed, also revalidate the dynamic route patterns
  // so Next.js knows to regenerate those pages on next visit.
  const hasPage = paths.some((p) => p.startsWith("content/page/"));
  const hasBlog = paths.some((p) => p.startsWith("content/blog/"));
  if (hasPage) {
    try {
      revalidatePath("/[slug]", "page");
      revalidated.push("/[slug]");
    } catch (e) {
      /* optional */
    }
  }
  if (hasBlog) {
    try {
      revalidatePath("/blog/[slug]", "page");
      revalidated.push("/blog/[slug]");
    } catch (e) {
      /* optional */
    }
  }

  return res.json({
    revalidated: true,
    revalidatedPaths: [...new Set(revalidated)],
  });
}
