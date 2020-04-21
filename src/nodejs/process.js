const restartProcess = () => {
    const subp = require('child_process').spawn('node', [process.argv[1]], {
        detached: true,
        stdio: ['ignore', 'inherit', 'inherit']
    })
    subp.unref()
    process.exit()
}
exports.restartProcess = restartProcess