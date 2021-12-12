const limitRequest = (asyncList, limitNum) => {
    const list = [ ...asyncList ];

    const next = () => {
        if (!list.length) return;
        list.shift()().then(next);
    }

    for (let i = 0; i < limitNum; i++) {
        next();
    }
}

module.exports = { limitRequest }