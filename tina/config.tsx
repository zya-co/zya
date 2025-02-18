import { defineConfig } from "tinacms";
import page from "./collections/page";
import navigation from "./collections/navigation";
import blogpost from "./collections/blogpost";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.NEXT_PUBLIC_TINA_CLIENT_SECRET,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "/media",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      page as any,
      navigation as any,
      blogpost as any, 
    ],
  },
  search: {
    tina: {
      indexerToken: process.env.NEXT_PUBLIC_TINA_SEARCH_TOKEN,
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
  cmsCallback: (cms) => {
    cms.flags.set('branch-switcher', true)
    return cms
  }
});
