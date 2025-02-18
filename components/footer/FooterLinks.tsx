import styles from './Footer.module.css';
import Link from 'next/link';
import Button from '../Button';

const year = new Date().getFullYear();

export default function FooterLinks({ navData }) {

  const navitems = navData?.data.navigation.navItem;
  const cta = navData?.data.navigation.cta;
  const hygiene = navData?.data.navigation.hygiene;

  return (
    <div className={styles.footer}>
      <div className={styles.footer__linklist}>
        <a className={`footer__logo ${styles.footer__logo}`} href='/' aria-label='Home page'>
          <svg width="63" height="27" viewBox="0 0 63 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M41.3897 0.751722H36.7294L30.8702 14.1349C30.3853 15.2437 29.1064 15.26 28.5986 14.1615L23.6313 4.04019C22.3656 1.85951 20.8935 0.762177 17.7699 0.73737H0.0858154V4.20059H10.8866C11.9013 4.20059 12.3754 5.45712 11.6136 6.1274L0.0858154 16.2698V20.0347H18.3518V16.4572H8.49249C7.47837 16.4572 7.00397 15.2019 7.76461 14.5312L17.5524 5.90035C18.4396 5.10514 19.5278 5.18885 20.1305 6.33562L26.3524 18.2129C27.7389 20.8917 25.5924 22.6567 22.8737 22.6567H18.3767V26.3184H23.5596C26.4774 26.3184 27.3679 25.8441 28.5796 25.0435C29.7913 24.2429 31.0462 22.4471 32.2011 20.1197L41.3829 0.751722H41.3897Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M54.7502 4.08113C53.7068 1.86811 51.4799 0.456055 49.0332 0.456055C46.5875 0.456055 44.3612 1.86706 43.3173 4.07883L35.7943 20.018H40.5601C44.4933 12.2573 53.9182 12.5632 57.5545 20.018H62.2643L54.7502 4.08113ZM51.5265 6.28748C51.0983 5.36275 50.1463 4.65315 49.0531 4.65315C47.8995 4.65315 47.0475 5.36324 46.6167 6.28748L44.293 11.2673C44.2341 11.3935 44.3564 11.5299 44.4891 11.4877C47.2687 10.6047 50.9197 10.5062 53.6226 11.4649C53.757 11.5126 53.8871 11.3739 53.8271 11.2445L51.5265 6.28748Z" fill="currentColor"/>
          </svg>
        </a>
        <div className={styles.footer__nav}>
          { navitems && navitems.map((item, i) => (
            <div key={i} className={styles.footer__nav__column}>
              {item.navItemLink ? 
                <h4 className={styles.footer__nav__column__header}><Link scroll={false} href={item.navItemLink ?? '#'}>{item.navItemLabel}</Link></h4>
                :  
                <h4 className={styles.footer__nav__column__header}>{item.navItemLabel}</h4>
              }
              {item.subNavItems && item.subNavItems.map((subitem, j) => (
                <Link scroll={false} key={j} href={subitem.subNavItemLink ?? '#'} className={styles.footer__navlink}>{subitem.subNavItemLabel}</Link>
              ))}
            </div>
          ))}
          {cta &&
            <div className={styles.footer__nav__column}>
              <Button 
                color="mineral-white"
                variant="mini"
                href={cta.ctaLink || "/contact"}
                className={styles.footer__nav__column__button}
              >{cta.ctaLabel || 'Contact Us'}</Button>
            </div>
          }
        </div>
      </div>
      <div className={styles.footer__legal}>
        <div className={styles.footer__legal__copyright}>©{year} Zya</div>
        <div className={styles.footer__legal__text}>
          { hygiene && hygiene.map((item, i) => (
            item.hygieneLink ? (
              <div key={i}><Link scroll={false} href={item.hygieneLink ?? '#'}>{item.hygieneLabel}</Link></div>
            ) : (
              <div key={i}>{item.hygieneLabel}</div>
            )
          ))}
        </div>
      </div>

      {/* <pre>{JSON.stringify(cta, null, 2)}</pre> */}
    </div>
  )
}