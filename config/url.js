const baseUrl = 'https://www.xidoudousc.com'

const loginUrl = baseUrl + '/Home/Login/login_do.html'

// const confirmChooseUrl = baseUrl + '/Home/Rush/rushconfirm/goods_id/3144.html'

const confirmChooseUrl = baseUrl + '/Home/Rush/rushconfirm/goods_id/3461.html'

// const confirmChooseUrl = baseUrl + '/Home/Rush/rushconfirm/goods_id/3112.html'

// const confirmChooseUrl = baseUrl + '/Home/Rush/rushconfirm/goods_id/3556.html'

const payUrl = baseUrl + '/Home/Rush/pay.html'

const paysubUrl = baseUrl + '/Home/Rush/paysub.html'

const confirmPayUrl = baseUrl + '/Home/Rush/pay_ajax.html'

const createSaleUrl = id => baseUrl + `/Home/Order/salesorget/order_id/${id}/way/sale.html`

const checkUrl = baseUrl + '/Home/Order/rush.html'

module.exports = {
  baseUrl,
  loginUrl,
  confirmChooseUrl,
  payUrl,
  confirmPayUrl,
  createSaleUrl,
  checkUrl,
  paysubUrl
}