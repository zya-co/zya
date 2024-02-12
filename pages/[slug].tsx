import React from "react";
import { useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import { useRouter } from "next/router";

export default function Page(props) {

  const router = useRouter();
  if (router.isFallback)  return <div>Loading...</div>;

  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <>
      Yes
    </>
  );
}

export const getStaticPaths = async () => {
  const pagesResponse = await client.queries.pageConnection()

  const pageslugs = pagesResponse.data.pageConnection.edges?.map((edge) => {
    return `/${edge?.node?._sys.filename}`;
  })


  // console.log(JSON.stringify(pageslugs));

  return {
    paths: pageslugs,
    fallback: true,
  };
}

export const getStaticProps = async ({ params }) => {
  const { data, query, variables } = await client.queries.page({
    relativePath: `${params.slug}.mdx`,
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
