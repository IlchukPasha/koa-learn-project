let router_part = require('koa-router')();
let router = require('koa-router')();

const { auth: authCtrl, users: usersCtrl, categories: catCtrl } = require('./controllers/index');

router_part.use(authCtrl.routes(), authCtrl.allowedMethods());
router_part.use(usersCtrl.routes(), usersCtrl.allowedMethods());
router_part.use(catCtrl.routes(), catCtrl.allowedMethods());


router.use('/api/v1', router_part.routes(), router_part.allowedMethods());

module.exports = router;
