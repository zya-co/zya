import Head from 'next/head';
import { useEffect } from 'react';

export const Layout = (props) => {
  const meta = {
    title: props.title || 'Zya Enzymes',
    description: props.description || 'The transformative power of enzymes',
    metaimg: props.metaimg || '/opengraph.png',
    nofollow: props.nofollow || false,
  };

  useEffect(() => {
    // console.log('layout useEffect');
    const darkElements = Array.from(document.querySelectorAll('.darkElement')) as HTMLElement[];
    const lightElements = Array.from(document.querySelectorAll('.lightElement')) as HTMLElement[];

    console.log('darkElements', darkElements);
    console.log('lightElements', lightElements);

    function isMobile() { 
      // console.log('isMobile!'); 
      return window.innerWidth < 641; 
    }

    const header = isMobile()
      ? (document.querySelector('.mobileHeader') as HTMLElement)
      : (document.querySelector('.mainNav') as HTMLElement);

    const options = {
      rootMargin: `${header?.offsetHeight * -0.5}px 0px ${
        -1 * (window.innerHeight - 0.5 * header?.offsetHeight)
      }px 0px`,
      threshold: 0,
      root: document.querySelector('#smooth-wrapper')
    };

    const nav = document.querySelector('.mainNav') as HTMLElement;
    const mobileHeader = document.querySelector('.mobileHeader') as HTMLElement;

    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const timeoutId = setTimeout(() => {
            nav?.setAttribute('data-isLight', 'true');
            mobileHeader?.setAttribute('data-isLight', 'true');
            console.log('light added from', entry.target);
          }, 10);
          // Store the timeout ID on the entry for cleanup
          (entry.target as any)._timeoutId = timeoutId;
        } else {
          nav?.removeAttribute('data-isLight');
          mobileHeader?.removeAttribute('data-isLight');
          // console.log('light removed from', entry.target);
        }
      });
    }, options);

    darkElements.forEach((element) => {
      observer.observe(element);
    });

    lightElements.forEach((element) => {
      observer.unobserve(element);
    });

    return () => {
      
      darkElements.forEach((entry) => {
        if ((entry as any)._timeoutId) {
          clearTimeout((entry as any)._timeoutId);
        }
        observer.unobserve(entry);
      });

      observer.disconnect();
    };
  }, [props.children]);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.metaimg} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {meta.nofollow && <meta name="robots" content="noindex, nofollow" />}
      </Head>
      {props.children}
    </>
  );
};
