const assert = require('assert').strict
const path = require('path')

const process = require('../src/process')

describe('#ProcessTest', function () {
    describe('#createProcess()', function () {
        let pid = 0
        it(`create daemon process`, async () => {
            const testFile = path.join(__dirname,'node-script.js')
                const p = await process.createProcess(testFile,[])
                pid = p.pid
                assert.ok(pid)
        })
        after(() =>{
            if(pid>0){
                setTimeout(()=>{
                    require('process').kill(pid)
                },5000)
            }
        });
    })
})
