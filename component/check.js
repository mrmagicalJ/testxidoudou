const { checkUrl, baseUrl } = require('../config/url')
const request = require("request")
const { baseHeader } = require('../config/user')
const { setCookie } = require('../utils')
const cheerio = require('cheerio')
const dayjs = require('dayjs')

const options = {
  url: checkUrl,
  method: "GET",
  headers: Object.assign({}, baseHeader)
}

/**
 * 确认选择
 * @param {*} cookie cookie信息
 * @returns promise(pay的data, 错误信息)
 */
function check (cookie) {
  setCookie(options, cookie)
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error) {
        const $ = cheerio.load(body)
        const description = $('.ord-bot > .ord-item .ordi-t em').first().text().trim()
        const time = $('.ord-bot > .ord-item .ordi-d span').first().text().trim()
        const isErr = $('title').text().includes('502')
        
        const order = $('.ord-bot > .ord-item .ordi-b a').first().attr('href')
        // 时间存在，并且是当天
        if (time && time.split(' ')[0] === dayjs(Date.now()).format('YYYY-MM-DD')) {
            if (description === '挂卖中') {
              resolve(`success ${time}`)
            } else if (description === '待付款') {
              resolve(`payFail-${order.match(/[0-9]+/)[0]}`)
            } else {
              const url = $('.ord-bot > .ord-item .ordi-b .guamai').first().attr('href')
              options.url = baseUrl + url
              request(options)
              resolve('saleFail')
            }
        } else {
          if (isErr) {
            resolve('payFail')
          } else {
            console.log(body)
            resolve('orderFail')
          }
        }
      } else {
        reject("check fail！")
      }
    });
  });
}

module.exports = {
  check
}