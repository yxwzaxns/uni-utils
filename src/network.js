const core = require('./core')
const {log} = require('./core')
const file = require('./file')
const download = async (url, option={}) => {
    const path = option.savePath || ''
    const options = {
        timeout: 30000
    }
    if (process.env.http_proxy) {
        options.agent = new require('https-proxy-agent')(process.env.http_proxy)
    }
    if(option.hasOwnProperty('proxy')){
        options.agent = new require('https-proxy-agent')(option.proxy)
    }

    const resp = await require('node-fetch')(new URL(url), options)

    if (path) {
        const pipeline = require('util').promisify(require('stream').pipeline)
        const saveFile = require('fs').createWriteStream(path)
        return pipeline(resp.body, saveFile)
    }else{
        return resp.text()
    }
}
exports.download = download
/*
    taskList array<object{
        downUrl
        savePath
    }>
    options object{
        timeGap: 1000 下载间隔
    }
*/
const listDownload = async (taskList, options) => {
    options = { timeGap: 1000,skipExist:true, ...options }
    return core.loopTask(taskList, async (task)=>{
        if (options.skipExist && await file.checkFile(task.savePath)) return

        try {
            await download(task.downUrl, { savePath: task.savePath})
        } catch (e) {
            log('文件下载失败:', e.message, task.downUrl)
            task.error = e.message
            return task
        }
        if(task.i){
            log(`下载完成:${task.i}/${taskList.length}`, task.downUrl)
        }
    }, options)
}
exports.listDownload = listDownload
