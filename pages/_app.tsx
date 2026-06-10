import React from 'react';
import './global.css';
import { aeonik, haben } from '../styles/fonts';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/compat/router';
import { Navigation } from '../components/navigation/Navigation';
import { gsap } from 'gsap/dist/gsap';
import { useGSAP } from "@gsap/react/dist";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const getRouteSlug = (url?: string) => {
    const path = url ?? (typeof window !== 'undefined' ? window.location.pathname : '');
    const slug = path.split('/').filter(Boolean).pop() ?? '';
    return slug.split('#')[0];
  };

  const [currentRoute, setCurrentRoute] = useState(() =>
    typeof window !== 'undefined'
      ? getRouteSlug(window.location.pathname)
      : (router?.query?.slug as string) || '',
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !router) return

    const handleRouteChange = (url: string) => {
      setCurrentRoute(getRouteSlug(url));

      // noSmooth pages (e.g. /blog/*) sit outside ScrollSmoother; Links use
      // scroll={false}, so native scroll must be reset here on non-hash navigations.
      if (!url.includes('#')) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    handleRouteChange(window.location.pathname + window.location.hash);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

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
        <Component {...pageProps} />
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
