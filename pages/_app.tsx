import React from 'react'
import './global.css'
import { aeonik, haben } from '../styles/fonts';

const App = ({ Component, pageProps }) => {
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
      <Component {...pageProps} />
    </main>
  );
};

export default App;
