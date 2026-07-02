/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E63946',
          light: '#FF6B6B',
          dark: '#C1121F',
        },
        background: '#0A0A0A',
        surface: {
          DEFAULT: '#111111',
          elevated: '#1A1A1A',
        },
        border: {
          DEFAULT: '#2A2A2A',
          subtle: '#1E1E1E',
        },
        text: {
          primary: '#F0F0F0',
          secondary: '#999999',
          tertiary: '#666666',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      maxWidth: {
        'container': '1700px',
        'content': '1400px',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'slow': '400ms',
      },
    },
  },
  plugins: [],
}
