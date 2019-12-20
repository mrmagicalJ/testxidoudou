const { payUrl } = require('../config/url')
const { baseHeader } = require('../config/user')
const { setCookie } = require('../utils')
const request = require("request")
const cheerio = require('cheerio')

const options = {
  url: payUrl,
  method: "POST",
  headers: Object.assign({ Referer: 'https://www.xidoudousc.com/Home/Rush/pay.html' }, baseHeader)
}

/**
 * pay
 * @param {*} cookie cookie信息
 * @param { Object } data 参数
 * @returns promise(orderId, 错误信息)
 */
function pay (cookie, data) {
  setCookie(options, cookie)
  options.form = data

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error) {
        const $ = cheerio.load(body)
        const cookie = response.headers["set-cookie"]
        resolve({
          data: $('#order_id').val(),
          cookie
        })
      } else {
        reject(`pay失败: ${error}`)
      }
    });
  });
}

module.exports = {
  pay
}