let models = require('../../models');
const { each } = require('lodash');

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
  } catch (e) {
    ctx.status = 400;
    let validate_errors = [];
    each(e.errors, error => {
      validate_errors.push(error.message);
    });
    return (ctx.body = validate_errors);
  }
  await next();
};
