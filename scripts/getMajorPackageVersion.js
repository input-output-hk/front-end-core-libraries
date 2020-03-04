const packageJSON = require('../package.json')
console.log(packageJSON.version.replace(/\.\d+\.\d+$/, ''))
