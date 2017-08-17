const Router = require('koa-router');
let router = new Router({ prefix: '/categories' });
let models = require('./../../models');

router.get('/', async (ctx, next) => {
  try {
    let categories = await models.Category.findAll({
      attributes: ['id', 'name', 'description', 'parent_id']
    });
    ctx.body = categories;
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

router.get('/:id', async (ctx, next) => {
  try {
    let category = await models.Category.findById(ctx.params.id, {
      attributes: ['id', 'name', 'description', 'parent_id']
    });
    if (category) {
      ctx.body = category;
    } else {
      // return text/plain why ???
      ctx.body = '';
      ctx.status = 404;
    }
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

module.exports = router;
