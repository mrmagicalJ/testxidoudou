// const { transformRequest } = require('../utils')

// 密码
const psw = 111111
// 二级密码
const secondPsw = 111111

const baseHeader = {
  "cache-control": "no-cache",
  "Content-Type": "application/x-www-form-urlencoded"
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
