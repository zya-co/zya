import styles from './Footer.module.css';
import Button from '../Button';
import Link from 'next/link';
import RichText from '../RichText';
import { tinaField } from 'tinacms/dist/react';

export const Footer = (props) => {

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
        { !props.data?.hideContactForm &&
          <div className={styles.contactform__wrapper}>
            <div>
            <h1 className={styles.contactform__title}>Contact us</h1>
            {props.data &&
              <div className={styles.contactform__extraText} data-tina-field={tinaField(props.data)}>
                <RichText content={props.data.extraText} />
              </div>
            }
            </div>
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
                <label htmlFor="agree" className={styles.contactform__field__row__ppcheck}><input type="checkbox" name="agree" id="agree" required /> <span>Agree to our <Link scroll={false} href='/privacy-policy'>privacy policy</Link></span></label>
              </div>
            </form>
          </div>
        }
      </div>
  )
}

export const footerSchema = {
  label: 'Footer',
  name: 'footer',
  fields: [
    {
      label: 'Extra Text',
      name: 'extraText',
      type: 'rich-text'
    },
    {
      label: 'Hide Contact form',
      name: 'hideContactForm',
      type: 'boolean',
      default: false
    }
  ]
}