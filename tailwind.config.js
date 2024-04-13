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
        'round-ellipse': "url('./src/assets/img/Ellipse.svg')",
        'doodle-art':"url('./src/assets/img/DoodleTexture.svg')",
        'angled-ellipse': "url('./src/assets/img/AngledEllipse.svg')"
        
        
      }
    },
  },
  plugins: [],
}

