const { login } = require('./component/login')
const { confirmChoose } = require('./component/confirmChoose')
const { pay } = require('./component/pay')
const { confirmPay } = require('./component/confirmPay')
const { sale } = require('./component/sale')
const { check } = require('./component/check')

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
    await delay(1000)
    return repeatCheck(cookie, tryTime + 1, tryTotal)
  }
  // if pay failed
  if (res === 'payFail' && tryTime !== tryTotal) {
    await confirmPay(cookie, orderId)
    await delay(1000)
    await sale(cookie, orderId)
    await delay(1000)
    return repeatCheck(cookie, tryTime + 1, tryTotal)
  }

  // success or no attempts
  return res
}

async function init (isCHeck) {
  try {
    const users = await getUsers
    const total = users.length
    let complete = 0

    users.forEach(async mobile => {
      try {
        let tryTime = 1
        const tryTotal = 6
        const loginData = {
          mobile,
          password: psw
        }
        let payData, orderId, res

        const cookie = await login(loginData)

        if (!isCHeck) {
          payData = await confirmChoose(cookie)
          await delay(1000)
          orderId = await pay(cookie, payData)
          await delay(1000)
          await confirmPay(cookie, orderId)
          await delay(1000)
          await sale(cookie, orderId)
          await delay(1000)
          res = await repeatCheck({ cookie, orderId, tryTime, tryTotal })
        } else {
          res = await check(cookie)
        }
        
        log(`总数量：${total}，已完成数量：${++complete}`)
        if (res === 'saleFail') {
          warn(`${mobile} ${res}`)
        } else if (['payFail', 'orderFail'].includes(res)) {
          errlog(`${mobile} ${res}`)
        } else {
          log(`${mobile} ${res}`)
        }
      } catch (err) {
        log(`总数量：${total}，已完成数量：${++complete}`)
        errlog(`${mobile} ${err}`)
      }
    })
  } catch (err) {
    log(err)
  }
}

// async function pipeline (loginData, orderId, info = 'confirmPay') {
//   let payData, orderId, res
//   const cookie = await login(loginData)
//   await delay(1000)

//   if (orderId && info === 'confirmPay') {
//     return step(confirmPay, cookie, orderId)
//   } else if (orderId && info === 'sale') {
//     return step(sale, cookie, orderId)
//   } else {
//     return step(confirmChoose, cookie)
//     payData = await confirmChoose(cookie)
//     await delay(1000)
//     orderId = await pay(cookie, payData)
//     await delay(1000)
//     await confirmPay(cookie, orderId)
//     await delay(1000)
//     await sale(cookie, orderId)
//   }
// }

// async function step (fn, data, failData) {
//   const res = await fn(...data)
//   if (res === 'reLogin') {
//     return pipeline(failData)
//   }
// }



log('定时任务已启动，退出请按 ctrl+c')
schedule.scheduleJob('40 0 12 * * *', () => { init() })

schedule.scheduleJob('20 1 12 * * *', () => { init() })

schedule.scheduleJob('0 2 12 * * *', () => { init() })

schedule.scheduleJob('34 2 12 * * *', () => { init() })

schedule.scheduleJob('0 3 12 * * *', () => { init(true) })





schedule.scheduleJob('40 0 16 * * *', () => { init() })

schedule.scheduleJob('20 1 16 * * *', () => { init() })

schedule.scheduleJob('0 2 16 * * *', () => { init() })

schedule.scheduleJob('34 2 16 * * *', () => { init() })

schedule.scheduleJob('0 3 16 * * *', () => { init(true) })

// init()
init(true)