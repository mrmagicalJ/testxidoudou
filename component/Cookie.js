class Cookie {
    constructor () {
        this.cookie = {}
    }

    setCookie (cookie) {
        cookie.map(ck => {
            const [key, value] = ck.split(';')[0].split('=')
            this.cookie[key] = value
        })
    }

    getCookie () {
        return Object.entries(this.cookie).map(([key, value]) => `${key}=${value}`).join('; ')
    }
}

module.exports = {
    Cookie
}