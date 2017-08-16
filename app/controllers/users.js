const Router = require('koa-router');
let router = new Router({ prefix: '/users' });
let models = require('./../../models');
let bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);

const { auth: auth_mw, validators: { user_create: user_create_validate_mw } } = require('./../middlewares');

router.get('/', auth_mw, async (ctx, next) => {
  let { first_name, last_name } = ctx.request.query;
  let users = null;
  try {
    users = await models.User.findAll({
      where: {
        first_name1: { $like: '%' + first_name + '%' },
        last_name1: { $like: '%' + last_name + '%' }
      },
      attributes: ['id', 'email', 'password', 'first_name', 'last_name']
    });
    ctx.body = users;
  } catch (err) {
    ctx.app.emit('error', err, ctx);
  }
});

router.get('/:id', async (ctx, next) => {
  let user = null;
  try {
    user = await models.User.findById(ctx.params.id);
    ctx.body = user;
  } catch (err) {
    ctx.status = 500;
    return (ctx.body = err);
  }
});

router.post('/', auth_mw, user_create_validate_mw, async (ctx, next) => {
  let { email, password, first_name, last_name } = ctx.request.body;
  try {
    models.User.create({
      email: email,
      password: bcrypt.hashSync(password, salt),
      first_name: first_name,
      last_name: last_name
    });
  } catch (e) {
    ctx.status = 500;
    return (ctx.body = e);
  }
  ctx.status = 200;
});

router.put('/:id', auth_mw, user_create_validate_mw, async (ctx, next) => {
  let user = null;
  try {
    user = await models.User.update(ctx.request.body, {
      where: {
        id: ctx.params.id
      }
    });
  } catch (err) {
    ctx.status = 500;
    return (ctx.body = err);
  }
  if (user[0]) {
    return (ctx.status = 200);
  }
  return (ctx.status = 404);
});

router.delete('/:id', auth_mw, async (ctx, next) => {
  let user = null;
  try {
    user = await models.User.destroy({
      where: {
        id: ctx.params.id
      }
    });
  } catch (err) {
    ctx.status = 500;
    return (ctx.body = err);
  }
  if (user) {
    return (ctx.status = 204);
  }
  return (ctx.status = 404);
});

module.exports = router;
