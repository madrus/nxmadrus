const colors = require('./shared/styles/colors')

module.exports = {
  theme: {
    extend: {
      screens: {
        xs: '375px',
      },
      colors: {
        ...colors,
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
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
