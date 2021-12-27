const assert = require('assert').strict
const os = require('os')

const text = require('../src/text')

describe('#textTest', function () {
    describe('#parseHtml()', function () {
        const htmlString = '<h2 class="title">Hello world</h2>'
        const title = "Hello world"
        it(`getTextFromClassSelector'`, () => {
            const $ = text.parseHtml(htmlString)
            const ret = $('.title').text()
            assert.equal(ret, title)
        })
        after(async () =>{
        });
    })
    describe('#atob and btoa()', function () {
        const htmlString = '<h2 class="title">Hello world</h2>'
        it(`atob === btoa`, () => {
            const base64String = text.atob(htmlString)
            const originString = text.btoa(base64String)
            assert.equal(originString, htmlString)
        })
    })
})
