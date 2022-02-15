const parseHtml = (data) => {
    return require('cheerio').load(data)
}
exports.parseHtml = parseHtml

const atob = string => Buffer.from(string).toString('base64')
exports.atob = atob

const btoa = string => Buffer.from(string,'base64').toString()
exports.btoa = btoa

const atoh = string => Buffer.from(string).toString('hex')
exports.atoh = atoh

const htoa = string => Buffer.from(string,'hex').toString()
exports.htoa = htoa
