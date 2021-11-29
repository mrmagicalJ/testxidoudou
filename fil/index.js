const md5 = require('crypto-js/md5');
const { fetchLogin, fetchDailyTask, fetchTaskTopic, fetchSubmitAnswer } = require('./api')

const dealRes = async (fn) => {
    const { data: { code, result, msg } } = await fn;
    if (code !== 200) throw new Error(msg);
    return result
}

const login = async ({ account, loginPwd }) => {
    try {
        const { data: { code, result, msg } } = await fetchLogin({
            account,
            loginPwd: md5(loginPwd).toString(),
            prefix: 86,
            token: ''
        });
        if (code !== 200) throw new Error(msg);
        return result.token
    } catch (err) {
        console.error(err);
    }
}

const dailyTask = async () => {
    try {
        const { data: { code, result, msg } } = await fetchDailyTask({
            token: '09fa6ff1894f4a7181586a90ab8acc04'
        });
        if (code !== 200) throw new Error(msg);
    } catch (err) {
        console.error(err);
    }
}


const init = async () => {
    const account = 13700015132;
    const loginPwd = 'ypw153153';
    try {
        const token = await login({ account, loginPwd });
        for (let index = 0; index < 13; index++) {
            const { correctOption, topicId, topicType } = await dealRes(fetchTaskTopic({ token }))
            await dealRes(fetchSubmitAnswer({ topicId, topicType, submitOption: correctOption, token }))
        }
        console.log(`${account} 完成`);
    } catch (error) {
        console.error(error);
    }
}

init();