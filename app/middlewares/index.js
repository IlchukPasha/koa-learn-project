module.exports = {
  validators: {
    auth: require('./validators/auth'),
    user_create: require('./validators/user_create'),
    category_create: require('./validators/category_create')
  },
  auth: require('./auth')
};
