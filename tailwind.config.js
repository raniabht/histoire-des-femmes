/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
       fontFamily: {
        gravitas: ['"Gravitas One"', 'serif'],
        merri: ['"Merriweather Sans"', 'sans-serif']
      },
      fontSize: {
        en:['7vw'],
        grand: ['5vw'],
        txt: ['18px'],
        sous: ['2.3vw'],
        ptt:['22px'],
      },
      margin: {
        gx: ['4%'],
      },

      padding:{
        gx: ['4%'],
      },

      colors:{
        sombre:"#342B38",
        titre: "#FF3D00",
        clair: "#F4F0E7",
      }
    },
  },
  plugins: [],
}