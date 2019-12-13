const colors = require('colors')

function log (...msg) {
    console.log(...msg)
}

function warn () {
    console.log(...msg.map(i => typeof i === 'string' ? i.yellow : i))
}

function errlog (...msg) {
    console.log(...msg.map(i => typeof i === 'string' ? i.red : i))
}

module.exports = {
    log,
    warn,
    errlog
}