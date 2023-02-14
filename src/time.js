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
    return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2,'0') + '-' + date.getDate().toString().padStart(2,'0')
}
exports.getTodayDate = getTodayDate

const getTime = (time,cFormat) => {
  if (!time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
exports.getTime = getTime

const countdown = async (n, cb=console.log) => {
    for (let i = n; i > 0 ; i--) {
        await sleep(1000)
        cb(i)
    }
}

exports.countdown = countdown
