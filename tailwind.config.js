/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm sand page background
        sand: '#EDE3D3',
        // Dark editorial surfaces (glass cards, dark panels, navbar)
        ink: {
          900: '#0B0911',
          800: '#100D18',
          700: '#16121F',
          600: '#201A2D',
          500: '#2A2338',
        },
        // Light text — for text on dark glass cards / dark panels
        mist: {
          100: '#F6F3FC',
          200: '#DBD4E8',
          300: '#B3AAC4',
          400: '#837B92',
        },
        // Warm pastel accents
        cream: '#FFF7F2',
        peach: {
          50: '#FFF1EA',
          100: '#FFE3D6',
          200: '#FFC9B3',
          300: '#FFB39A',
          400: '#FF9E84',
          500: '#FF8A6B',
        },
        blush: {
          100: '#FFE0EA',
          200: '#FFC2D6',
          300: '#FFA6C4',
          400: '#FF87AE',
        },
        lilac: {
          100: '#EDE6FF',
          200: '#D9CCFF',
          300: '#C3B0FF',
          400: '#A98EFF',
          500: '#8E6BFF',
        },
        sky: {
          100: '#E2EEFF',
          200: '#C4DBFF',
        },
        plum: {
          700: '#5A4761',
          800: '#43344A',
          900: '#2E2233',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
        blob: '42% 58% 63% 37% / 41% 44% 56% 59%',
      },
      boxShadow: {
        soft: '0 18px 50px -20px rgba(255, 138, 107, 0.45)',
        lilacGlow: '0 18px 60px -18px rgba(142, 107, 255, 0.45)',
        blushGlow: '0 18px 60px -18px rgba(255, 135, 174, 0.5)',
        // Soft shadow for dark glass cards floating on the sand background
        card: '0 8px 32px -6px rgba(11,9,17,0.22), 0 2px 8px rgba(11,9,17,0.10)',
        pill: '0 10px 34px -8px rgba(255, 135, 174, 0.55)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        floatySlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-26px) rotate(6deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        blobMorph: {
          '0%, 100%': { borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%' },
          '50%': { borderRadius: '58% 42% 37% 63% / 56% 59% 41% 44%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        pulseHeart: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.25)' },
          '30%': { transform: 'scale(1)' },
        },
        letterWave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-0.12em)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        floatySlow: 'floatySlow 9s ease-in-out infinite',
        wiggle: 'wiggle 2.5s ease-in-out infinite',
        blob: 'blobMorph 12s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        shimmer: 'shimmer 6s ease infinite',
        heart: 'pulseHeart 2.4s ease-in-out infinite',
        letterWave: 'letterWave 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
