const assert = require('assert')
const core = require('../../src/nodejs/core')

describe('#loopTask()', function () {
    it('loopTask([1,2,3] return', async () => {
        const ret = await core.loopTask([1,2,3],(e)=>{
            return e+1
        })
        assert.deepEqual(ret, [2, 3, 4])
    })
})