// const { transformRequest } = require('../utils')

// 密码
const psw = 111111
// 二级密码
const secondPsw = 111111

const baseHeader = {
  "cache-control": "no-cache",
  "Content-Type": "application/x-www-form-urlencoded",
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
}

const baseOption = {
  method: "POST",
  headers: baseHeader,
//   transformRequest
}

module.exports = {
  psw,
  secondPsw,
  baseHeader,
  baseOption
};
