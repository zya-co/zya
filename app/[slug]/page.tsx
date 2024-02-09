import React from "react";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { cache } from 'react'

export default function Page(params) {
 
  // const { data } = useTina({
  //   query: props.query,
  //   variables: props.variables,
  //   data: props.data,
  // });

  return <>
    <h1>Hello, SlugPage!</h1>
    { JSON.stringify(params) }
  </>
}


export async function generateStaticParams() {
  // const pageListResponse = await client.queries.pageConnection();
  // const pageList =  pageListResponse.data.pageConnection.edges?.map((page) => {
  //   return {
      
  //       slug: page?.node?._sys.filename, 
  //       description: page?.node?.meta?.description
  //   }
  // })
  // console.log('HERE:' + JSON.stringify(pageList))
  // return pageList
  return [{"params":{"slug":"homeo"},"searchParams":{}}]
}
