let models = require('../../../models/index');
const { validate_errors } = require('./../../helpers');

module.exports = async (ctx, next) => {
  let { email, password, first_name, last_name } = ctx.request.body;
  let user = models.User.build({
    email: email,
    password: password,
    first_name: first_name,
    last_name: last_name
  });

  try {
    await user.validate();
    await next();
  } catch (e) {
    e.obj = validate_errors(e);
    ctx.app.emit('error', e, ctx);
  }
};
