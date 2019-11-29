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
        const tryTotal = 3
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
        
        console.log(`总数量：${total}，已完成数量：${++complete}`)
        console.log(`${mobile} ${res}`)
      } catch (err) {
        console.log(`总数量：${total}，已完成数量：${++complete}`)
        console.error(`${mobile} ${err}`)
      }
    })
  } catch (err) {
    console.log(err)
  }
}

console.log('定时任务已启动，退出请按 ctrl+c')
schedule.scheduleJob('40 0 12 * * *', () => {
  // const users = await getUsers
  // console.log(users)
  // console.log('it start' + dayjs(Date.now()).format('YYYY:MM:DD HH:mm:ss'))
  init()
})

schedule.scheduleJob('20 1 12 * * *', () => { init() })

schedule.scheduleJob('0 2 12 * * *', () => { init() })

schedule.scheduleJob('34 2 12 * * *', () => { init() })

schedule.scheduleJob('0 3 12 * * *', () => { init(true) })

// init()
// init(true)