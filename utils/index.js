function setCookie(obj, cookie) {
  obj.headers.cookie = cookie
}

function delay(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

module.exports = {
  setCookie,
  delay
}