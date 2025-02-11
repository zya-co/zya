import React from 'react'
import './global.css'
import { aeonik, haben } from '../styles/fonts';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navigation } from '../components/navigation/Navigation';

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
          <Component {...pageProps} />
        </main>
    </>
  );
};

export default App;
