import React from 'react'
import './global.css'
import { aeonik, haben } from '../styles/fonts';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navigation } from '../components/navigation/Navigation';
// import { ScrollSmooth } from '../components/ScrollSmooth';

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

  const slug = typeof window !== 'undefined' ? window.location.pathname : '/'

  // const current = () => { 
  //   if (pageProps?.data?.blogpost) {
  //     return pageProps?.data?.blogpost?._sys.filename;
  //   } 
  //   else {
  //     return pageProps?.data?.page?._sys.filename
  //   }
  // }

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
          {/* <ScrollSmooth> */}
          {/* <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                padding: '0.5rem',
                background: 'var(--color-fuchsia)',
                color: 'var(--color-mineral-white)',
                fontSize: '0.8rem',
                zIndex: 1000,
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.25rem',
                // pointerEvents: 'none',
                // opacity: 0,
                // visibility: 'hidden',
              }}>{JSON.stringify(pageProps.data, null, 2)}
            </div> */}

            {/* Feel free to add your own styling! */}
            {pageProps.preview && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                padding: '0.5rem',
                background: 'var(--color-fuchsia)',
                color: 'var(--color-mineral-white)',
                fontSize: '0.8rem',
                zIndex: 1000,
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.25rem',
                // pointerEvents: 'none',
                // opacity: 0,
                // visibility: 'hidden',
              }}>
                You are in preview-mode {slug}
                {/* <pre>{JSON.stringify(pageProps, null, 2)}</pre> */}
                {/* This link will logout of Tina and exit preview mode */}
                <a
                  style={{ color: 'var(--color-beatle)' }}
                  href={`/api/preview/exit?slug=${slug}`}
                >
                  Click here
                </a>{' '}
                to exit
              </div>
            )}
            <Component {...pageProps} />
          {/* </ScrollSmooth> */}
        </main>
    </>
  );
};

export default App;
