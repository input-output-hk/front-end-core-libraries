import { createMuiTheme } from '@material-ui/core'

export function getFontSize (fontSize, baseFontSize) {
  if (typeof baseFontSize !== 'number' || baseFontSize <= 0) throw new Error('getFontSize error, baseFontSize must be a number greater than 0')
  return (fontSize && typeof fontSize === 'number' && fontSize > 0)
    ? `${baseFontSize * fontSize / 10}rem`
    : `${baseFontSize / 10}rem`
}

/**
 * Converts theme object from @input-output-hk/front-end-themes
 * to Material UI (@material-ui/core) theme
 *
 * @param {Object} theme The theme from @input-output-hk/front-end-themes
 * @returns {Object}
 */
export function convertThemeToMaterial (theme) {
  return createMuiTheme({
    name: theme.name,
    overrides: {
      MuiSvgIcon: {
        root: {
          width: '1.4em',
          height: '1.4em'
        }
      }
    },
    palette: {
      ...theme.colors,
      type: theme.type
    },
    typography: {
      ...theme.typography,
      htmlFontSize: theme.typography.baseFontSize,
      h1: {
        ...theme.typography.h1,
        fontSize: getFontSize(theme.typography.h1.fontSize, theme.typography.baseFontSize)
      },
      h2: {
        ...theme.typography.h2,
        fontSize: getFontSize(theme.typography.h2.fontSize, theme.typography.baseFontSize)
      },
      h3: {
        ...theme.typography.h3,
        fontSize: getFontSize(theme.typography.h3.fontSize, theme.typography.baseFontSize)
      },
      h4: {
        ...theme.typography.h4,
        fontSize: getFontSize(theme.typography.h4.fontSize, theme.typography.baseFontSize)
      },
      h5: {
        ...theme.typography.h5,
        fontSize: getFontSize(theme.typography.h5.fontSize, theme.typography.baseFontSize)
      },
      h6: {
        ...theme.typography.h6,
        fontSize: getFontSize(theme.typography.h6.fontSize, theme.typography.baseFontSize)
      },
      body1: {
        ...theme.typography.body,
        fontSize: getFontSize(theme.typography.body.fontSize, theme.typography.baseFontSize)
      },
      body2: {
        ...theme.typography.body,
        fontSize: getFontSize({ ...theme.typography.body.fontSize, fontSize: theme.typography.body.fontSize || 0.95 }, theme.typography.baseFontSize)
      },
      button: {
        ...theme.typography.button,
        fontSize: getFontSize(theme.typography.button.fontSize, theme.typography.baseFontSize)
      },
      caption: {
        ...theme.typography.caption,
        fontSize: getFontSize(theme.typography.caption.fontSize, theme.typography.baseFontSize)
      }
    },
    spacing: (factor) => `${factor}rem`
  })
}