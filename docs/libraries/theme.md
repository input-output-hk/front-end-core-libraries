# Theme

Theme related functionality.

## Dependencies

* [@material-ui/core](https://npmjs.com/package/@material-ui/core) `^4.9.5`

## Reference

### Function - getFontSize

The exported function `getFontSize` will calculate the font size from 2 numbers and output a string font size in `rem` units. It takes 2 arguments:

| argument | description | type | required | default |
| -------- | ----------- | ---- | -------- | ------- |
| fontSize | The font size to use for the conversion | Number | ✗ | - |
| baseFontSize | The base font size to convert against | Number | ✓ | - |

The formula for the calculation when fontSize is a valid number > 0 is `baseFontSize * fontSize / 10`

When fontsize is not a valid number > 0 then the formula is simply `baseFontSize / 10`

### Function - getLetterSpacing

The exported function `getLetterSpacing` will get the letter spacing value from 2 numbers and output a string font size in `rem` units. It takes 2 arguments:

| argument | description | type | required | default |
| -------- | ----------- | ---- | -------- | ------- |
| letterSpacing | The letter spacing value to use | Number | ✗ | - |
| fallbackLetterSpacing | The fallback letter spacing value to use | Number | ✓ | - |

The numbers are taken on a 1:1 scale.

```JavaScript
getLetterSpacing(0.4, 0.6) // -> 0.4rem
getLetterSpacing(null, 0.6) // -> 0.6rem
getLetterSpacing(0, 0.6) // -> 0rem
getLetterSpacing(-1, 0.6) // -> -1rem
```

### Function - convertThemeToMaterial

Converts a theme to a Material UI based theme. Intended to be used with [@input-output-hk/front-end-themes](https://npmjs.com/package/@input-output-hk/front-end-themes) themes to convert for usage with [@material-ui/core](https://npmjs.com/package/@material-ui/core).

| argument | description | type | required | default |
| -------- | ----------- | ---- | -------- | ------- |
| theme | The theme to convert. See [@input-output-hk/front-end-themes](https://npmjs.com/package/@input-output-hk/front-end-themes) themes for structure. | Object | ✓ | - |
