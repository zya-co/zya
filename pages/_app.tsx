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
    const handleRouteChange = (url) => {
      const slug = url.split('/').pop();
      const slugWithoutHash = slug.split('#')[0];
      setCurrentRoute(slugWithoutHash || '');

      if (slug.includes('#')) {
        const hash = slug.split('#').pop();
        const hashElement = document.querySelector(`#${hash}`) as HTMLElement;
        if (!hashElement) {
          // Wait for the element to be in the DOM
          const observer = new MutationObserver((mutations, observer) => {
            const mainNav = document.querySelector('.mainNav') as HTMLElement;
            const hashElement = document.querySelector(`#${hash}`) as HTMLElement;
            if (hashElement) {
              window.scrollTo(0, hashElement.offsetTop - mainNav.offsetHeight);
              observer.disconnect();
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
        } else {
          window.scrollTo(0, hashElement.offsetTop);
        }
      } else {
        window.scrollTo(0, 0);
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    handleRouteChange(router.query.slug || '');

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.query.slug]);

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
