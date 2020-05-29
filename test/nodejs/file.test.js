const assert = require('assert').strict
const file = require('../../src/nodejs/file')
const filePath = '/tmp/test.file'
const fileContent = 'test content !'
describe('#fileTest', function () {
    before(async ()=>{
        
    })
    describe('#checkFile()', function () {
        it(`checkFile('${filePath}')`, async () => {
            const ret = await file.checkFile(filePath)
            assert(!ret)
        })
    })
    describe('#saveFile()', function () {
        it(`saveFile('${filePath}')`, async () => {
            const ret = await file.saveFile(fileContent,filePath)
            assert(ret)
        })
    })
    describe('#readFile()', function () {
        it(`readFile('${filePath}')`, async () => {
            const content = await file.readFile(filePath)
            assert.equal(fileContent, content)
        })
    })
    describe('#getLastLine()', function () {
        it(`getLastLine('${filePath}')`, async () => {
            const t =`12345
                67890
                abcde
                hello
                `
            await file.saveFile(t, filePath)
            const content = await file.getLastLine(filePath)
            assert.equal('hello', content)
        })
    })
    after(async ()=>{
        await file.rm(filePath)
    })
})

