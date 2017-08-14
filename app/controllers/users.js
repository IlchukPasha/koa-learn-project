const Router = require('koa-router');
let router = new Router({ prefix: '/users' });
let models  = require('./../../models');

router.get('/', async (ctx, next) => {
  // models.User.findAll().then( users => {
  //   ctx.body = users;
  // }).catch(next);
  let { first_name, last_name } = ctx.request.query;
  let users = null;
  try{
    users = await models.User.findAll({
      where: {
        first_name: {$like: '%' + first_name + '%'},
        last_name: {$like: '%' + last_name + '%'}
      },
      attributes: ['id', 'email', 'password', 'first_name', 'last_name']
    });
  }catch(err){
    ctx.status = 400;
    return ctx.body = err;
  }

  ctx.body = users;
});

router.get('/:id', async (ctx, next) => {
  let user = null;
  try{
    user = await models.User.findById(ctx.params.id);
  }catch(err){
    ctx.status = 400;
    return ctx.body = err;
  }
  ctx.body = user;
});

router.post('/', async (ctx, next) => {
  let { email, password, first_name, last_name } = ctx.request.body;
  try{
    await models.User.create({
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name
    });
  }catch(err){
    ctx.status = 400;
    return ctx.body = err;
  }
  ctx.status = 200;
});

router.put('/:id', async (ctx, next) => {
  let user = null;
  try{
    user = await models.User.update(
      ctx.request.body,
      {
        where: {
          id: ctx.params.id
        }
      }
    );
  }catch(err){
    ctx.status = 400;
    return ctx.body = err;
  }
  if(user[0]){
    return ctx.status = 200;
  }
  return ctx.status = 404;
});

router.delete('/:id', async (ctx, next) => {
  let user = null;
  try{
    user = await models.User.destroy({
      where: {
        id: ctx.params.id
      }
    });
  }catch(err){
    ctx.status = 400;
    return ctx.body = err;
  }
  if(user){
    return ctx.status = 204;
  }
  return ctx.status = 404;
});

module.exports = router;