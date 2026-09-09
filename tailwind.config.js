/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*.php",
    "./**/*.html",
    "./**/*.php",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          500: '#3B82F6',
          600: '#2563EB', // Deep Trust Blue
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        action: {
          50:  '#F0FDF4',
          100: '#DCFCE7',
          500: '#22C55E',
          600: '#16A34A', // Conversion Green CTA
          700: '#15803D',
          800: '#166534',
        },
        surface: {
          light:  '#F8FAFC', // Clean Off-White background
          card:   '#FFFFFF', // Pure White card container
          border: '#E2E8F0', // Crisp subtle border
          muted:  '#F1F5F9', // Subtle section tint
        },
        dark: {
          slate: '#0F172A', // Dark Slate heading & high-contrast text
          body:  '#334155', // Body paragraph text (WCAG AAA)
          muted: '#64748B', // Secondary metadata text
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 0.5s ease both',
        'float':   'float 3.5s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'card': '0 10px 25px -5px rgba(37, 99, 235, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'drop': '0 20px 40px -15px rgba(37, 99, 235, 0.12)',
      }
    }
  },
  plugins: [],
}
