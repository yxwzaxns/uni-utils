const restartProcess = () => {
    const subp = require('child_process').spawn(process.argv[0], process.argv.splice(1), {
        detached: true,
        stdio: ['ignore', 'inherit', 'inherit']
    })
    subp.unref()
    process.exit()
}
exports.restartProcess = restartProcess