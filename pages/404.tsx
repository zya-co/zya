import styles from './404.module.css'
// import { Navigation } from '../components/navigation/Navigation'
import { Footer } from "../components/footer/Footer";
import FooterLinks from "../components/footer/FooterLinks";
import Button from '../components/Button';
import Image from 'next/image';
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/Layout";

export default function Page(props) {
  return (
    <Layout>
      {/* <Navigation navData={props.nav} /> */}
        <div className={styles.body}>
          <h1>404</h1>
          <h4>The page you're trying to reach does not exist.</h4>
          <Button href="/">Back to homepage</Button>
          <figure className={styles.figure}>
            <Image
              src={'/staticMedia/bg404.jpg'}
              alt="An atmospheric image of a texture"
              fill={true}
            />
          </figure>
        </div>
      <Footer navData={props.nav} />
      <FooterLinks navData={props.footerNav} />
    </Layout>
  );
}

export const getStaticProps = async () => {

  const mainNav = await client.queries.navigation({ relativePath: 'mainnav.mdx'})
  const footerNav = await client.queries.navigation({ relativePath: 'footer.mdx'})

  return {
    props: {
      nav: mainNav,
      footerNav: footerNav,
      //myOtherProp: 'some-other-data',
    },
    revalidate: 60,
  };
};