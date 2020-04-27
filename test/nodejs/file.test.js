const assert = require('assert').strict
const file = require('../../src/nodejs/file')

const filePath = '/tmp/test.save'
describe('#fileTest', function () {
    describe('#checkFile()', function () {
        it(`checkFile('${filePath}')`, async () => {
            const ret = await file.checkFile(filePath)
            assert(!ret)
        })
    })
    describe('#saveFile()', function () {
        it(`saveFile('${filePath}')`, async () => {
            const ret = await file.saveFile('saveFile',filePath)
            console.log('saveFile:',ret)
        })
    })
    describe('#readFile()', function () {
        it(`readFile('${filePath}')`, async () => {
            const content = await file.readFile(filePath)
            assert.equal('saveFile', content)
        })
    })
    after(async ()=>{
        await file.rm(filePath)
    })
})

