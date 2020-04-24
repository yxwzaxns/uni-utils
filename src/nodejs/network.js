const {log} = require('./core')
const file = require('./file')
const download = async (url, option={}) => {
    const path = option.savePath || ''
    const ret = option.ret || true
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
        resp = await require('node-fetch')(url, options)
    } catch (e) {
        log('文件下载失败:',e.message)
        throw new Error(e.message)
    }
    
    if (path) {
        const pipeline = util.promisify(stream.pipeline)
        const saveFile = require('fs').createWriteStream(path)
        await pipeline(resp.body, saveFile)
    }
    if(ret){
        return (await resp.text()).trim()
    }
    return true
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
    options = { timeGap: 1000, ...options }
    const errors = []
    const cliProgress = require('cli-progress')
    const infoBar = new cliProgress.SingleBar({
        fps: 100
    }, cliProgress.Presets.shades_classic);
    infoBar.start(taskList.length, 1)
    for (let i in taskList) {
        let task = taskList[i]
        if (!await file.checkFile(task.savePath)) {
            try {
                await download(task.downUrl, task.savePath)
            } catch (e) {
                log('文件下载失败:',e.message,task.downUrl)
                if (typeof task == 'object') {
                    task.error = e.message
                } else {
                    task = task.toString() + ':' + e.message
                }
                errors.push(task)
                continue
            }
            log(`下载完成:${i}/${taskList.length}`, task.downUrl)
            await sleep(options.timeGap)
        } else {
            // console.log(task.savePath, '文件存在不需要下载');
        }
        infoBar.increment()
        // infoBar.update()
    }
    infoBar.stop()
    return errors
}
exports.listDownload = listDownload