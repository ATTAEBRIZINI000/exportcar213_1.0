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
        bg:      '#F8F6F3',
        'bg-2':  '#FFFFFF',
        'bg-3':  '#F0EDEA',
        accent:  '#CC0000',
        price:   '#CC0000',
        // New exportcar design tokens
        'exportcar-red':                '#CC0000',
        'exportcar-red-hover':          '#AA0000',
        'exportcar-green':              '#1A5C2A',
        'exportcar-bg':                 '#F8F6F3',
        'exportcar-surface':            '#FFFFFF',
        'exportcar-surface-secondary':  '#F0EDEA',
        'exportcar-border':             '#E5E1DC',
        'exportcar-text':               '#1A1A1A',
        'exportcar-text-secondary':     '#6B7280',
        // Legacy
        red: {
          DEFAULT: '#CC0000',
          dk: '#AA0000',
        },
        green: {
          DEFAULT: '#1A5C2A',
          dk: '#155224',
        },
        black: '#1A1A1A',
        'off-white': '#F8F6F3',
        gray: {
          DEFAULT: 'rgba(26,26,26,0.45)',
          lt: 'rgba(0,0,0,0.06)',
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
