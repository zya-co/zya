import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { useRouter } from "next/router";

// export async function generateStaticParams() {
//   const posts = await await client.queries.postConnection();
 
//   return {
//     posts: posts.data,
//   }
// }

export default function Page(params) {

  // const router = useRouter();
  // if (router.isFallback)  return <div>Loading...</div>;

  // // data passes though in production mode and data is updated to the sidebar data in edit-mode
  // const { data } = useTina({
  //   query: props.query,
  //   variables: props.variables,
  //   data: props.data,
  // });


  return <>
    <h1>Hello, Nexter.js!</h1>
    { JSON.stringify(params) }
  </>
}