/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mazda-charcoal': '#212529',
        'mazda-black': '#0E0F10',
        'mazda-burgundy': '#910A2D',
        'mazda-steel-gray': '#B5B6B6',
        'mazda-blue': '#0D6EFD',
        'mazda-success': '#198754',
        'mazda-cyan': '#0DCAF0',
        'mazda-error': '#DC3545',
        'mazda-warning': '#FFC107',
        'mazda-dark-charcoal': '#343A40',
        'mazda-very-dark-gray': '#383839',
        'mazda-light-gray': '#F8F9FA',
        'mazda-border-gray': '#DEE2E6',
        'mazda-medium-gray': '#898989',
        'mazda-faded-gray': '#F2F2F2',
      },
      fontFamily: {
        mazda: [
          'MazdaType',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Helvetica Neue',
          'sans-serif',
        ],
        system: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      fontSize: {
        'display-lg': ['49.5px', { lineHeight: '59.4px' }],
        'h2': ['32px', { lineHeight: '38.4px' }],
        'h3': ['28px', { lineHeight: '33.6px' }],
        'h4': ['32px', { lineHeight: '38.4px' }],
        'h5': ['20px', { lineHeight: '24px' }],
        'body': ['15.2px', { lineHeight: '22.8px' }],
        'body-emphasis': ['20px', { lineHeight: '20px' }],
        'input': ['28.8px', { lineHeight: '43.2px' }],
        'list': ['16px', { lineHeight: '24px' }],
        'caption': ['15.2px', { lineHeight: '22.8px' }],
        'nav-link': ['20px', { lineHeight: '30px' }],
        'button': ['15.2px', { lineHeight: '22.8px' }],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
        'premium-hover': '0 20px 40px -15px rgba(145, 10, 45, 0.18)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.06)',
        'glow': '0 0 25px rgba(145, 10, 45, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
