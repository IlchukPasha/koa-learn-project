const Router = require('koa-router');
let router = new Router();
let models = require('../../models');

const { auth: auth_mw } = require('./../middlewares');

router.get('/', auth_mw, async (ctx, next) => {
  try {
    let orders = await models.Order.findAll({
      include: [
        {
          model: models.OrderItem,
          as: 'order_items',
          attributes: ['id', 'order_id', 'product_packet_id', 'packet_price'],
          required: true
        }
      ],
      attributes: ['id', 'total_price', 'user_id']
    });
    ctx.body = orders;
    ctx.type = 'application/json';
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

module.exports = router;
