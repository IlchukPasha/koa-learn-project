let router = require('koa-router')();

const {
  auth: authCtrl,
  users: usersCtrl,
  categories: catCtrl,
  products: productCtrl,
  product_packets: productPacketCtrl
} = require('./controllers/index');

router.use('/api/v1', authCtrl.routes(), authCtrl.allowedMethods());
router.use('/api/v1/users', usersCtrl.routes(), usersCtrl.allowedMethods());
router.use('/api/v1/categories', catCtrl.routes(), catCtrl.allowedMethods());
router.use('/api/v1/products', productCtrl.routes(), productCtrl.allowedMethods());
router.use('/api/v1/product-packets', productPacketCtrl.routes(), productPacketCtrl.allowedMethods());

module.exports = router;
