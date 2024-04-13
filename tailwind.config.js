/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        FuturaMdBt :['FuturaMdBt', 'sans']
        
      },
      backgroundImage: {
        'eclipse-green': "url('./src/assets/img/Ellipse.svg')",
        'doodle-art':"url('./src/assets/img/DoodleTexture.svg')"
        
      }
    },
  },
  plugins: [],
}

