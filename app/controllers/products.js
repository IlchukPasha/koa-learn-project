const Router = require('koa-router');
let router = new Router({ prefix: '/products' });
let models = require('./../../models');

const { auth: auth_mw } = require('./../middlewares');

router.get('/', auth_mw, async (ctx, next) => {
  try {
    let products = await models.Product.findAll({
      include: [{ model: Category }],
      attributes: ['id', 'name', 'price', 'category_id']
    });
    ctx.body = products;
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

module.exports = router;
