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

const string2hex = str => {
    let result = ""
    for (let i=0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16).padStart(4,0)
    }
    return result
}
exports.string2hex = string2hex
  
const hex2string = hex => {
    const hexes = hex.match(/.{1,4}/g) || []
    let back = ""
    for(let j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16))
    }
    return back
}
exports.hex2string = hex2string