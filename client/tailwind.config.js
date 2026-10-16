/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        vazir: ['Vazirmatn', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Vazirmatn', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        abyss: {
          950: '#020408',
          900: '#03070d',
          850: '#060c16',
          800: '#0a1424',
          750: '#0e1d33',
          700: '#132844',
          600: '#1b3b64',
          500: '#285890',
        },
        biolume: {
          cyan: '#00f0ff',
          neon: '#10ffa0',
          violet: '#a855f7',
          amber: '#ffb800',
          crimson: '#ff2a5f',
        }
      },
      backgroundImage: {
        'abyss-gradient': 'radial-gradient(ellipse at top, #091728 0%, #03070d 70%, #010306 100%)',
        'glow-cyan': 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
        'glow-green': 'radial-gradient(circle, rgba(16, 255, 160, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sonar': 'sonar 3s ease-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        sonar: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
