import React from "react";
import { useState } from "react";
import { useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import { Blocks } from "../components/Blocks";
import { Navigation } from '../components/navigation/Navigation'
import { Footer } from "../components/footer/Footer";


export default function Home(props) {

  const [navColor, setNavColor] = useState('dark') 

  // data passes through in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <>
      <Navigation navData={props.nav} color={navColor} />
      <Blocks blocks={data.page.blocks} />
      <Footer navData={props.nav} />
    </>
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
