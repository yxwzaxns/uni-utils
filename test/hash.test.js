const assert = require('assert').strict
const os = require('os')
const path = require('path')

const hash = require('../src/hash')

describe('#hash Test', function () {
    describe('#String hash test', function () {
        const testString = `abcd1234!@#$%^&*()-=_+[]\\{}|;':",./<>?~\``
        const md5String = "a99236113377c7a77a3e02b15b23c64e"
        const sha1String = "44b99c1c2e141dbc006ee119409ee7760a0ceb03"
        const sha256String = "e2c8b636fac7a2bc78d68f0126dc00d490699d2b2ac2ec11c3ce150fa423e51a"
        const sha512String = "395f60474c73f12ae0e88696e79bc9f6918eb0ffe29a3e4e742521d3717d7fa5bf20f6f4cc245782b7b1ccde40b66f0153e9fa57f30edf4475eed83cb4787c0e"
        it(`hash.md5'`, () => {
            assert.equal(md5String, hash.md5(testString))
        })
        it(`hash.sha1'`, () => {
            assert.equal(sha1String, hash.sha1(testString))
        })
        it(`hash.sha256'`, () => {
            assert.equal(sha256String, hash.sha256(testString))
        })
        it(`hash.sha512'`, () => {
            assert.equal(sha512String, hash.sha512(testString))
        })
    })

    describe('#file hash test', function () {
        const filePath = path.join(__dirname,'test.download')
        const fileMd5 = "1db6270cbe304dafe0dff5992c98f417"
        const fileSha256 = "97e6191c5dffb41dbf7de3ef88bf90764f72d69b7371ce64852857ca07f0818b"
        it(`hash.getFileMd5'`,async () => {
            const res = await hash.getFileMd5(filePath)
            assert.equal(fileMd5, res)
        })
        it(`hash.getFileSha256'`, async () => {
            const res = await hash.getFileSha256(filePath)
            assert.equal(fileSha256, res)
        })
    })

})
