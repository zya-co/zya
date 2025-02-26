import React from "react";
import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";
import { Blocks } from "../../components/Blocks";
import { Footer } from "../../components/footer/Footer";
import FooterLinks from "../../components/footer/FooterLinks";
import { Layout } from "../../components/Layout";

export default function Page(props) {

  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout
      description={data?.blogpost?.meta?.description}
      title={data?.blogpost?.meta?.title}Layout
      metaimg={data?.blogpost?.meta?.image}
      nofollow={data?.blogpost?.isDraft}
      noSmooth
    >
        {/* <pre>{JSON.stringify(data?.blogpost?.blocks, null, 2)}</pre> */}
        <Blocks blocks={data?.blogpost?.blocks} navData={props.nav} />
        <Footer navData={props.nav} />
        <FooterLinks navData={props.footerNav} />
    </Layout>
  );
}

export const getStaticPaths = async ({ preview = false }) => {
  const blogpostsResponse = await client.queries.blogpostConnection();
  
  const pageslugs = blogpostsResponse.data.blogpostConnection.edges?.map((edge) => {
    return `/blog/${edge?.node?._sys.filename}`;
  })

  return {
    paths: pageslugs,
    fallback: "blocking",
  };
}

export const getStaticProps = async ({ params, preview = false }) => {

  const { data, query, variables } = await client.queries.blogpost({
    relativePath: `/${params.slug}.mdx`,
  });

  const mainNav = await client.queries.navigation({ relativePath: 'mainnav.mdx'})
  const footerNav = await client.queries.navigation({ relativePath: 'footer.mdx'})

  return {
    // the post is not found if its a draft and the preview is false
    // notFound: data?.blogpost?.isDraft && !preview,
    props: {
      preview,
      data,
      query,
      variables,
      footerNav: footerNav,
      nav: mainNav,
    },
  };
};