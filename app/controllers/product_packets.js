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
    ctx.type = 'application/json';
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

router.post('/', auth_mw, async (ctx, next) => {
  let { quantity } = ctx.request.body;
  try {
    await models.ProductPacket.create(
      {
        quantity: quantity,
        product: {
          name: 'product with packet',
          price: 110,
          category: {
            name: 'some cat',
            description: 'some desc'
          }
        }
      },
      {
        include: [
          {
            association: models.ProductPacket.OwnProduct,
            include: [{ association: models.Product.Category }]
          }
        ]
      }
    );
    ctx.body = '';
    ctx.type = 'application/json';
    ctx.status = 201;
  } catch (e) {
    if (e.name === 'SequelizeValidationError') {
      e.obj = validate_errors(e);
    } else {
      ctx.status = 500;
    }
    ctx.app.emit('error', e, ctx);
  }
});

module.exports = router;
