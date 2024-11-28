/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        modalEnter: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: 0
          }
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-10%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
          }
        },
        pulse: {
          '50%': {
            opacity: .5
          }
        },
        spin: {
          to: {
            transform: 'rotate(360deg)'
          }
        }
      },
      animation: {
        modalEnter: 'modalEnter 0.2s ease-out',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        bounce: 'bounce 1s infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        spin: 'spin 1s linear infinite'
      }
    },
  },
  plugins: [],
};