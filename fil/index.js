const md5 = require('crypto-js/md5');
const ProgressBar = require('progress');
const { fetchLogin, fetchWeekList, fetchDailyTask, fetchTaskTopic, fetchSubmitAnswer, fetchZeroLu } = require('./api');

const accounts = [
	{ account: '13700015132', loginPwd: 'ypw153153' },
	{ account: 'a0019912336161@163.com', loginPwd: 'ypw153153' },
	{ account: 'a1519912336161@163.com', loginPwd: 'ypw153153' },
]

const dealRes = async (fn) => {
	const {
		data: { code, result, msg },
	} = await fn;
	if (code !== 200) throw new Error(msg);
	return result;
};

const login = async ({ account, loginPwd }) => {
	try {
		const {
			data: { code, result, msg },
		} = await fetchLogin({
			account,
			loginPwd: md5(loginPwd).toString(),
			prefix: 86,
			token: '',
		});
		if (code !== 200) throw new Error(msg);
		return result.token;
	} catch (err) {
		console.error(err);
	}
};

const task = async (account, loginPwd) => {
	const total = 12;
	try {
		const token = await login({ account, loginPwd });
		await dealRes(fetchZeroLu({ token }));
		await dealRes(fetchWeekList({ token }));
		await dealRes(fetchDailyTask({ token }));
		const bar = new ProgressBar(`  ${account} [:bar] :percent`, {
			complete: '=',
			incomplete: ' ',
			width: 20,
			total,
		});
		for (let index = 0; index < total; index++) {
			const { correctOption, topicId, topicType } = await dealRes(fetchTaskTopic({ token }));
			await dealRes(fetchSubmitAnswer({ topicId, topicType, submitOption: correctOption, token }));
			bar.tick(1);
		}
	} catch (error) {
		console.error(error);
	}
	return;
}

const init = async () => {
	for (const { account, loginPwd } of accounts) {
		await task(account, loginPwd)
	}
};

init();

// (async () => {
//     const delay = () => new Promise((resolve, reject) => { setTimeout(resolve, 1000) })
//     const account = 123123;
//     const total = 13;
//     const bar = new ProgressBar(`  ${account} [:bar] :percent`, {
//         complete: '=',
//         incomplete: ' ',
//         width: 20,
//         total,
//       });
//     for (let index = 0; index < total; index++) {
//         await delay();
//         bar.tick(1);
//     }
// })()