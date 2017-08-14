let router_part = require('koa-router')();
let router = require('koa-router')();

const {
  users: usersCtrl
} = require('./controllers/index');

router_part.use(usersCtrl.routes(), usersCtrl.allowedMethods());
router.use('/api/v1', router_part.routes(), router_part.allowedMethods());

module.exports = router;
