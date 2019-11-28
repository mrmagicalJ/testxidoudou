const { confirmPayUrl } = require('../config/url')
const { baseHeader } = require('../config/user')
const { setCookie } = require('../utils')
const { secondPsw } = require('../config/user')
const request = require("request")

const options = {
  url: confirmPayUrl,
  method: "POST",
  headers: Object.assign({}, baseHeader)
}
/**
 * 确认提交
 * @param {*} cookie cookie
 * @param {String|Number} order_id orderId
 * @returns promise(成功信息, 错误信息)
 */
function confirmPay (cookie, order_id) {
  setCookie(options, cookie)
  options.form = {
    paypwd: secondPsw,
    order_id
  }

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error) {
        console.log(body)
        resolve('secondPay success')
      } else {
        reject('secondPay fail')
      }
    })
  })
}

module.exports = {
  confirmPay
}