const Router = require('koa-router');
let router = new Router();
let models = require('../../models');

const { auth: auth_mw } = require('./../middlewares');

router.get('/', auth_mw, async (ctx, next) => {
  try {
    let product_packets = await models.ProductPacket.findAll({
      include: [
        {
          model: models.Product,
          as: 'product',
          attributes: ['id', 'name', 'price', 'category_id'],
          required: true
        }
      ],
      attributes: ['id', 'product_id', 'quantity']
    });
    ctx.body = product_packets;
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

module.exports = router;
