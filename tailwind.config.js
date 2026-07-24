const siteSettings = require('./config/site-settings.json');
const primaryColor = siteSettings.primaryColor || '#0f4c81';
const accentColor = siteSettings.accentColor || '#00b4d8';

// Helper to lighten/darken hex colors
function adjustColor(hex, percent) {
  let num = parseInt(hex.replace('#',''), 16),
  amt = Math.round(2.55 * percent),
  R = (num >> 16) + amt,
  G = (num >> 8 & 0x00FF) + amt,
  B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R<255?R<0?0:R:255)*0x10000 + (G<255?G<0?0:G:255)*0x100 + (B<255?B<0?0:B:255)).toString(16).slice(1);
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  safelist: [
    'theme-default',
    'theme-nordic',
    'theme-cyberpunk',
    'theme-luxury',
    'theme-organic',
    'theme-editorial',
    'theme-vibrant',
    'theme-futuristic',
    'theme-bold',
    'theme-trust',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          light: 'hsl(var(--primary) / 0.1)',
          dark: 'hsl(var(--primary) / 0.9)',
          50: 'hsl(var(--primary) / 0.05)',
          100: 'hsl(var(--primary) / 0.1)',
          200: 'hsl(var(--primary) / 0.2)',
          300: 'hsl(var(--primary) / 0.3)',
          400: 'hsl(var(--primary) / 0.4)',
          500: 'hsl(var(--primary) / <alpha-value>)',
          600: 'hsl(var(--primary) / 0.9)',
          700: 'hsl(var(--primary) / 0.8)',
          800: 'hsl(var(--primary) / 0.7)',
          900: 'hsl(var(--primary) / 0.6)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          light: 'hsl(var(--secondary) / 0.1)',
          dark: 'hsl(var(--secondary) / 0.9)',
          50: 'hsl(var(--secondary) / 0.05)',
          100: 'hsl(var(--secondary) / 0.1)',
          200: 'hsl(var(--secondary) / 0.2)',
          300: 'hsl(var(--secondary) / 0.3)',
          400: 'hsl(var(--secondary) / 0.4)',
          500: 'hsl(var(--secondary) / <alpha-value>)',
          600: 'hsl(var(--secondary) / 0.9)',
          700: 'hsl(var(--secondary) / 0.8)',
          800: 'hsl(var(--secondary) / 0.7)',
          900: 'hsl(var(--secondary) / 0.6)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          light: 'hsl(var(--accent) / 0.1)',
          dark: 'hsl(var(--accent) / 0.9)',
          50: 'hsl(var(--accent) / 0.05)',
          100: 'hsl(var(--accent) / 0.1)',
          200: 'hsl(var(--accent) / 0.2)',
          300: 'hsl(var(--accent) / 0.3)',
          400: 'hsl(var(--accent) / 0.4)',
          500: 'hsl(var(--accent) / <alpha-value>)',
          600: 'hsl(var(--accent) / 0.9)',
          700: 'hsl(var(--accent) / 0.8)',
          800: 'hsl(var(--accent) / 0.7)',
          900: 'hsl(var(--accent) / 0.6)',
        },
        gold: {
          DEFAULT: 'hsl(var(--gold) / <alpha-value>)',
          light: 'hsl(var(--gold) / 0.2)',
          dark: 'hsl(var(--gold) / 0.9)',
        },
        surface: {
          DEFAULT: 'hsl(var(--background) / <alpha-value>)',
          dark: 'hsl(var(--background) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          dark: 'hsl(var(--card) / <alpha-value>)',
        },
      },
      fontFamily: {
        heading: ['Outfit', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
        body: ['Inter', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 180, 216, 0.15)',
        'glow-lg': '0 0 40px rgba(0, 180, 216, 0.2)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.12)',
        'premium': '0 20px 60px rgba(15, 76, 129, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--secondary)) 100%)',
        'hero-gradient-dark': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--secondary)) 100%)',
        'card-gradient': 'linear-gradient(145deg, hsl(var(--card) / 0.9) 0%, hsl(var(--background) / 0.8) 100%)',
        'gold-gradient': 'linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(var(--gold) / 0.2) 50%, hsl(var(--gold)) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'water-wave': 'waterWave 8s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scroll': 'scroll 30s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        waterWave: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(10px) translateY(-5px)' },
          '50%': { transform: 'translateX(0) translateY(-10px)' },
          '75%': { transform: 'translateX(-10px) translateY(-5px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 180, 216, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 180, 216, 0.4)' },
        },
      },
    },
  },
  plugins: [],
};
