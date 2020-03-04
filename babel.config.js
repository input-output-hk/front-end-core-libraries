const presets = [
  '@babel/preset-env',
  '@babel/preset-react'
]

const plugins = [
  '@babel/plugin-transform-runtime'
]

const ignore = [
  '**/*.test.js',
  '**/*.test.js.snap'
]

module.exports = {
  presets,
  plugins,
  ignore: process.env.NODE_ENV === 'test' ? undefined : ignore
}
