const Koa = require('koa');

let app = new Koa();

app.use(require('koa-body')());

let routes = require('./app/routes');
app.use(routes.routes()).use(routes.allowedMethods());

app.on('error', (err, ctx) => {
  switch (err.name) {
    case 'SequelizeValidationError':
      ctx.status = 400;
      ctx.body = err.obj;
      break;
    default:
      ctx.status = ctx.status || 500;
      ctx.body = err.obj || '';
      break;
  }
});

app.listen(1337);

module.exports = app;
