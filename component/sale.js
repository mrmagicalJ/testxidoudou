const { createSaleUrl } = require('../config/url')
const { baseHeader } = require('../config/user')
const { setCookie } = require('../utils')
const request = require("request")
const cheerio = require('cheerio')

const options = {
  method: "GET",
  headers: Object.assign({}, baseHeader)
}

function sale (cookie, id) {
  options.url = createSaleUrl(id)
  setCookie(options, cookie)

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error) {
        resolve('sale success!')
      } else {
        reject("sale fail！")
      }
    });
  });
}

module.exports = {
  sale
}