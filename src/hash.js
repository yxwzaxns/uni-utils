const getHash = (s, type='sha1')=>{
    return require('crypto').createHash(type).update(s).digest('hex')
}
exports.getStringHash = getHash

const getFileHash = async (filename,type='sha256') => {
  const crypto = require('crypto')
  const fs = require('fs')
  const sum = crypto.createHash(type)
  return new Promise((resolve,reject)=>{
      const fileStream = fs.createReadStream(filename)
      fileStream.on('error', function (err) {
        reject(err)
      });
      fileStream.on('data', function (chunk) {
        try {
          sum.update(chunk)
        } catch (ex) {
          reject(ex)
        }
      })
      fileStream.on('end', function () {
        resolve(sum.digest('hex'))
      })
  })
}
exports.getFileHash = getFileHash

const getFileMd5 = filePath => getFileHash(filePath,'md5')
exports.getFileMd5 = getFileMd5

const getFileSha256 = filePath => getFileHash(filePath,'sha256')
exports.getFileSha256 = getFileSha256

const sha1 = s => getHash(s,'sha1')
exports.sha1 = sha1

const sha256 = s => getHash(s,'sha256')
exports.sha256 = sha256

const sha512 = s => getHash(s,'sha512')
exports.sha512 = sha512

const md5 = s => getHash(s,'md5')
exports.md5 = md5
