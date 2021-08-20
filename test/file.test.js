const assert = require('assert').strict
const file = require('../src/file')
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
    describe('#checkFileSync()', function () {
        it(`checkFile('${filePath}')`, () => {
            const ret = file.checkFileSync(filePath)
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
    describe('#readFileSync()', function () {
        it(`readFile('${filePath}')`, () => {
            const content = file.readFileSync(filePath)
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
    describe('#readCsv()', function () {
        it(`readCsv('${filePath}')`, async () => {
            const t =`1,2,3\n4,5,6\n7,8,9\n`
            await file.saveFile(t, filePath)
            const content = await file.readCsv(filePath)
            assert.equal(3, content.length)
            assert.equal(3, content[0].length)
        })
    })
    after(async ()=>{
        await file.rm(filePath)
    })
})
