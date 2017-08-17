let models = require('../../../models/index');
const { validate_errors } = require('./../../helpers');

module.exports = async (ctx, next) => {
  let { email, password } = ctx.request.body;
  let auth = models.Auth.build({
    email: email,
    password: password
  });

  try {
    await auth.validate();
    await next();
  } catch (e) {
    e.obj = validate_errors(e);
    ctx.app.emit('error', e, ctx);
  }
};
