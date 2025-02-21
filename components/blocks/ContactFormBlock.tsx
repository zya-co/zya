'use client';
import styles from './ContactFormBlock.module.css';
import Button from '../Button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function ContactFormBlock({data}) {

  const [isClient, setIsClient] = useState(false);

  const [status, setStatus] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target) as any;
  //   await fetch("/__forms.html", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: new URLSearchParams(formData).toString(),
  //   });
  //   // Success and error handling ...
  // };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    try {
        setStatus('pending');
        setError('');
        const myForm = event.target as any;
        const formData = new FormData(myForm) as any;
        const urlSearchParams = new URLSearchParams(formData) as any ;
        const res = await fetch('/__forms.html', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: urlSearchParams.toString(),
        });
        if (res.status === 200) {
          setStatus('ok');
        } else {
          setStatus('error');
          setError(`${res.status} ${res.statusText}`);
        }
    } catch (e) {
        setStatus('error');
        setError(`${e}`);
    }
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
          <label htmlFor="agree" className={styles.contactform__field__row__ppcheck}><input type="checkbox" name="agree" id="agree" required /> <span>Agree to our <Link scroll={false} href='/privacy-policy'>privacy policy</Link></span></label>
        </div>
        {status === 'ok' && (
              <div className={`${styles.alert} ${styles.alert_success}`}>
                  <SuccessIcon />
                  Submitted!
              </div>
          )}
          {status === 'error' && (
              <div className={`${styles.alert} ${styles.alert_error}`}>
                  <ErrorIcon />
                  {error}
              </div>
          )}
      </form>
    </div>
  )
}

function SuccessIcon() {
  return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
      >
          <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
      </svg>
  );
}
function ErrorIcon(success: any) {
  return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
      >
          <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
      </svg>
  );
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