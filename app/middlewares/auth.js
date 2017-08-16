const jwt = require('jsonwebtoken');
let env = require('./../../config/config.json');
let models = require('./../../models');

module.exports = async (ctx, next) => {
  let decoded = null;
  try {
    decoded = await jwt.verify(ctx.headers.authorization, env.secret);
    if (decoded) {
      let user = await models.User.findById(decoded.id);
      if (user) {
        ctx.state._user = user;
        await next();
      } else {
        ctx.status = 404;
      }
    } else {
      ctx.status = 401;
    }
  } catch (e) {
    switch (e.name) {
      case 'JsonWebTokenError':
        ctx.status = 401;
        ctx.body = '';
        break;
      default:
        ctx.status = 500;
        ctx.body = '';
        break;
    }
    ctx.app.emit('error', e, ctx);
  }
};
