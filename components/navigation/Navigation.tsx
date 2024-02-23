import React from 'react';
import styles from './Navigation.module.css';
import { useRef, useState } from 'react';
import NavigationHover from './NavigationHover';

export const Navigation = (props) => {

  const [navOpen, setNavOpen] = useState(false);

  const container = useRef<HTMLDivElement | null>(null);
  NavigationHover(container);
  
  const navData = props.navData.data.navigation.navItem.map((navitem) => {
    return {
      label: navitem.navItemLabel,
      link: navitem.navItemLink
    }
  });

  const currentSlug = props.current;

  const ctaData = {
    label: props.navData.data.navigation.cta.ctaLabel,
    link: props.navData.data.navigation.cta.ctaLink
  }

  return (
    <>
    <div className={`mobileHeader ${styles.mobileHeader}`}>
      <a className={`mobileHeader__logo ${styles.mobileHeader__logo}`} aria-label='Home page' href='/'>
        <svg width="63" height="27" viewBox="0 0 63 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M41.3897 0.751722H36.7294L30.8702 14.1349C30.3853 15.2437 29.1064 15.26 28.5986 14.1615L23.6313 4.04019C22.3656 1.85951 20.8935 0.762177 17.7699 0.73737H0.0858154V4.20059H10.8866C11.9013 4.20059 12.3754 5.45712 11.6136 6.1274L0.0858154 16.2698V20.0347H18.3518V16.4572H8.49249C7.47837 16.4572 7.00397 15.2019 7.76461 14.5312L17.5524 5.90035C18.4396 5.10514 19.5278 5.18885 20.1305 6.33562L26.3524 18.2129C27.7389 20.8917 25.5924 22.6567 22.8737 22.6567H18.3767V26.3184H23.5596C26.4774 26.3184 27.3679 25.8441 28.5796 25.0435C29.7913 24.2429 31.0462 22.4471 32.2011 20.1197L41.3829 0.751722H41.3897Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M54.7502 4.08113C53.7068 1.86811 51.4799 0.456055 49.0332 0.456055C46.5875 0.456055 44.3612 1.86706 43.3173 4.07883L35.7943 20.018H40.5601C44.4933 12.2573 53.9182 12.5632 57.5545 20.018H62.2643L54.7502 4.08113ZM51.5265 6.28748C51.0983 5.36275 50.1463 4.65315 49.0531 4.65315C47.8995 4.65315 47.0475 5.36324 46.6167 6.28748L44.293 11.2673C44.2341 11.3935 44.3564 11.5299 44.4891 11.4877C47.2687 10.6047 50.9197 10.5062 53.6226 11.4649C53.757 11.5126 53.8871 11.3739 53.8271 11.2445L51.5265 6.28748Z" fill="currentColor"/>
        </svg>
      </a>
      <div 
        className={`mobileHeader__hamburger ${styles.mobileHeader__hamburger}`} 
        onClick={() => setNavOpen(!navOpen)}
      >
        <svg 
          className={styles.mobileHeader__hamburger__icon} 
          width="25" 
          height="26" 
          viewBox="0 0 25 26" 
          fill="currentColor" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M21.7662 5.99707H3.23364V9.32431H21.7662V5.99707ZM21.7662 16.1729H3.23364V19.5001L21.7662 19.5001V16.1729Z" fill="currentColor"/>
        </svg>
      </div>
    </div>

    <div className={`mainNav ${styles.mainNav}`} ref={container} data-nav-open={navOpen}>
      <svg 
        className={styles.mainNavCloseMobile} 
        onClick={() => setNavOpen(!navOpen)} 
        width="20" 
        height="21" 
        viewBox="0 0 20 21" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5.92154 8.57491C7.1018 9.73772 7.11596 11.6372 5.95314 12.8174L0.85779 17.9893C0.474228 18.3786 0.474267 19.0037 0.857877 19.393L1.60643 20.1526C1.99913 20.5511 2.64237 20.5499 3.03358 20.1499L8.11124 14.9588C9.27274 13.7713 11.1781 13.7537 12.3613 14.9195L17.4773 19.9598C17.8666 20.3433 18.4918 20.3433 18.881 19.9597L19.6406 19.2111C20.0391 18.8184 20.0379 18.1752 19.638 17.784L14.4796 12.7384C13.2951 11.5798 13.2742 9.68046 14.4327 8.49601L19.4789 3.33706C19.8492 2.95849 19.8601 2.35686 19.5039 1.96506L18.8425 1.2377C18.4564 0.813131 17.793 0.799855 17.3902 1.20864L12.275 6.40064C11.1152 7.5779 9.22166 7.59542 8.04023 6.43981L2.8251 1.3387C2.44652 0.968402 1.8449 0.957446 1.45309 1.31372L0.72574 1.9751C0.301168 2.36117 0.287892 3.02458 0.69668 3.42732L5.92154 8.57491Z" fill="currentColor"/>
      </svg>

      <a className={`mainNav__logo ${styles.mainNav__logo}`} aria-label='Home page' href='/'>
        <svg width="63" height="27" viewBox="0 0 63 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M41.3897 0.751722H36.7294L30.8702 14.1349C30.3853 15.2437 29.1064 15.26 28.5986 14.1615L23.6313 4.04019C22.3656 1.85951 20.8935 0.762177 17.7699 0.73737H0.0858154V4.20059H10.8866C11.9013 4.20059 12.3754 5.45712 11.6136 6.1274L0.0858154 16.2698V20.0347H18.3518V16.4572H8.49249C7.47837 16.4572 7.00397 15.2019 7.76461 14.5312L17.5524 5.90035C18.4396 5.10514 19.5278 5.18885 20.1305 6.33562L26.3524 18.2129C27.7389 20.8917 25.5924 22.6567 22.8737 22.6567H18.3767V26.3184H23.5596C26.4774 26.3184 27.3679 25.8441 28.5796 25.0435C29.7913 24.2429 31.0462 22.4471 32.2011 20.1197L41.3829 0.751722H41.3897Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M54.7502 4.08113C53.7068 1.86811 51.4799 0.456055 49.0332 0.456055C46.5875 0.456055 44.3612 1.86706 43.3173 4.07883L35.7943 20.018H40.5601C44.4933 12.2573 53.9182 12.5632 57.5545 20.018H62.2643L54.7502 4.08113ZM51.5265 6.28748C51.0983 5.36275 50.1463 4.65315 49.0531 4.65315C47.8995 4.65315 47.0475 5.36324 46.6167 6.28748L44.293 11.2673C44.2341 11.3935 44.3564 11.5299 44.4891 11.4877C47.2687 10.6047 50.9197 10.5062 53.6226 11.4649C53.757 11.5126 53.8871 11.3739 53.8271 11.2445L51.5265 6.28748Z" fill="currentColor"/>
        </svg>
      </a>
      <div className={styles.mainNav__linkList}>
        { navData.map((navitem, i) => {
          return (
            <a 
              key={'link_' + i} 
              className={`mainNav__linkList__link ${styles.mainNav__linkList__link} ${navitem.link === '/'+currentSlug && styles.currentLink}`} href={navitem.link}
              onClick={() => setNavOpen(false)}
            >
              {navitem.label}
            </a>
          )
        })}
        <a className={styles.mainNav__cta} href={ctaData.link} onClick={() => setNavOpen(false)}>
          {ctaData.label}
        </a>
      </div>
      <div className={`hideOnDesktop ${styles.mobileNavFooter}`}>
        <div className={styles.mobileClaim}>
          <h3>The transformative power of enzymes</h3>
          <svg width="29" height="59" viewBox="0 0 29 59" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="14.505" cy="3.04894" rx="2.2252" ry="2.23328" transform="rotate(-180 14.505 3.04894)" fill="#E681FF"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M22.3803 36.0643C24.6885 36.0572 26.5614 37.937 26.5544 40.2535C26.551 41.37 26.9932 42.4414 27.7822 43.2285C29.4193 44.8616 29.4193 47.5199 27.7822 49.153C26.9932 49.9401 26.551 51.0114 26.5544 52.1279C26.5614 54.4445 24.6885 56.3242 22.3803 56.3172C21.2679 56.3138 20.2004 56.7576 19.4161 57.5494C17.789 59.1925 15.1403 59.1925 13.5131 57.5494C12.7289 56.7576 11.6614 56.3138 10.5489 56.3172C8.24076 56.3242 6.36784 54.4445 6.37487 52.1279C6.37528 51.9934 6.36922 51.8595 6.35686 51.7267C6.39267 51.7275 6.42859 51.7279 6.46462 51.7278C7.54936 51.7245 8.59027 52.1572 9.35497 52.9293C10.9416 54.5315 13.5243 54.5315 15.111 52.9293C15.8757 52.1572 16.9166 51.7245 18.0013 51.7278C20.252 51.7346 22.0783 49.9017 22.0714 47.6429C22.0681 46.5542 22.4993 45.5095 23.2686 44.742C24.865 43.1496 24.865 40.5575 23.2686 38.9651C22.4993 38.1976 22.0681 37.1529 22.0714 36.0642L22.0714 36.0537C22.1739 36.0611 22.2769 36.0646 22.3803 36.0643ZM22.0714 36.0537C22.0726 33.7997 20.2485 31.9725 18.0013 31.9793C16.9166 31.9827 15.8757 31.5499 15.111 30.7778C13.5243 29.1756 10.9416 29.1756 9.35497 30.7778C8.59028 31.5499 7.54937 31.9827 6.46462 31.9793C4.21393 31.9725 2.38767 33.8054 2.39452 36.0642C2.39782 37.1529 1.96666 38.1976 1.19729 38.9651C-0.399028 40.5575 -0.399028 43.1496 1.19729 44.742C1.96666 45.5095 2.39782 46.5542 2.39452 47.6429C2.38777 49.8656 4.15593 51.6758 6.35686 51.7267C6.26665 50.7574 5.84101 49.8452 5.14707 49.153C3.50997 47.5199 3.50997 44.8616 5.14707 43.2285C5.93609 42.4414 6.37826 41.37 6.37487 40.2535C6.36784 37.937 8.24076 36.0572 10.5489 36.0643C11.6614 36.0677 12.7289 35.6239 13.5131 34.832C15.1403 33.189 17.789 33.189 19.4161 34.832C20.1275 35.5503 21.0718 35.9822 22.0714 36.0537ZM17.1799 48.9002C18.2653 48.9035 19.1461 48.0196 19.1428 46.9302C19.1412 46.4052 19.3491 45.9014 19.7201 45.5312C20.49 44.7633 20.49 43.5132 19.7201 42.7452C19.3491 42.3751 19.1412 41.8713 19.1428 41.3462C19.1461 40.2569 18.2653 39.3729 17.1799 39.3762C16.6568 39.3778 16.1548 39.1692 15.786 38.7968C15.0208 38.0241 13.7752 38.0241 13.0101 38.7968C12.6413 39.1692 12.1393 39.3778 11.6162 39.3762C10.5307 39.3729 9.64999 40.2569 9.65329 41.3462C9.65488 41.8713 9.44695 42.3751 9.07592 42.7452C8.30607 43.5132 8.30607 44.7633 9.07592 45.5312C9.44695 45.9013 9.65488 46.4052 9.65329 46.9302C9.64999 48.0196 10.5307 48.9035 11.6162 48.9002C12.1393 48.8986 12.6413 49.1073 13.0101 49.4797C13.7752 50.2523 15.0208 50.2523 15.786 49.4797C16.1548 49.1073 16.6568 48.8986 17.1799 48.9002Z" fill="#E681FF"/>
          <ellipse cx="14.5448" cy="17.4807" rx="3.2693" ry="3.25746" transform="rotate(-90 14.5448 17.4807)" fill="#E681FF"/>
          <ellipse cx="14.5448" cy="17.4807" rx="3.2693" ry="3.25746" transform="rotate(-90 14.5448 17.4807)" fill="#E681FF"/>
          <ellipse cx="14.5453" cy="17.4802" rx="3.2693" ry="3.25746" transform="rotate(90 14.5453 17.4802)" fill="#E681FF"/>
          <ellipse cx="14.5453" cy="17.4802" rx="3.2693" ry="3.25746" transform="rotate(90 14.5453 17.4802)" fill="#E681FF"/>
          <ellipse cx="14.5453" cy="17.4006" rx="3.25746" ry="3.2693" transform="rotate(-180 14.5453 17.4006)" fill="#E681FF"/>
          <ellipse cx="14.5054" cy="17.441" rx="2.66158" ry="2.67126" transform="rotate(-180 14.5054 17.441)" fill="#E681FF"/>
          <ellipse cx="14.5054" cy="17.441" rx="2.66158" ry="2.67126" transform="rotate(-180 14.5054 17.441)" fill="#E681FF"/>
          <ellipse cx="14.5054" cy="17.4408" rx="2.67126" ry="2.66158" transform="rotate(90 14.5054 17.4408)" fill="#E681FF"/>
          <ellipse cx="14.5054" cy="17.441" rx="2.66158" ry="2.67126" transform="rotate(-180 14.5054 17.441)" fill="#E681FF"/>
          <path d="M19.4864 16.1765C20.207 16.8953 20.207 18.0654 19.4864 18.7842C19.1391 19.1306 18.9445 19.6022 18.946 20.0936C18.9491 21.1132 18.1248 21.9406 17.1088 21.9375C16.6192 21.936 16.1493 22.1313 15.8041 22.4798C15.088 23.203 13.9221 23.203 13.206 22.4798C12.8608 22.1313 12.3909 21.936 11.9013 21.9375C10.8853 21.9406 10.061 21.1132 10.0641 20.0936C10.0656 19.6022 9.87095 19.1306 9.52367 18.7842C8.80311 18.0654 8.80311 16.8953 9.52367 16.1765C9.87095 15.8301 10.0656 15.3585 10.0641 14.8671C10.061 13.8475 10.8853 13.0201 11.9013 13.0232C12.3909 13.0247 12.8608 12.8294 13.206 12.4809C13.9221 11.7577 15.088 11.7577 15.8041 12.4809C16.1493 12.8294 16.6192 13.0247 17.1088 13.0232C18.1248 13.0201 18.9491 13.8475 18.946 14.8671C18.9445 15.3585 19.1391 15.8301 19.4864 16.1765Z" fill="#E681FF"/>
          </svg>
        </div>
        {/* <div className={styles.mobileFooterLegal}>
          <div>©2024</div>
          <div>Zya Imprint & Privacy policy</div>
        </div> */}
      </div>
    </div>
    </>
  )
}