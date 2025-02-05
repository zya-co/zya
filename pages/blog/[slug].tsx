import React from "react";
import { useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";
import { Blocks } from "../../components/Blocks";
import { Navigation } from '../../components/navigation/Navigation'
import { Footer } from "../../components/footer/Footer";
import FooterLinks from "../../components/footer/FooterLinks";
import { Layout } from "../../components/Layout";
import { ScrollSmooth } from "../../components/ScrollSmooth";

export default function Page(props) {

  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout
    description={data.blogpost.meta?.description}
    title={data.blogpost.meta?.title}
    metaimg={data.blogpost.meta?.image}
  >
      <Navigation navData={props.nav} current={props.data.blogpost._sys.filename} />
      <ScrollSmooth>
        <Blocks blocks={data.blogpost.blocks} navData={props.nav} />
        {/* <pre>{JSON.stringify(data.blogpost.blocks, null, 2)}</pre> */}
        <Footer navData={props.nav} />
        <FooterLinks navData={props.footerNav} />
      </ScrollSmooth>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const pagesResponse = await client.queries.blogpostConnection()
  
  const pageslugs = pagesResponse.data.blogpostConnection.edges?.map((edge) => {
    return `/blog/${edge?.node?._sys.filename}`;
  })

  return {
    paths: pageslugs,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {

  const { data, query, variables } = await client.queries.blogpost({
    relativePath: `/${params.slug}.mdx`,
  });

  const mainNav = await client.queries.navigation({ relativePath: 'mainnav.mdx'})
  const footerNav = await client.queries.navigation({ relativePath: 'footer.mdx'})

  return {
    props: {
      data,
      query,
      variables,
      footerNav: footerNav,
      nav: mainNav,
    },
  };
};