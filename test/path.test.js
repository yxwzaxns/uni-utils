const assert = require('assert').strict
const os = require('os')

const path = require('../src/path')

describe('#pathTest', function () {
    describe('#homedir()', function () {
        const MAC_HOME = process.env.HOME
        it(`home check'`, async () => {
            if(os.type() === 'Darwin'){
                const ret = await path.homedir()
                assert.equal(ret, MAC_HOME)
            }
        })
        after(async () =>{
        });
    })
})
