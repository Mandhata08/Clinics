/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        royal: {
          50: '#fdf8f0',
          100: '#faebd7',
          200: '#f4d4a7',
          300: '#edb76f',
          400: '#e69537',
          500: '#d4751a',
          600: '#b85c14',
          700: '#964515',
          800: '#7a3818',
          900: '#652f17',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf9f0',
          200: '#faf1e0',
          300: '#f5e6c8',
          400: '#eed9a7',
          500: '#e5c878',
          600: '#d4af37',
          700: '#b8941f',
          800: '#967818',
          900: '#7a6217',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'elegant': ['Cormorant Garamond', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'royal-glow': 'royalGlow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        royalGlow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        }
      },
      backgroundImage: {
        'royal-gradient': 'linear-gradient(135deg, #d4af37 0%, #b8941f 50%, #967818 100%)',
        'cream-gradient': 'linear-gradient(135deg, #fefdfb 0%, #faf1e0 50%, #f5e6c8 100%)',
        'luxury-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23d4af37\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-royal-600',
    'bg-gold-600',
    'bg-cream-600',
    'text-royal-600',
    'text-gold-600',
    'text-cream-600',
    'border-royal-600',
    'border-gold-600',
    'border-cream-600',
    'from-royal-500',
    'to-royal-600',
    'from-gold-500',
    'to-gold-600',
    'from-cream-500',
    'to-cream-600',
  ]
};