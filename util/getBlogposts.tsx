import { client } from '../tina/__generated__/client'

export const getBlogposts = async ({ preview }) => {
  // by default get non-draft posts
  let filter = { isDraft: { eq: false } } as any

  // if preview-mode is enabled, get all posts
  if (preview) {
    filter = {} as any
  }
  return client.queries.blogpostConnection({
    filter,
  })
}