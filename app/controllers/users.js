const Router = require('koa-router');
let router = new Router({ prefix: '/users' });
let models = require('./../../models');
let bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);

const { auth: auth_mw, validators: { user_create: user_create_validate_mw } } = require('./../middlewares');

router.get('/', auth_mw, async (ctx, next) => {
  let { first_name, last_name } = ctx.request.query;
  try {
    let users = await models.User.findAll({
      where: {
        first_name1: { $like: '%' + first_name + '%' },
        last_name1: { $like: '%' + last_name + '%' }
      },
      attributes: ['id', 'email', 'password', 'first_name', 'last_name']
    });
    ctx.body = users;
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

router.get('/:id', async (ctx, next) => {
  try {
    let user = await models.User.findById(ctx.params.id);
    ctx.body = user;
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

router.post('/', auth_mw, user_create_validate_mw, async (ctx, next) => {
  let { email, password, first_name, last_name } = ctx.request.body;
  try {
    await models.User.create({
      email: email,
      password: bcrypt.hashSync(password, salt),
      first_name: first_name,
      last_name: last_name
    });
    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

router.put('/:id', auth_mw, user_create_validate_mw, async (ctx, next) => {
  try {
    let user = await models.User.update(ctx.request.body, {
      where: {
        id: ctx.params.id
      }
    });
    if (user[0]) {
      ctx.status = 200;
    } else {
      ctx.status = 404;
    }
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

router.delete('/:id', auth_mw, async (ctx, next) => {
  try {
    let user = await models.User.destroy({
      where: {
        id: ctx.params.id
      }
    });
    if (user) {
      ctx.status = 204;
    } else {
      ctx.status = 404;
    }
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

module.exports = router;
