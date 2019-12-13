const request = require("request")
const { loginUrl } = require('../config/url')
const { baseHeader } = require('../config/user')
const cheerio = require('cheerio')

const getCookieOptions = {
  url: loginUrl,
  method: "POST",
  headers: Object.assign({}, baseHeader)
};

/**
 * 设置传输数据
 * @param {option} obj 需要配置数据的配置
 * @param {obj} data form数据
 */
function setForm(obj, data) {
  obj.form = data;
}

function loginRequest(options, resolve, reject, tryTime, tryTotal) {
  request(getCookieOptions, (error, response, body) => {
    if (!error) {
      const $ = cheerio.load(body)
      const isLogin = $('.gradient-text').first().text().trim() === '登陆成功'
      let cookie
      if (isLogin) {
        cookie = response.headers["set-cookie"]
        resolve(cookie)
      } else {
        if (tryTime < tryTotal) {
          loginRequest(options, resolve, reject, tryTime + 1, tryTotal)
        } else {
          reject(`登陆失败：尝试${tryTotal}次`)
        }
      }
    } else {
      reject(`登陆失败：${error}`)
    }
  })
}

/**
 * 登陆
 * @param {*} data 登录数据
 * @returns promise(cookie信息, 错误信息)
 */
function login(data) {
  setForm(getCookieOptions, data);
  return new Promise((resolve, reject) => {
    // request(getCookieOptions, (error, response, body) => {
    //   if (!error) {
    //     const cookie = response.headers["set-cookie"].map(ck => ck.split(';')[0]).join('; ')
    //     resolve(cookie)
    //   } else {
    //     reject("登录失败！")
    //   }
    // });
    loginRequest(getCookieOptions, resolve, reject, 1, 10)
  });
}

module.exports = {
  login
}
