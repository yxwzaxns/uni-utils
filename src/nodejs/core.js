const {sleep} = require('./time')
const log = (...i) => {
    console.log(new Date().toLocaleString(),'|',JSON.stringify(i, null, 2))
}
exports.log = log

const removeDuplicate = (arr, key = 'id') => {
    if(JSON.stringify(arr[0])[0]==='{'){
        return arr.filter((item, index, self) => self.findIndex(t => t[key] === item[key]) === index)
    }else{
        return [...new Set(arr)]
    }
}
exports.removeDuplicate = removeDuplicate

const range = (a, b) => {
    const g = function* () {
        while (a <= b) {
            yield a++
        }
    }
    return [...g()]
}
exports.range = range

const loopTask = async (data, func, options) => {
    options = { execLength: 10, timeGap: 1000, ...options }
    const results = []
    const cliProgress = require('cli-progress')
    const infoBar = new cliProgress.SingleBar({
        fps: 100
    }, cliProgress.Presets.shades_classic);
    infoBar.start(data.length, 1)
    for (let i = 0; i < data.length; i += +options.execLength) {
        const subData = data.slice(i, i + +options.execLength)
        const taskMap = subData.map(e => {
            return (async () => {
                return func(e)
            })()
        })
        for (const j in taskMap) {
            const res = await taskMap[j]
            infoBar.update(i + +j + 1)
            results.push(res)
        }
        await sleep(options.timeGap)
        
    }
    infoBar.stop()
    return results
}
exports.loopTask = loopTask