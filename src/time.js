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

const countdown = async (n, cb=console.log) => {
    for (let i = n; i > 0 ; i--) {
        await sleep(1000)
        cb(i)
    }
}

exports.countdown = countdown
