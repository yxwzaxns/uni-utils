const core = require('./core')
const file = require('./file')
const dir = require('./dir')
const network = require('./network')
const time = require('./time')
const process = require('./process')
const hash = require('./hash')
const path = require('./path')
const text = require('./text')

module.exports = {
    version: require(require('path').join(__dirname,'../package.json')).version,
    ...core,
    ...file,
    ...dir,
    ...network,
    ...time,
    ...process,
    hash,
    ...path,
    ...text
}
