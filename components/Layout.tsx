import Head from 'next/head';
import { useEffect } from 'react';
import { ScrollSmooth } from './ScrollSmooth';

export const Layout = (props) => {
  const meta = {
    title: props.title || 'Zya Enzymes',
    description: props.description || 'The transformative power of enzymes',
    metaimg: props.metaimg || '/opengraph.png',
    nofollow: props.nofollow || false,
  };

  useEffect(() => {
    const darkElements = Array.from(document.querySelectorAll('.darkElement')) as HTMLElement[];
    const lightElements = Array.from(document.querySelectorAll('#smooth-content > :not(.darkElement), .noSmooth > :not(.darkElement)')) as HTMLElement[];

    function isMobile() { return window.innerWidth < 641 }

    const createObserver = (elements, callback) => {
      const header = isMobile()
        ? (document.querySelector('.mobileHeader') as HTMLElement)
        : (document.querySelector('.mainNav') as HTMLElement);

      const vvph = window.visualViewport?.height || window.innerHeight;

      const options = {
        rootMargin: `${ header.offsetHeight * -0.5 }px 0px ${ -1 * vvph + header.offsetHeight * 0.5 + 1}px 0px`, // Fixed rootMargin to always check against the top 100px of the viewport
        threshold: 0,
        root: document.querySelector('#smooth-wrapper'),
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          callback(entry);
        });
      }, options);

      elements.forEach((element) => {
        observer.observe(element);
      });

      return observer;
    };

    const nav = document.querySelector('.mainNav') as HTMLElement;
    const mobileHeader = document.querySelector('.mobileHeader') as HTMLElement;

    const darkObserver = createObserver(darkElements, (entry) => {
      if (entry.isIntersecting) {
        const timeoutId = setTimeout(() => {
          nav?.setAttribute('data-isLight', 'true');
          mobileHeader?.setAttribute('data-isLight', 'true');
        }, 100);
        (entry.target as any)._timeoutId = timeoutId;
      }
    });

    const lightObserver = createObserver(lightElements, (entry) => {
      if (entry.isIntersecting) {
        const timeoutId = setTimeout(() => {
          nav?.removeAttribute('data-isLight');
          mobileHeader?.removeAttribute('data-isLight');
        }, 100);
        (entry.target as any)._timeoutId = timeoutId;
      }
    });

    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    const handleResize = debounce(() => {
      darkObserver.disconnect();
      lightObserver.disconnect();
      createObserver(darkElements, (entry) => {
        if (entry.isIntersecting) {
          const timeoutId = setTimeout(() => {
            nav?.setAttribute('data-isLight', 'true');
            mobileHeader?.setAttribute('data-isLight', 'true');
          }, 100);
          (entry.target as any)._timeoutId = timeoutId;
        }
      });
      createObserver(lightElements, (entry) => {
        if (entry.isIntersecting) {
          const timeoutId = setTimeout(() => {
            nav?.removeAttribute('data-isLight');
            mobileHeader?.removeAttribute('data-isLight');
          }, 100);
          (entry.target as any)._timeoutId = timeoutId;
        }
      });
    }, 100); // Adjust the debounce delay as needed

    window.visualViewport?.addEventListener('resize', handleResize);

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      darkElements.forEach((entry) => {
        if ((entry as any)._timeoutId) {
          clearTimeout((entry as any)._timeoutId);
        }
        darkObserver.unobserve(entry);
      });
      lightElements.forEach((entry) => {
        if ((entry as any)._timeoutId) {
          clearTimeout((entry as any)._timeoutId);
        }
        lightObserver.unobserve(entry);
      });
      darkObserver.disconnect();
      lightObserver.disconnect();
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
      { props.noSmooth 
        ? <div className='noSmooth'>
            {props.children }
          </div>
        
        : <ScrollSmooth>
            {props.children}
          </ScrollSmooth>
      }
    </>
  );
};
