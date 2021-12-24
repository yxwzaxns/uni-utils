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
})
