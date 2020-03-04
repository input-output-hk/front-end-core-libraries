module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '<rootDir>/jest/preprocess.js'
  },
  setupFilesAfterEnv: [ '<rootDir>/jest/setup.js' ],
  testPathIgnorePatterns: [ 'node_modules' ],
  transformIgnorePatterns: [ 'node_modules/.*/' ],
  snapshotSerializers: [ 'enzyme-to-json/serializer' ]
}
