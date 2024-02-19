import React from "react";
import { useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import { useRouter } from "next/router";
import { Blocks } from "../components/Blocks";
import { Navigation } from '../components/navigation/Navigation'
import { Footer } from "../components/footer/Footer";
import { useState } from "react";
import { Layout } from "../components/Layout";
// import { ScrollSmooth } from "../components/ScrollSmooth";

export default function Page(props) {

  const [navColor, setNavColor] = useState('dark') 

  // const router = useRouter();
  // if (router.isFallback)  return <div>Loading...</div>;

  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout
    description={data.page.meta?.description}
    title={data.page.meta?.title}
    metaimg={data.page.meta?.image}
  >
      <Navigation navData={props.nav} current={props.data.page._sys.filename} />
      {/* <ScrollSmooth> */}
        <Blocks blocks={data.page.blocks} />
        <Footer navData={props.nav} />
      {/* </ScrollSmooth> */}
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const pagesResponse = await client.queries.pageConnection()

  const pageslugs = pagesResponse.data.pageConnection.edges?.map((edge) => {
    return `/${edge?.node?._sys.filename}`;
  })

  return {
    paths: pageslugs,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {

  const { data, query, variables } = await client.queries.page({
    relativePath: `${params.slug}.mdx`,
  });

  const mainNav = await client.queries.navigation({ relativePath: 'mainnav.mdx'})

  return {
    props: {
      data,
      query,
      variables,
      nav: mainNav
      //myOtherProp: 'some-other-data',
    },
  };
};