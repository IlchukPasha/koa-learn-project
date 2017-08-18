let models = require('../../../models/index');
const { validate_errors } = require('./../../helpers');

module.exports = async (ctx, next) => {
  let { name, description, parent_id } = ctx.request.body;
  let user = models.Category.build({
    name: name,
    description: description,
    parent_id: parent_id
  });

  try {
    await user.validate();
    await next();
  } catch (e) {
    e.obj = validate_errors(e);
    ctx.app.emit('error', e, ctx);
  }
};
