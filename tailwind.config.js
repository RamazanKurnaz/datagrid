// module.exports = {
//   content: ['./dist/**/*.html', './src/**/*.{js,jsx,ts,tsx}', './*.html'],
//   plugins: [require('@tailwindcss/forms')],
//   variants: {
//     extend: {
//       opacity: ['disabled']
//     }
//   }
// }

const withMT = require('@material-tailwind/react/utils/withMT')

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      opacity: ['disabled'],
      colors: {
        yeniEkleBtn: '#6938ef',
        ligthBg: '#f4f3ff',
        pageBg: '#f2f4f7',
        tableBg: '#f9fafb',
        generalTextColor: '#101828',
        linkBg: '#ebe9fe',
        linkColor: '#7A5AF8',
        linkColor2: '#6938ef',
        textGray: '#344054',
        textGray2: '#98A2B3',

        textGrayLight: '#98a2b3'
      }
    }
  },
  plugins: []
})
