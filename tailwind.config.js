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
          dark: '#2A5574',    // Darker shade for hover states
          light: '#619BBF',   // Lighter shade for accents
        },
        accent: {
          DEFAULT: '#B0D0E8', // Light sky blue from the sparkles
          light: '#E6F0F9',   // Very light blue for backgrounds
        },
        surface: {
          DEFAULT: '#F8FAFC', // Almost white but slightly cool
          dark: '#F1F5F9',    // Slate 50
        },
        ink: {
          DEFAULT: '#0F172A', // Slate 900
          light: '#334155',   // Slate 700
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
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.8) rotate(0deg)' },
          '50%': { opacity: 1, transform: 'scale(1.2) rotate(15deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}