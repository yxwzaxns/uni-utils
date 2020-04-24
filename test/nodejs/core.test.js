const assert = require('assert').strict
const core = require('../../src/nodejs/core')

describe('#coreTest', function () {
    describe('#loopTask()', function () {
        it('loopTask([1,2,3]) return [2, 3, 4]', async () => {
            const ret = await core.loopTask([1, 2, 3], (e) => {
                return e + 1
            })
            assert.deepEqual(ret, [2, 3, 4])
        })
        it('loopTask([1,2,3]) return [2, 3, 4] immediately', async () => {
            const ret = await core.loopTask([1, 2, 3], (e) => {
                return e + 1
            }, { timeGap: 0, execLength: 2 })
            assert.deepEqual(ret, [2, 3, 4])
        })
    })
    describe('#range()', function () {
        const p = [0,4]
        const res = [0, 1, 2, 3, 4]
        it(`range(0,4) return ${res}`, async () => {
            const ret = await core.range(...p)
            assert.deepEqual(ret, res)
        })
    })
    describe('#removeDuplicate()', function () {
        let p = [0,1,2,2,3,4,4]
        let res = [0, 1, 2, 3, 4]
        it(`removeDuplicate(${p}) return ${res}`, async () => {
            const ret = await core.removeDuplicate(p)
            assert.deepEqual(ret, res)
        })
        p = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 1, name: 'a' }]
        res = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }]
        it(`removeDuplicate(${JSON.stringify(p)}) return ${JSON.stringify(res)}`, async () => {
            const ret = await core.removeDuplicate(p)
            assert.deepEqual(ret, res)
        })
    })
})

