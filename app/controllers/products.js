const Router = require('koa-router');
let router = new Router();
let models = require('../../models');

const { validate_errors } = require('./../helpers');

const { auth: auth_mw } = require('./../middlewares');

router.get('/', auth_mw, async (ctx, next) => {
  try {
    let products = await models.Product.findAll({
      include: [
        {
          model: models.Category,
          as: 'category',
          attributes: ['id', 'name', 'description', 'parent_id'],
          required: true
        }
      ],
      attributes: ['id', 'name', 'price', 'category_id']
    });
    ctx.body = products;
    ctx.type = 'application/json';
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

router.get('/:id', auth_mw, async (ctx, next) => {
  try {
    let product = await models.Product.findById(ctx.params.id, {
      include: [{ model: models.Category, as: 'category' }],
      attributes: ['id', 'name', 'price', 'category_id']
    });
    if (product) {
      ctx.body = product;
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

router.post('/', auth_mw, async (ctx, next) => {
  let { name, price } = ctx.request.body;
  try {
    await models.Product.create(
      {
        name: name,
        price: price,
        category: {
          name: 'some cat',
          description: 'desc'
        }
      },
      { include: [models.Product.Category] }
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

router.put('/:id', auth_mw, async (ctx, next) => {
  let { name, price, category_id } = ctx.request.body;
  try {
    await models.Product.update(
      {
        name: name,
        price: price,
        category_id: category_id
      },
      {
        where: {
          id: ctx.params.id
        }
      }
    );
    ctx.body = '';
    ctx.type = 'application/json';
    ctx.status = 200;
  } catch (e) {
    if (e.name === 'SequelizeValidationError') {
      e.obj = validate_errors(e);
    } else {
      ctx.status = 500;
    }
    ctx.app.emit('error', e, ctx);
  }
});

router.delete('/:id', auth_mw, async (ctx, next) => {
  try {
    let product = await models.Product.destroy({
      where: {
        id: ctx.params.id
      }
    });
    if (product) {
      ctx.type = 'application/json';
      ctx.status = 204;
    } else {
      ctx.body = '';
      ctx.type = 'application/json';
      ctx.status = 404;
    }
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
