const Router = require('koa-router');
let router = new Router();
let models = require('./../../models');
let jwt = require('jsonwebtoken');
let env = require('./../../config/config.json');
let bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);
const { validators: { user_create: user_create_validate_mw, auth: auth_validate_mw } } = require('./../middlewares');

router.post('/signin', auth_validate_mw, async (ctx, next) => {
  let { email, password } = ctx.request.body;
  try {
    let user = await models.User.find({ where: { email: email } });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        let token = jwt.sign({ id: user.id }, env.secret, { expiresIn: '120d' });
        ctx.status = 200;
        ctx.body = { token: token };
      } else {
        ctx.status = 401;
      }
    } else {
      ctx.status = 401;
    }
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

router.post('/signup', user_create_validate_mw, async (ctx, next) => {
  let { email, password, first_name, last_name } = ctx.request.body;
  try {
    let user = await models.User.create({
      email: email,
      password: bcrypt.hashSync(password, salt),
      first_name: first_name,
      last_name: last_name
    });
    let token = jwt.sign({ id: user.id }, env.secret, { expiresIn: '120d' });
    ctx.status = 200;
    ctx.body = { token: token };
  } catch (e) {
    ctx.status = 500;
    ctx.app.emit('error', e, ctx);
  }
});

module.exports = router;
