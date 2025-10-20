// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-raleway)', 'sans-serif'],
      },
      keyframes: {
        blink: {                     // ← ajouté !
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        bounceIn: {
          '0%':   { transform: 'scale(0.5)' },
          '60%':  { transform: 'scale(1.1)' },
          '80%':  { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        bounceOut: {
          '0%':   { transform: 'scale(1)' },
          '20%':  { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(0)' },
        },
        fadeInScale: {
        '0%':   { opacity: 0, transform: 'scale(0.9)' },
        '100%': { opacity: 1, transform: 'scale(1)' },
        },
        fadeOutScale: {
          '0%':   { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0.9)' },
        },
        slideInBottom: {
          '0%':   { transform: 'translateY(50%)', opacity: 0 },
          '100%': { transform: 'translateY(0)',    opacity: 1 },
        },
        slideOutBottom: {
          '0%':   { transform: 'translateY(0)',    opacity: 1 },
          '100%': { transform: 'translateY(50%)', opacity: 0 },
        },
      },
      animation: {
        'blink':'blink 1s step-start infinite',
        'slide-in-bottom': 'slideInBottom 200ms ease-out',
        'slide-out-bottom': 'slideOutBottom 150ms ease-in',
        'bounce-in':  'bounceIn 300ms ease-out',
        'bounce-out': 'bounceOut 200ms ease-in',
        'fade-in-scale':  'fadeInScale 200ms ease-out',
        'fade-out-scale': 'fadeOutScale 150ms ease-in',
      },
    },
  },
  plugins: [],
};
