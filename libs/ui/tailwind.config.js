const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const colors = require('./assets/scripts/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    'assets/styles/tailwind.css',
    'assets/scripts/*.{js,ts}',
    'src/components/**/*.{html,js,jsx,ts,tsx,md}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'class',
  variants: {
    extend: {
      // the order of states matters!
      backgroundColor: [
        'dark',
        'responsive',
        'disabled',
        'hover',
        'focus',
        'active',
      ],
      borderColor: [
        'dark',
        'responsive',
        'disabled',
        'hover',
        'focus',
        'active',
      ],
      opacity: ['disabled'],
      textColor: ['dark', 'responsive', 'disabled', 'hover', 'focus', 'active'],
    },
  },
  theme: {
    extend: {
      screens: {
        xs: '375px',
        ...defaultTheme.screens,
      },
      colors: {
        inherit: colors.inherit,
        current: colors.current,
        light: {
          background: colors.slate.lightest,
          foreground: colors.slate.darkest,
          link: colors.accent.primary,
          linkHover: colors.accent.secondary,
        },
        dark: {
          background: colors.slate.darkest,
          foreground: colors.slate.lightest,
          link: colors.accent.secondary,
          linkHover: colors.accent.primary,
        },
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        link: 'var(--color-link)',
        linkHover: 'var(--color-link-hover)',
        backdrop: '#0b1728',
        smoke: colors.slate.light,
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '4rem',
        '8xl': '6rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
