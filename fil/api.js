const axios = require('axios');
const md5 = require('crypto-js/md5');
const qs = require('qs')

const baseParams = {
    plat: 'web',
    version: '1.0.0'
}
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36'
}

/**
 * 登录
 * @param {Object} data
 * @param {String} data.account 账号
 * @param {String} data.loginPwd 密码
 */
 const fetchLogin = data => axios({
    url: 'http://fil.zooofx.com/app/customer/open/login',
    method: 'post',
    headers,
    data: qs.stringify(data)
})

const fetchDailyTask = params => axios({
    url: 'http://fil.zooofx.com/app/signTask/dailyTask',
    method: 'get',
    headers,
    params: {
        ...params,
        ...baseParams
    }
})

const fetchTaskTopic = params => axios({
    url: 'http://fil.zooofx.com/app/signTask/taskTopic',
    method: 'get',
    headers,
    params: {
        ...params,
        ...baseParams
    }
})

/**
 * 答题
 * @param {Object} data
 */
 const fetchSubmitAnswer = data => axios({
    url: 'http://fil.zooofx.com/app/signTask/submitAnswer',
    method: 'post',
    headers,
    data: qs.stringify({ ...data, ...baseParams })
})

module.exports = {
    fetchLogin,
    fetchDailyTask,
    fetchTaskTopic,
    fetchSubmitAnswer
}