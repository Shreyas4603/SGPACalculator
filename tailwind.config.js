/** @type {import('tailwindcss').Config} */
import MT from "@material-tailwind/react/utils/withMT"
const withMT = MT
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});