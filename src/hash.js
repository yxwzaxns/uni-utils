const getHash = (t, type='sha1')=>{
    return require('crypto').createHash(type).update(t).digest('hex')
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
