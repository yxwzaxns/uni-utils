const parseHtml = (data) => {
    return require('cheerio').load(data)
}
exports.parseHtml = parseHtml
