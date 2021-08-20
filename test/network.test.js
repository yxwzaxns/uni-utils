const assert = require('assert').strict
const path = require('path')
const network = require('../src/network')
const file = require('../src/file')
const dir = require('../src/dir')

describe('#networkTest', function () {
    describe('#download()', function () {
        let url = 'https://raw.githubusercontent.com/yxwzaxns/uni-utils/master/test/test.download'
        let savePath = '/tmp/test.download'
        const downloadText = 'download test\n'
        it(`download('${url}')`, async () => {
            const ret = await network.download(url)
            assert.equal(ret, downloadText)
        })
        it(`download('${url}',{savePath:${savePath}}) and save file: ${savePath}`, async () => {
            await network.download(url,{savePath:savePath})
            const content = await file.readFile(savePath)
            assert.equal(content, downloadText)
        })
        after(async () =>{
            await file.rm(savePath)
        });
    })
    describe('#listDownload()', function () {
        let urls = ['https://www.youtube.com', 'https://google.com']
        let dirPath = '/tmp/listDownload'
        before(async ()=>{
            await dir.createDir(dirPath)
        })
        it(`listDownload(${urls})`, async () => {
            const ret = await network.listDownload(urls.map(e => { return { downUrl: e, savePath: path.resolve(dirPath, e.split('//')[1])}}))
            assert(ret.filter(e=>e).length==0)
        })
        after(async () => {
            await file.rm(dirPath)
        });
    })
})
