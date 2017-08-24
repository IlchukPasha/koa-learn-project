const Koa = require('koa');
let app = new Koa();

app.use(require('koa-body')());

let routes = require('./app/routes');
app.use(routes.routes()).use(routes.allowedMethods());

app.on('error', (err, ctx) => {
  switch (err.name) {
    case 'SequelizeValidationError':
      ctx.body = err.obj;
      ctx.type = 'application/json';
      ctx.status = 400;
      break;
    case 'JsonWebTokenError':
      ctx.body = '';
      ctx.type = 'application/json';
      ctx.status = 401;
      break;
    default:
      ctx.body = err || '';
      ctx.type = 'application/json';
      ctx.status = ctx.status || 500;
      break;
  }
});

app.listen(1337);

module.exports = app;
