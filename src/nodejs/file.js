const checkFile = async (path) => {
    let res = true
    try {
        require('fs').promises.stat(path)
    } catch (error) {   
        res = false
    }
    return res
}
exports.checkFile = checkFile

const readFile = async (p, o={}) => {
    return require('fs').promises.readFile(p, { encoding: 'utf-8', ...o })
}
exports.readFile = readFile

const saveFile = async (data, filePath) => {
    return require('fs').promises.writeFile(filePath, data)
}
exports.saveFile = saveFile

const getLastLine = async (p) => {
    const data = await readFile(p)
    const lines = data.split(require('os').EOL)
    return lines[lines.length - 1] || lines[lines.length - 2] || ''
}
exports.getLastLine = getLastLine

const readJson = async (p) => {
    return JSON.parse(await readFile(p))
}
exports.readJson = readJson

const rm = (p) => {
    return new Promise((resolve, reject) => {
        require('rimraf')(p, (e) => {
            if (e) {
                reject(e)
            } else {
                resolve()
            }
        })
    })
}
exports.rm = rm

const exportFile = async (data, filePath, type) => {
    let writeData
    switch (type) {
        case 'csv':
            writeData = require('json2csv').parse(JSON.parse(JSON.stringify(data)))
            break;
        default:
            writeData = JSON.stringify(data)
    }
    return saveFile(writeData, filePath)
}
exports.exportFile = exportFile

const copyFile = async (oldPath, newPath) => {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(oldPath)
        const writeStream = fs.createWriteStream(newPath)
        readStream.on('error', reject)
        writeStream.on('error', reject)
        readStream.on('close', resolve)
        readStream.pipe(writeStream)
    })
}
exports.copyFile = copyFile

const moveFile = (oldPath, newPath) => {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                if (err.code === 'EXDEV') {
                    copyFile(oldPath, newPath).then(e => {
                        fs.unlink(oldPath, () => {
                            resolve()
                        })
                    }).catch(e => {
                        throw new Error(e.message)
                    })
                } else {
                    throw new Error(err.message)
                }
            }
            resolve()
        })
    })
}
exports.moveFile = moveFile

const saveJson = async (data, file) => {
    return saveFile(JSON.stringify(data, null, 4), file)
}
exports.saveJson = saveJson