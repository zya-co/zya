import React from 'react';
import styles from './Navigation.module.css';
import { useRef } from 'react';
import NavigationHover from './NavigationHover';

export const Navigation = (props) => {

  const container = useRef<HTMLDivElement | null>(null);
  NavigationHover(container);
  
  const navData = props.navData.data.navigation.navItem.map((navitem) => {
    return {
      label: navitem.navItemLabel,
      link: navitem.navItemLink
    }
  });

  const ctaData = {
    label: props.navData.data.navigation.cta.ctaLabel,
    link: props.navData.data.navigation.cta.ctaLink
  }

  return (
    <div className={`mainNav ${styles.mainNav}`} ref={container}>
      <a className={`mainNav__logo ${styles.mainNav__logo}`} href='/'>
        <svg width="63" height="27" viewBox="0 0 63 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M41.3897 0.751722H36.7294L30.8702 14.1349C30.3853 15.2437 29.1064 15.26 28.5986 14.1615L23.6313 4.04019C22.3656 1.85951 20.8935 0.762177 17.7699 0.73737H0.0858154V4.20059H10.8866C11.9013 4.20059 12.3754 5.45712 11.6136 6.1274L0.0858154 16.2698V20.0347H18.3518V16.4572H8.49249C7.47837 16.4572 7.00397 15.2019 7.76461 14.5312L17.5524 5.90035C18.4396 5.10514 19.5278 5.18885 20.1305 6.33562L26.3524 18.2129C27.7389 20.8917 25.5924 22.6567 22.8737 22.6567H18.3767V26.3184H23.5596C26.4774 26.3184 27.3679 25.8441 28.5796 25.0435C29.7913 24.2429 31.0462 22.4471 32.2011 20.1197L41.3829 0.751722H41.3897Z" fill="currentColor"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M54.7502 4.08113C53.7068 1.86811 51.4799 0.456055 49.0332 0.456055C46.5875 0.456055 44.3612 1.86706 43.3173 4.07883L35.7943 20.018H40.5601C44.4933 12.2573 53.9182 12.5632 57.5545 20.018H62.2643L54.7502 4.08113ZM51.5265 6.28748C51.0983 5.36275 50.1463 4.65315 49.0531 4.65315C47.8995 4.65315 47.0475 5.36324 46.6167 6.28748L44.293 11.2673C44.2341 11.3935 44.3564 11.5299 44.4891 11.4877C47.2687 10.6047 50.9197 10.5062 53.6226 11.4649C53.757 11.5126 53.8871 11.3739 53.8271 11.2445L51.5265 6.28748Z" fill="currentColor"/>
        </svg>
      </a>
      <div className={styles.mainNav__linkList}>
        { navData.map((navitem, i) => {
          return (
            <a key={'link_' + i} className={`mainNav__linkList__link ${styles.mainNav__linkList__link}`} href={navitem.link}>
              {navitem.label}
            </a>
          )
        })}
        <a className={styles.mainNav__cta} href={ctaData.link}>
          {ctaData.label}
        </a>
      </div>
    </div>
  )
}