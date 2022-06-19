const colors = require('./colors')

module.exports = {
  theme: {
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
  },
}
