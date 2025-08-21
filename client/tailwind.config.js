/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     "./node_modules/flowbite/**/*.js" 
  ],
  theme: {
    extend: {
      colors:{
        primary:"#ff5252"
      }
    },
  },
  plugins: [
    require("flowbite/plugin"),
  ],
}
