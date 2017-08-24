const Router = require('koa-router');
let router = new Router();
let models = require('../../models');

const { auth: auth_mw } = require('./../middlewares');

router.get('/', auth_mw, async (ctx, next) => {
  try {
    let roles = await models.Role.findAll({
      include: [
        {
          model: models.User,
          as: 'users',
          attributes: ['id', 'email', 'first_name', 'last_name'],
          through: {
            attributes: []
          },
          include: [
            {
              model: models.Order,
              as: 'orders',
              attributes: ['id', 'total_price', 'user_id']
            }
          ]
        }
      ],
      attributes: ['id', 'name']
    });
    ctx.body = roles;
    ctx.type = 'application/json';
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

router.post('/', auth_mw, async (ctx, next) => {
  let { name } = ctx.request.body;
  try {
    await models.Role.create(
      {
        name: name,
        users: [
          {
            email: 'newsademsadfail@email.com',
            password: 'password',
            first_name: 'some first name',
            last_name: 'some last name'
          }
        ]
      },
      {
        include: [
          {
            model: models.User,
            as: 'users'
          }
        ]
      }
    );
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

module.exports = router;
