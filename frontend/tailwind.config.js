/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          light: '#3B82F6',
          dark: '#1D4ED8',
        },
        secondary: '#0F172A',
        accent: {
          DEFAULT: '#06B6D4',
          light: '#22D3EE',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          dark: '#111827',
          card: '#1E293B',
        },
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(6,182,212,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.08) 1px, transparent 1px)',
        'gradient-primary': 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
      },
      backgroundSize: {
        grid: '32px 32px',
      },
      boxShadow: {
        glow: '0 0 24px rgba(6,182,212,0.25)',
        glass: '0 8px 32px 0 rgba(15,23,42,0.37)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      },
    },
  },
  plugins: [],
};
