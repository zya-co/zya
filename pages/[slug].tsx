import React from "react";
import { useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import { Blocks } from "../components/Blocks";
import { Layout } from "../components/Layout";
// import { ScrollSmooth } from "../components/ScrollSmooth";
import FooterLinks from "../components/footer/FooterLinks";

export default function Page(props) {

  // data passes through in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout
      description={data?.page?.meta?.description}
      title={data?.page?.meta?.title}
      metaimg={data?.page?.meta?.image}
    >
      {/* <ScrollSmooth> */}
        <Blocks blocks={data.page.blocks} latestposts={props.latestposts} />
        <FooterLinks navData={props.footerNav} />
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

  const blogpostsResponse = await client.queries.blogpostConnection({ 
    filter: { isDraft: { eq: false } }
   });
  
  let latestBlogPosts = blogpostsResponse.data.blogpostConnection.edges?.map((edge) => {
    return {
      title: edge?.node?.meta?.title,
      description: edge?.node?.meta?.description,
      image: edge?.node?.meta?.image,
      category: edge?.node?.meta?.category,
      author: edge?.node?.meta?.author,
      date: edge?.node?.meta?.date,
      filename: edge?.node?._sys.filename,
    };
  });

  
  latestBlogPosts?.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (a.date) {
      return -1;
    } else if (b.date) {
      return 1;
    } else if (a.filename && b.filename) {
      return a.filename.localeCompare(b.filename);
    }
    else {
      return 0;
    }
  });
  
  const mainNav = await client.queries.navigation({ relativePath: 'mainnav.mdx'})
  const footerNav = await client.queries.navigation({ relativePath: 'footer.mdx'})

  return {
    props: {
      data,
      query,
      variables,
      nav: mainNav,
      footerNav: footerNav,
      latestposts: latestBlogPosts,
    },
  };
};