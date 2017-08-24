const Router = require('koa-router');
let router = new Router();
let models = require('../../models');

const { auth: auth_mw, validators: { category_create: category_create_validate_mw } } = require('./../middlewares');

router.get('/', auth_mw, async (ctx, next) => {
  try {
    let categories = await models.Category.findAll({
      attributes: ['id', 'name', 'description', 'parent_id'],
      include: [
        {
          model: models.Product,
          as: 'products',
          attributes: ['id', 'name', 'price', 'category_id']
        },
        {
          model: models.Category,
          as: 'category',
          attributes: ['id', 'name', 'description', 'parent_id']
        },
        {
          model: models.Category,
          as: 'categories',
          attributes: ['id', 'name', 'description', 'parent_id']
        }
      ]
    });
    ctx.type = 'application/json';
    ctx.body = categories;
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

router.get('/:id', auth_mw, async (ctx, next) => {
  try {
    let category = await models.Category.findById(ctx.params.id, {
      attributes: ['id', 'name', 'description', 'parent_id']
    });
    if (category) {
      ctx.type = 'application/json';
      ctx.body = category;
    } else {
      ctx.body = '';
      ctx.type = 'application/json';
      ctx.status = 404;
    }
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

router.post('/', auth_mw, category_create_validate_mw, async (ctx, next) => {
  try {
    await models.Category.create(ctx.request.body);
    ctx.body = '';
    ctx.type = 'application/json';
    ctx.status = 201;
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

router.put('/:id', auth_mw, category_create_validate_mw, async (ctx, next) => {
  try {
    await models.Category.update(ctx.request.body, {
      where: {
        id: ctx.params.id
      }
    });
    ctx.body = '';
    ctx.type = 'application/json';
    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

router.delete('/:id', auth_mw, async (ctx, next) => {
  try {
    let category = await models.Category.destroy({
      where: {
        id: ctx.params.id
      }
    });
    if (category) {
      ctx.type = 'application/json';
      ctx.status = 204;
    } else {
      ctx.body = '';
      ctx.type = 'application/json';
      ctx.status = 404;
    }
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

module.exports = router;
