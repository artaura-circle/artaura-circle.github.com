/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        script: ['var(--font-caveat)', 'Caveat', 'cursive'],
      },
      colors: {
        cream: {
          50: '#FCF8F1',
          100: '#FAF4EA',
          200: '#F5EBDD',
          300: '#EFE0CB',
          400: '#E7D2B5',
        },
        terracotta: {
          50: '#FBEFE7',
          100: '#F4DBC9',
          200: '#ECC2A6',
          300: '#E5A781',
          400: '#D89A78',
          500: '#C97F58',
          600: '#B66B45',
          700: '#955236',
        },
        sienna: {
          50: '#F1E4D7',
          100: '#D9B89A',
          200: '#B58660',
          300: '#8E5A36',
          400: '#74442A',
          500: '#5A3220',
          600: '#46271A',
          700: '#321B12',
        },
        border: 'hsl(30 25% 80%)',
        input: 'hsl(30 25% 80%)',
        ring: 'hsl(22 45% 45%)',
        background: '#FAF4EA',
        foreground: '#5A3220',
        primary: { DEFAULT: '#5A3220', foreground: '#FAF4EA' },
        secondary: { DEFAULT: '#EFE0CB', foreground: '#5A3220' },
        muted: { DEFAULT: '#F5EBDD', foreground: '#8E5A36' },
        accent: { DEFAULT: '#D89A78', foreground: '#5A3220' },
        card: { DEFAULT: '#FCF8F1', foreground: '#5A3220' },
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'soft-pulse': { '0%,100%': { opacity: 0.6 }, '50%': { opacity: 1 } },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'soft-pulse': 'soft-pulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
