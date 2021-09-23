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

const arrayRemove = (arr,...args) =>  {
    let what, a = args, L = a.length, ax
    while (L >= 1 && arr.length) {
        what = a[--L]
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr
}
exports.arrayRemove = arrayRemove

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
        const taskMap = subData.map(e => func(e))
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

const randomStr = (len,type=1) => {
    let result = ''
    const commonCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const UpCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const Numbers = '0123456789'
    let characters = commonCharacters
    if(type==2){
      characters = UpCharacters
    }else if(type==3){
      characters = Numbers
    }
    const charactersLength = characters.length
    for (let i = 0; i < len; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}
exports.randomStr = randomStr

const randomNum = (len = 1) => {
    return len === 1 ? Math.floor(Math.random()*10) : Math.floor(Math.random() * 9*(10**(len-1)) + 10 ** (len-1))
}
exports.randomNum = randomNum
