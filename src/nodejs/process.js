const restartProcess = () => {
    const subp = require('child_process').spawn(process.argv[0], process.argv.splice(1), {
        detached: true,
        stdio: ['ignore', 'ignore', 'ignore']
    })
    subp.unref()
    process.exit()
}
exports.restartProcess = restartProcess

const createProcess = (file, args) => {
    const w = require('child_process').fork(file, args, {
        detached: true,
        stdio: ["ignore", "ignore", "ignore", 'ipc']
    })
    w.unref()
    w.channel.unref()
    return w
}
exports.createProcess = createProcess