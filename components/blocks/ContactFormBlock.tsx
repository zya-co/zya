import styles from './ContactFormBlock.module.css';
import Button from '../Button';
import Link from 'next/link';
import { marginResponsive, widthResponsive } from './DynamicBlock_Schema_Fields';

export function ContactFormBlock({data}) {

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
    <div className={styles.contactform__wrapper} style={{backgroundColor: `var(--color-${data.bgColor ? data.bgColor : 'lichen'})`}}>
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
  )
}

export const contactFormBlockSchema = {
  name: 'contactFormBlock',
  label: 'Contact Form',
  fields: [
    {
      name: 'bgColor',
      label: 'Background Color',
      type: 'string',
      options: [
        { label: 'Mineral White', value: 'mineral-white' },
        { label: 'Earth Gray', value: 'earth-gray' },
        { label: 'Morpho Teal', value: 'morpho-teal' },
        { label: 'Lichen', value: 'lichen' },
        { label: 'Fuchsia', value: 'fuchsia' },
        { label: 'Beatle', value: 'beatle' },
        { label: 'Amber', value: 'amber' },
      ]
    }
  ]
}