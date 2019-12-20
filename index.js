const { login } = require('./component/login')
const { confirmChoose } = require('./component/confirmChoose')
const { pay } = require('./component/pay')
const { confirmPay } = require('./component/confirmPay')
const { sale } = require('./component/sale')
const { check } = require('./component/check')

const { Cookie }  = require('./component/Cookie')

const { psw } = require('./config/user')
const { getUsers } = require('./component/getUsers')
const { delay } = require('./utils/index')
const schedule = require('node-schedule')
const { log, warn, errlog } = require('./utils/console')

async function repeatCheck ({ cookie, orderId, tryTime, tryTotal }) {
  const res = await check(cookie)
  // if sale failed
  if (res === 'saleFail' && tryTime !== tryTotal) {
    await sale(cookie, orderId)
    await delay(1500)
    return repeatCheck({ cookie, orderId, tryTime: tryTime + 1, tryTotal })
  }
  // if pay failed
  if (res.includes('payFail') && tryTime !== tryTotal) {
    orderId = res.split('-')[1]
    await confirmPay(cookie, orderId)
    await delay(1500)
    await sale(cookie, orderId)
    await delay(1500)
    return repeatCheck({ cookie, orderId, tryTime: tryTime + 1, tryTotal })
  }

  // success or no attempts
  return `尝试 ${tryTotal} 次：${res}`
}

async function init (isCHeck) {
  try {
    const users = await getUsers
    const total = users.length
    let complete = 0

    users.forEach(async mobile => {
      try {
        let tryTime = 1
        const tryTotal = 10
        const loginData = {
          mobile,
          password: psw
        }
        let payData, orderId, res, cookie, temp

        const ck = new Cookie()
        cookie = await login(loginData)
        ck.setCookie(cookie)
        await delay(2000);

        if (!isCHeck) {
          temp = await confirmChoose(ck.getCookie())
          payData = temp.data
          temp.cookie && ck.setCookie(temp.cookie)

          await delay(1500);

          temp = await pay(ck.getCookie(), payData)
          orderId = temp.data
          temp.cookie && ck.setCookie(temp.cookie)

          await delay(5000)
          // await confirmPay(ck.getCookie(), orderId)
          // await delay(1000)
          // await sale(ck.getCookie(), orderId)
          // await delay(1000)
          res = await repeatCheck({ cookie: ck.getCookie(), orderId, tryTime, tryTotal })
        } else {
          res = await check(ck.getCookie())
        }
        
        log(`总数量：${total}，已完成数量：${++complete}`)
        if (res === 'saleFail') {
          warn(`${mobile} ${res}`)
        } else if (res.includes('payFail') || res.includes('orderFail')) {
          errlog(`${mobile} ${res}`)
        } else {
          log(`${mobile} ${res}`)
        }
      } catch (err) {
        log(`总数量：${total}，已完成数量：${++complete}`)
        errlog(`${mobile} - ${err}`)
      }
    })
  } catch (err) {
    log(err)
  }
}



log('定时任务已启动，退出请按 ctrl+c')
schedule.scheduleJob('40 0 12 * * *', () => { init() })

schedule.scheduleJob('20 1 12 * * *', () => { init() })

schedule.scheduleJob('0 2 12 * * *', () => { init() })

schedule.scheduleJob('50 2 12 * * *', () => { init(true) })

schedule.scheduleJob('0 3 12 * * *', () => { init() })

schedule.scheduleJob('0 4 12 * * *', () => { init() })

schedule.scheduleJob('20 5 12 * * *', () => { init(true) })





schedule.scheduleJob('40 0 17 * * *', () => { init() })

schedule.scheduleJob('40 1 17 * * *', () => { init() })
// schedule.scheduleJob('10 40 20 * * *', () => { init(true) })

// init()
init(true)