const { paysubUrl } = require('../config/url')
const { baseHeader } = require('../config/user')
const { setCookie } = require('../utils')
const { secondPsw } = require('../config/user')
const request = require("request")

const options = {
  url: paysubUrl,
  method: "POST",
  headers: Object.assign({}, baseHeader)
}
/**
 * 确认提交
 * @param {*} cookie cookie
 * @param {String|Number} order_id orderId
 * @returns promise(成功信息, 错误信息)
 */
function paysub (cookie, order_id) {
  setCookie(options, cookie)
  options.form = {
    paypwd: secondPsw,
    order_id
  }

  request(options, (error, response, body) => {})
}

module.exports = {
  paysub
}