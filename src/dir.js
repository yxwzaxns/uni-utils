const createDir = async (dirs) => {
    if (!Array.isArray(dirs)) {
        dirs = [dirs]
    }
    for (let dir of dirs) {
        dir.split(require("path").sep).reduce((parentDir, childDir) => {
            const curDir = require("path").resolve(parentDir, childDir);
            try {
                require('fs').mkdirSync(curDir);
            } catch (err) {
                if (err.code === 'EEXIST') { // curDir already exists!
                    return curDir;
                }

                // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
                if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
                    throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
                }

                const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
                if (!caughtErr || caughtErr && curDir === require("path").resolve(dir)) {
                    throw err; // Throw if it's just the last created dir.
                }
            }
            return curDir;
        }, '/')
    }
}
exports.createDir = createDir

const readDir = async (p) => {
    return require('fs').promises.readdir(p)
}
exports.readDir = readDir

const copyDir = async (s, d) => {
    return new Promise((resolve,reject)=>{
        require('child_process').execFile('cp',["-R", s, d], (error, stdout, stderr) => {
          if (error) {
            reject(error)
          }
          resolve(stdout)
        })
    })
}
exports.copyDir = copyDir
