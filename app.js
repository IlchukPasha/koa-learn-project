const Koa = require('koa');

let app = new Koa();

app
  .use(require('koa-body')());

let routes = require('./app/routes');
app.use(routes.routes()).use(routes.allowedMethods());

app.listen(1337);