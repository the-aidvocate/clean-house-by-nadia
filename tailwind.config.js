/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B7197', // Deep Teal / Steel Blue from the logo text
          dark: '#1E405A',
          light: '#619BBF',
        },
        gold: {
          DEFAULT: '#D4AF37', // Premium Gold
          light: '#F3E5AB',
          dark: '#AA8822',
        },
        surface: {
          DEFAULT: '#FAFAFA', // Clean warm white
          dark: '#F0F4F8',    // Very light blue-gray
        },
        ink: {
          DEFAULT: '#1E293B', // Slate 800
          light: '#475569',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'sparkle': 'sparkle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.8) rotate(0deg)' },
          '50%': { opacity: 1, transform: 'scale(1.2) rotate(15deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}