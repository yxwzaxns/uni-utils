/**
 * @see <https://nodejs.org/api/child_process.html#child_process_options_detached>
 */
const restartProcess = () => {
    const subp = require('child_process').spawn(process.argv[0], process.argv.splice(1), {
        detached: true, // the child process will be made the leader of a new process group and session
        stdio: "ignore" //When using the detached option to start a long-running process,the process will not stay running in the background after the parent exits unless it is provided with a stdio configuration that is not connected to the parent. If the parent's stdio is inherited, the child will remain attached to the controlling terminal.
    })
    subp.unref() // By default, the parent will wait for the detached child to exit. To prevent the parent from waiting for a given subprocess to exit, use the subprocess.unref() method
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
