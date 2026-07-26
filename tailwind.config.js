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
          dark: '#2A5574',
          light: '#619BBF',
        },
        accent: {
          DEFAULT: '#B0D0E8', // Light sky blue
          light: '#E6F0F9',
        },
        warm: {
          DEFAULT: '#F2C94C', // Warm sunshine/gold accent
          light: '#FEF3C7',
        },
        surface: {
          DEFAULT: '#FFFCF5', // Warm pearl/cream instead of cold white
          dark: '#F4EFEB',    // Cozy off-white
        },
        ink: {
          DEFAULT: '#27272A', // Softer charcoal instead of harsh slate
          light: '#4B5563',
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