const { confirmChooseUrl } = require('../config/url')
const request = require("request")
const { baseHeader } = require('../config/user')
const { setCookie } = require('../utils')
const cheerio = require('cheerio')

const options = {
  url: confirmChooseUrl,
  method: "GET",
  headers: Object.assign({}, baseHeader)
}

/**
 * 确认选择
 * @param {*} cookie cookie信息
 * @returns promise(pay的data, 错误信息)
 */
function confirmChoose (cookie) {
  setCookie(options, cookie)
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error) {
        const $ = cheerio.load(body)
        const addressid = $('#addressid').val()
        const buy_num = $('#buy_num').val()
        const goodsid = $('#goodsid').val()
        if (!addressid) {
          const info = $('.gradient-text').first().text().trim()
          if (info.includes('请重新登陆')) {
            reject({
              msg: 'reLogin',
              name: 'confirmChoose'
            })
          } else if (info.includes('每天只能抢购一次')) {
            reject('success')
          } else {
            reject(`没有地址: ${body}`)
          }
        } else {
          resolve({
            addressid,
            buy_num,
            goodsid
          })
        }
      } else {
        reject(`确认选择失败: ${error}`)
      }
    });
  });
}

module.exports = {
  confirmChoose
}