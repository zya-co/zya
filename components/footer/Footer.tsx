import styles from './Footer.module.css'
import Button from '../Button'
import Link from 'next/link';

export const Footer = (props) => {

  const navData = props.navData.data.navigation.navItem.map((navitem) => {
    return {
      label: navitem.navItemLabel,
      link: navitem.navItemLink
    }
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target) as any;
    await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    });
    // Success and error handling ...
  };

  return (
      <div className={styles.footer} id="contact">
        <div className={styles.contactform__wrapper}>
          <h1 className={styles.contactform__title}>Contact us</h1>
          <form name="contact" method="POST" onSubmit={handleFormSubmit} className={styles.contactform__form}>
            <input type="hidden" name="form-name" value="contact" />
            <div className={styles.contactform__field__row}>
              <label htmlFor="name" className={styles.contactform__field__row__label}>
                <span>Name</span>
                <input type="text" name="name" id="name" autoComplete='true' />
              </label>
              <label htmlFor="email" className={styles.contactform__field__row__label}>
                <span>Email</span>
                <input type="email" name="email" id="email" autoComplete='true' required />
              </label>
            </div>
            <div className={styles.contactform__field__row}>
              <label htmlFor="message" className={styles.contactform__field__row__label}>
                <span>Message</span>
                <textarea name="message" id="message" rows={3} required></textarea>
              </label>
            </div>
            <div className={styles.contactform__field__row__buttonrow}>
              <Button 
                type="submit" 
                text="Send"
                color="morpho-teal"
                variant="mini"
                className={styles.contactform__submit__button}
              />
              <label htmlFor="agree" className={styles.contactform__field__row__ppcheck}><input type="checkbox" name="agree" id="agree" required /> <span>Agree to our <Link href='/privacy-policy'>privacy policy</Link></span></label>
            </div>
          </form>
        </div>
        <div className={styles.footer__nav}>
          { navData.map((navitem, i) => {
            return (
              <a key={'footerlink_' + i} className={styles.footer__navlink} href={navitem.link}>
                {navitem.label}
              </a>
            )
          })}
        </div>
        <a className={`footer__logo ${styles.footer__logo}`} href='/' aria-label='Home page'>
          <svg width="63" height="27" viewBox="0 0 63 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M41.3897 0.751722H36.7294L30.8702 14.1349C30.3853 15.2437 29.1064 15.26 28.5986 14.1615L23.6313 4.04019C22.3656 1.85951 20.8935 0.762177 17.7699 0.73737H0.0858154V4.20059H10.8866C11.9013 4.20059 12.3754 5.45712 11.6136 6.1274L0.0858154 16.2698V20.0347H18.3518V16.4572H8.49249C7.47837 16.4572 7.00397 15.2019 7.76461 14.5312L17.5524 5.90035C18.4396 5.10514 19.5278 5.18885 20.1305 6.33562L26.3524 18.2129C27.7389 20.8917 25.5924 22.6567 22.8737 22.6567H18.3767V26.3184H23.5596C26.4774 26.3184 27.3679 25.8441 28.5796 25.0435C29.7913 24.2429 31.0462 22.4471 32.2011 20.1197L41.3829 0.751722H41.3897Z" fill="currentColor"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M54.7502 4.08113C53.7068 1.86811 51.4799 0.456055 49.0332 0.456055C46.5875 0.456055 44.3612 1.86706 43.3173 4.07883L35.7943 20.018H40.5601C44.4933 12.2573 53.9182 12.5632 57.5545 20.018H62.2643L54.7502 4.08113ZM51.5265 6.28748C51.0983 5.36275 50.1463 4.65315 49.0531 4.65315C47.8995 4.65315 47.0475 5.36324 46.6167 6.28748L44.293 11.2673C44.2341 11.3935 44.3564 11.5299 44.4891 11.4877C47.2687 10.6047 50.9197 10.5062 53.6226 11.4649C53.757 11.5126 53.8871 11.3739 53.8271 11.2445L51.5265 6.28748Z" fill="currentColor"/>
          </svg>
        </a>
        <div className={styles.footer__legal}>
          <div className={styles.footer__legal__text}>
            <div>©2024 Zya</div>
            <div><Link href='/privacy-policy'>Imprint & Privacy policy</Link></div>
          </div>               
          <div className={styles.footer__legal__claim}>The power of transformative enzymes</div>
        </div>
      </div>
  )
}