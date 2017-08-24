const Router = require('koa-router');
let router = new Router();
let models = require('../../models');

const { auth: auth_mw } = require('./../middlewares');

router.get('/', auth_mw, async (ctx, next) => {
  try {
    let order_items = await models.OrderItem.findAll({
      include: [
        {
          model: models.Order,
          as: 'order',
          attributes: ['id', 'total_price', 'user_id'],
          required: true
        }
      ],
      attributes: ['id', 'order_id', 'product_packet_id', 'packet_price']
    });
    ctx.body = order_items;
    ctx.type = 'application/json';
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

module.exports = router;
