/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./pages/**/*.html",
    "./dashboard/**/*.html",
    "./assets/js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
            colors: {
        primary: 'rgb(var(--primary-red) / <alpha-value>)',
        deepGreen: 'rgb(var(--primary-red-dark) / <alpha-value>)',
        softGreen: 'rgb(var(--primary-red-light) / <alpha-value>)',
        mint: 'rgb(var(--bg-tertiary) / <alpha-value>)',
        accent: 'rgb(var(--primary-red) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        card: 'rgb(var(--surface-secondary) / <alpha-value>)',
        background: 'rgb(var(--bg-secondary) / <alpha-value>)',
        textMain: 'rgb(var(--text-primary) / <alpha-value>)',
        muted: 'rgb(var(--text-muted) / <alpha-value>)',
        borderLight: 'rgb(var(--border-primary) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(198, 40, 40, 0.08)',
      }
    },
  },
  plugins: [],
}
