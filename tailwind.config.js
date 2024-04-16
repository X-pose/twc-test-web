/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        FuturaMdBt :['FuturaMdBt', 'sans'],
        FutuBd : ['FutuBd', 'sans']
        
      },
      backgroundImage: {
        'round-ellipse': "url('./src/assets/Ellipse.svg')",
        'doodle-art':"url('./src/assets/DoodleTexture.svg')",
        'angled-ellipse': "url('./src/assets/AngledEllipse.svg')"
        
        
      }
    },
  },
  plugins: [],
}

