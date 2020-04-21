const sleep = (t) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, t)
    })
}
exports.sleep = sleep

const getTimeStamp = () => {
     return Math.floor(new Date().getTime() / 1000)
}
exports.getTimeStamp = getTimeStamp

const getTodayDate = () => {
    const date = new Date()
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
exports.getTodayDate = getTodayDate