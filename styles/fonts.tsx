import localFont from 'next/font/local'
const aeonik = localFont({
  src: [
    {
      path: '../fonts/Aeonik-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
  ],
  variable: '--font-aeonik'
})
const haben = localFont({
  src: [
    {
      path: '../fonts/HabenGrotesk-Regular-Zya.woff2',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-haben'
})

export { aeonik, haben }