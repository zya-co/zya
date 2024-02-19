import React from "react";
import { useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import { Blocks } from "../components/Blocks";
import { Navigation } from '../components/navigation/Navigation'
import { Footer } from "../components/footer/Footer";
import { Layout } from "../components/Layout";
import { HeroHome } from "../components/blocks/HeroHome";
// import { ScrollSmooth } from "../components/ScrollSmooth";

export default function Home(props) {

  // data passes through in production mode and data is updated to the sidebar data in edit-mode
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

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.page({
    relativePath: "home.mdx",
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
