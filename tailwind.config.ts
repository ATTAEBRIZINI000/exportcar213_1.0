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
        bg:      '#06060A',
        'bg-2':  '#0D1117',
        'bg-3':  '#131B23',
        accent:  '#3B82F6',
        price:   '#34D399',
        // Legacy
        red: {
          DEFAULT: '#3B82F6',
          dk: '#2563EB',
        },
        green: {
          DEFAULT: '#34D399',
          dk: '#10B981',
        },
        black: '#06060A',
        'off-white': '#0D1117',
        gray: {
          DEFAULT: 'rgba(240,244,255,0.45)',
          lt: 'rgba(255,255,255,0.07)',
        },
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        barlow: ['Inter', 'system-ui', 'sans-serif'],
      },
      height: {
        nav: '68px',
        'nav-sm': '60px',
      },
    },
  },
  plugins: [],
}
export default config
