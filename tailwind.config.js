
module.exports = {
  content: [
    "./views/**/*.{html,js,ejs}",
    "node_modules//preline/dist/*.js",
    "node_modules/flowbite/**/*.js",


  ],
  theme: {
    extend: {
      colors: {
        primary: {"50":"#f0fdf4","100":"#dcfce7","200":"#bbf7d0","300":"#86efac","400":"#4ade80","500":"#22c55e","600":"#16a34a","700":"#15803d","800":"#166534","900":"#14532d","950":"#052e16"}
      }
    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    fontWeight: {
      // Add custom font weight values for Inter
      'hairline': 100,
      'thin': 200,
      'light': 300,
      'normal': 400,
      'medium': 500,
      'semibold': 600,
      'bold': 700,
      'extrabold': 800,
      'black': 900,
    },
  },
  plugins: [
    require('preline/plugin'),
    require('@tailwindcss/typography'),
    require('flowbite/plugin'),
  ],
}

