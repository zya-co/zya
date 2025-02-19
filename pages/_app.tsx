import React from 'react';
import './global.css';
import { aeonik, haben } from '../styles/fonts';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navigation } from '../components/navigation/Navigation';
import { gsap } from 'gsap/dist/gsap';
import { useGSAP } from "@gsap/react/dist";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState(router.query.slug || '');

  useEffect(() => {

    const scroller = document.querySelector('#contentWrapper');
    if (typeof window === 'undefined') return

    const handleRouteChange = (url) => {
      console.log('route change', url);
      const slug = url.split('/').pop();
      const slugWithoutHash = slug.split('#')[0];
      setCurrentRoute(slugWithoutHash || '');

      if (slug.includes('#')) {
        const hash = slug.split('#').pop();
        const hashElement = document.querySelector(`#${hash}`) as HTMLElement;
        if (!hashElement) {
          console.log('waiting for hash');
          // Wait for the element to be in the DOM
          let timeoutId;
          const observer = new MutationObserver((mutations, observer) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              const hashElement = document.querySelector(`#${hash}`) as HTMLElement;
              if (hashElement) {
                scroller?.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'instant'
                });
                // Use ResizeObserver to ensure the element's size is final
                const resizeObserver = new ResizeObserver(() => {
                  scroller?.scrollTo(0, hashElement.getBoundingClientRect().top);
                  console.log('no hash, scrolling to', hashElement.getBoundingClientRect().top);
                  resizeObserver.disconnect();
                });
                resizeObserver.observe(hashElement);
                observer.disconnect();
              }
            }, 100); // Adjust the debounce delay as needed
          });
          observer.observe(document.body, { childList: true, subtree: true });
        }
        else {
          console.log('there was a hash');
          // Use ResizeObserver to ensure the element's size is final
          scroller?.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
          });
          const resizeObserver = new ResizeObserver(() => {
            scroller?.scrollTo(0, hashElement.getBoundingClientRect().top);
            console.log('was hash, scrolling to', hashElement.getBoundingClientRect().top);
            resizeObserver.disconnect();
          });
          resizeObserver.observe(document.body);
        }
      } 
      else {
        console.log('no hash, jumping to top');
        scroller?.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    handleRouteChange(currentRoute || '');

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      <main className={`${aeonik.variable} ${haben.variable}`}>
        <style>
          {`
            :root {
              --font-haben: ${haben.variable};
              --font-aeonik: ${aeonik.variable};
            }
          `}
        </style>
        <Navigation navData={pageProps.nav} current={currentRoute} />
        <div id='contentWrapper'>
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
};

if (typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function(child) {
    if (child.parentNode !== this) {
      if (console) {
        console.error('Cannot remove a child from a different parent', child, this);
      }
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function(newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console) {
        console.error('Cannot insert before a reference node from a different parent', referenceNode, this);
      }
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments);
  };
}

export default App;
