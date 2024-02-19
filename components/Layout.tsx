import Head from 'next/head'

export const Layout = (props) => {

  const meta = {
    title: props.title || 'Zya Enzymes',
    description: props.description || 'The transformative power of enzymes',
    metaimg: props.metaimg || '/favicon.ico'
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.metaimg} />
      </Head>
          {props.children}
    </>
  )
}
