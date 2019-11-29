const baseUrl = 'http://xdd.syzykm.cn/Home/'

const loginUrl = baseUrl + 'Login/login_do.html'

const confirmChooseUrl = baseUrl + 'Rush/rushconfirm/goods_id/3144.html'

const payUrl = baseUrl + 'Rush/pay.html'

const confirmPayUrl = baseUrl + 'Rush/pay_ajax.html'

const createSaleUrl = id => baseUrl + `Order/salesorget/order_id/${id}/way/sale.html`

const checkUrl = baseUrl + 'Order/rush.html'

module.exports = {
  loginUrl,
  confirmChooseUrl,
  payUrl,
  confirmPayUrl,
  createSaleUrl,
  checkUrl
}