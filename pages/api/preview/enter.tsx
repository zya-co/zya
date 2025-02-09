import { isUserAuthorized } from '@tinacms/auth'

const handler = async (req, res) => {
  if (process.env.TINA_PUBLIC_IS_LOCAL === 'true') {
    // Enter preview-mode in local development
    res.setPreviewData({})
    return res.redirect(req.query.slug || '/')
  }

  // Check TinaCloud token
  const isAuthorizedRes = await isUserAuthorized({
    token: `Bearer ${req.query.token}`,
    clientID: process.env.NEXT_PUBLIC_TINA_CLIENT_SECRET || '',
  })

  if (isAuthorizedRes) {
    res.setPreviewData({})
    return res.redirect(req.query.slug)
  }

  return res.status(401).json({ message: 'Invalid token' })
}

export default handler