const fs = require('fs')

const checkFile = async (path) => {
    let res = true
    try {
        await require('fs').promises.stat(path)
    } catch (error) {
        res = false
    }
    return res
}
exports.checkFile = checkFile
exports.fileExist = checkFile

const checkFileSync = path => {
    let res = true
    try {
        require('fs').statSync(path)
    } catch (error) {
        res = false
    }
    return res
}
exports.checkFileSync = checkFileSync

const readFile = async (filePath, options={}) => {
    return require('fs').promises.readFile(filePath, { encoding: 'utf-8', ...options })
}
exports.readFile = readFile

const readFileSync = (filePath, options={}) => {
    return require('fs').readFileSync(filePath, { encoding: 'utf-8', ...options })
}
exports.readFileSync = readFileSync

const saveFile = async (data, filePath) => {
    await require('fs').promises.writeFile(filePath, data)
    return true
}
exports.saveFile = saveFile

const saveFileSync = (data, filePath) => {
    return require('fs').writeFile(filePath, data, (err)=>{
        if (err) throw err
    })
}
exports.saveFileSync = saveFileSync

const getLastLine = async (p) => {
    const data = await readFile(p)
    const lines = data.split(require('os').EOL)
    return lines[lines.length - 1].trim() || lines[lines.length - 2].trim() || ''
}
exports.getLastLine = getLastLine

const readJson = async (p) => {
    return JSON.parse(await readFile(p))
}
exports.readJson = readJson

const readJsonSync = p => {
    return JSON.parse(readFileSync(p))
}
exports.readJsonSync = readJsonSync

exports.readCsv = async (dp,options={headers: false}) => {
    const data = []
    return new Promise((resolve,reject)=>{
        fs.createReadStream(dp)
        .pipe(require('fast-csv').parse(options))
        .on('error', error => reject(error))
        .on('data', row => data.push(row))
        .on('end', rowCount => {
            resolve(data)
        })
    })
}

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

// export const saveJson = async (data, file) => {
//     return saveFile(JSON.stringify(data, null, 4), file)
// }
