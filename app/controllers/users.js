const Router = require('koa-router');
let router = new Router();
let models = require('../../models');
let bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);

const { auth: auth_mw, validators: { user_create: user_create_validate_mw } } = require('./../middlewares');

router.get('/', auth_mw, async (ctx, next) => {
  let { first_name, last_name } = ctx.request.query;
  try {
    let users = await models.User.findAll({
      where: {
        first_name: { $like: '%' + first_name + '%' },
        last_name: { $like: '%' + last_name + '%' }
      },
      include: [
        {
          model: models.Role,
          as: 'roles',
          attributes: ['id', 'name'],
          through: {
            attributes: []
          }
        }
      ],
      attributes: ['id', 'email', 'password', 'first_name', 'last_name']
    });
    ctx.body = users;
    ctx.type = 'application/json';
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

router.get('/:id', auth_mw, async (ctx, next) => {
  try {
    let user = await models.User.findById(ctx.params.id);
    ctx.body = user;
    ctx.type = 'application/json';
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
    ctx.type = 'application/json';
    ctx.status = 200;
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

router.post('/with-order', auth_mw, user_create_validate_mw, async (ctx, next) => {
  let { email, password, first_name, last_name } = ctx.request.body;
  try {
    await models.User.create(
      {
        email: email,
        password: bcrypt.hashSync(password, salt),
        first_name: first_name,
        last_name: last_name,
        orders: [{ total_price: 100 }, { total_price: 100 }]
      },
      {
        include: [
          {
            model: models.Order,
            as: 'orders'
          }
        ]
      }
    );
    ctx.type = 'application/json';
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
    ctx.type = 'application/json';
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
    ctx.type = 'application/json';
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
