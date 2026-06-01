import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: '#C0392B',
          dk: '#a12e22',
        },
        green: {
          DEFAULT: '#27AE60',
          dk: '#1e9450',
        },
        black: '#1A1A1A',
        'off-white': '#F5F5F5',
        gray: {
          DEFAULT: '#8A8A8A',
          lt: '#E8E8E8',
        },
      },
      fontFamily: {
        barlow: ['"Barlow Condensed"', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      height: {
        nav: '72px',
        'nav-sm': '60px',
      },
    },
  },
  plugins: [],
}
export default config
