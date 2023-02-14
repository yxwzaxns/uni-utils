const assert = require('assert').strict

const time = require('../src/time')

describe('#time function', function () {
    describe('#getTime()', function () {
        it(`getTime(now,'{y}-{m}-{d} {h}:{i}')`, async () => {
            const now = new Date()
            const ret = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
            assert.equal(time.getTime(now,'{y}-{m}-{d} {h}:{i}'),ret)
        })
    })
})