function setCookie(obj, cookie) {
  obj.headers.cookie = cookie
}

function delay(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

// function updateCookie(cur, next) {
//   cur.split('; ').map(i => {
//     i.split('=')
//   })
//   next.map(ck => ck.split(';')[0]).join('; ')
// }

module.exports = {
  setCookie,
  delay
}