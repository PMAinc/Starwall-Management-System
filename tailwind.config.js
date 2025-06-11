/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7bc7fc',
          400: '#38a8f8',
          500: '#0e88eb',
          600: '#0265c7',
          700: '#0451a3',
          800: '#074687',
          900: '#0a3b70',
          950: '#07274d',
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      }
    },
  },
  plugins: [],
};