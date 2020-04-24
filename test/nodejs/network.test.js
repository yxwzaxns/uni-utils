const assert = require('assert').strict
const network = require('../../src/nodejs/network')

describe('#networkTest', function () {
    describe('#download()', function () {
        let url = 'https://raw.githubusercontent.com/yxwzaxns/uni-utils/master/test/test.download'
        let savePath = '/tmp/test.download'
        it(`download('${url}','${savePath}')`, async () => {
            const ret = await network.download(url)
            assert.equal(ret.trim(), "download test")
        })
    })
})

