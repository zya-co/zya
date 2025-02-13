import React from 'react'
import './global.css'
import { aeonik, haben } from '../styles/fonts';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navigation } from '../components/navigation/Navigation';
import { ScrollSmooth } from '../components/ScrollSmooth';

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  const [currentRoute, setCurrentRoute] = useState(router.query.slug || '');
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      const slug = url.split('/').pop();
      setCurrentRoute(slug || '');
    };

    // Listen for route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    // Set initial route
    handleRouteChange(router.query.slug || '');

    // Cleanup event listener on component unmount
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
          <ScrollSmooth>
            <Component {...pageProps} />
          </ScrollSmooth>
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
  }

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function(newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console) {
        console.error('Cannot insert before a reference node from a different parent', referenceNode, this);
      }
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments);
  }
}

export default App;
