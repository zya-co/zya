import React from 'react'
import './global.css'
import { aeonik, haben } from '../styles/fonts';

const App = ({ Component, pageProps }) => {

  const slug = typeof window !== 'undefined' ? window.location.pathname : '/'

  return (
    <main className={`${aeonik.variable} ${haben.variable}`}>
      <style>
        {`
          :root {
            --font-haben: ${haben.variable};
            --font-aeonik: ${aeonik.variable};
          }
        `}
      </style>

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
          opacity: 0,
          visibility: 'hidden',
          pointerEvents: 'none',
        }}>
          You are in preview-mode
          {/* This link will logout of Tina and exit preview mode */}
          <a
            style={{ color: 'var(--color-beatle)' }}
            href={`/api/preview/exit?slug=mission`}
          >
            Click here
          </a>{' '}
          to exit
        </div>
      )}

      <Component {...pageProps} />
    </main>
  );
};

export default App;
