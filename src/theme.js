import { createMuiTheme } from '@material-ui/core'

export function getFontSize (fontSize, baseFontSize) {
  if (typeof baseFontSize !== 'number' || isNaN(baseFontSize) || baseFontSize <= 0) throw new Error('getFontSize error, baseFontSize must be a number greater than 0')
  return (fontSize && typeof fontSize === 'number' && fontSize > 0)
    ? `${baseFontSize * fontSize / 10}rem`
    : `${baseFontSize / 10}rem`
}

export function getLetterSpacing (letterSpacing, baseLetterSpacing) {
  if (typeof baseLetterSpacing !== 'number' || isNaN(baseLetterSpacing)) throw new Error('getLetterSpacing error, baseLetterSpacing must be a number')
  return (typeof letterSpacing === 'number' && !isNaN(letterSpacing))
    ? `${letterSpacing}rem`
    : `${baseLetterSpacing}rem`
}

function getResponsiveFontConfig (font, baseFontSize) {
  const keys = Object.keys(font).filter(key => key.match(/^@/))
  const responsiveConfig = {}
  keys.forEach(key => {
    responsiveConfig[key] = { ...font[key] }
    if (responsiveConfig[key].fontSize !== undefined) responsiveConfig[key].fontSize = getFontSize(responsiveConfig[key].fontSize, baseFontSize)
  })

  return responsiveConfig
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
    ...theme,
    name: theme.name,
    overrides: {
      ...(theme.overrides || {}),
      MuiSvgIcon: {
        ...((theme.overrides && theme.overrides.MuiSvgIcon) || {}),
        root: {
          ...((theme.overrides && theme.overrides.MuiSvgIcon && theme.overrides.MuiSvgIcon.root) || {}),
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
        letterSpacing: getLetterSpacing(theme.typography.h1.letterSpacing, theme.typography.letterSpacing),
        fontSize: getFontSize(theme.typography.h1.fontSize, theme.typography.baseFontSize),
        ...getResponsiveFontConfig(theme.typography.h1, theme.typography.baseFontSize)
      },
      h2: {
        ...theme.typography.h2,
        letterSpacing: getLetterSpacing(theme.typography.h2.letterSpacing, theme.typography.letterSpacing),
        fontSize: getFontSize(theme.typography.h2.fontSize, theme.typography.baseFontSize),
        ...getResponsiveFontConfig(theme.typography.h2, theme.typography.baseFontSize)
      },
      h3: {
        ...theme.typography.h3,
        letterSpacing: getLetterSpacing(theme.typography.h3.letterSpacing, theme.typography.letterSpacing),
        fontSize: getFontSize(theme.typography.h3.fontSize, theme.typography.baseFontSize),
        ...getResponsiveFontConfig(theme.typography.h3, theme.typography.baseFontSize)
      },
      h4: {
        ...theme.typography.h4,
        letterSpacing: getLetterSpacing(theme.typography.h4.letterSpacing, theme.typography.letterSpacing),
        fontSize: getFontSize(theme.typography.h4.fontSize, theme.typography.baseFontSize),
        ...getResponsiveFontConfig(theme.typography.h4, theme.typography.baseFontSize)
      },
      h5: {
        ...theme.typography.h5,
        letterSpacing: getLetterSpacing(theme.typography.h5.letterSpacing, theme.typography.letterSpacing),
        fontSize: getFontSize(theme.typography.h5.fontSize, theme.typography.baseFontSize),
        ...getResponsiveFontConfig(theme.typography.h5, theme.typography.baseFontSize)
      },
      h6: {
        ...theme.typography.h6,
        letterSpacing: getLetterSpacing(theme.typography.h6.letterSpacing, theme.typography.letterSpacing),
        fontSize: getFontSize(theme.typography.h6.fontSize, theme.typography.baseFontSize),
        ...getResponsiveFontConfig(theme.typography.h6, theme.typography.baseFontSize)
      },
      body1: {
        ...theme.typography.body,
        letterSpacing: getLetterSpacing(theme.typography.body.letterSpacing, theme.typography.letterSpacing),
        fontSize: getFontSize(theme.typography.body.fontSize, theme.typography.baseFontSize),
        ...getResponsiveFontConfig(theme.typography.body, theme.typography.baseFontSize)
      },
      body2: {
        ...theme.typography.body,
        letterSpacing: getLetterSpacing(theme.typography.small.letterSpacing, theme.typography.letterSpacing),
        fontSize: getFontSize(theme.typography.small.fontSize, theme.typography.baseFontSize),
        ...getResponsiveFontConfig(theme.typography.small, theme.typography.baseFontSize)
      },
      button: {
        ...theme.typography.button,
        letterSpacing: getLetterSpacing(theme.typography.button.letterSpacing, theme.typography.letterSpacing),
        fontSize: getFontSize(theme.typography.button.fontSize, theme.typography.baseFontSize),
        ...getResponsiveFontConfig(theme.typography.button, theme.typography.baseFontSize)
      },
      caption: {
        ...theme.typography.caption,
        letterSpacing: getLetterSpacing(theme.typography.caption.letterSpacing, theme.typography.letterSpacing),
        fontSize: getFontSize(theme.typography.caption.fontSize, theme.typography.baseFontSize),
        ...getResponsiveFontConfig(theme.typography.caption, theme.typography.baseFontSize)
      }
    },
    spacing: (factor) => `${factor}rem`
  })
}
