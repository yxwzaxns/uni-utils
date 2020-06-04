const core = require('./core')
const {log} = require('./core')
const file = require('./file')
const download = async (url, option={}) => {
    const path = option.savePath || ''
    const options = {
        timeout: 30000,
        ...(option.http_options || {})
    }
    
    if (process.env.http_proxy) {
        options.agent = new require('https-proxy-agent')(process.env.http_proxy)
    } else {
        const proxy = "http://127.0.0.1:1087"
        options.agent = new require('https-proxy-agent')(proxy)
    }
    let resp
    
    try {
        resp = await require('node-fetch')(new URL(url), options)
    } catch (e) {
        log('文件下载失败:',e.message)
        throw new Error(e.message)
    }
    
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
    const ret = await core.loopTask(taskList, async (task)=>{
        if (await file.checkFile(task.savePath) && options.skipExist) {
            return
        } else {
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
        }
    }, options)
    return ret
}
exports.listDownload = listDownload