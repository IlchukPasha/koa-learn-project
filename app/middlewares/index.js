module.exports = {
  validators: {
    user_create: require('./validators/user_create'),
    auth: require('./validators/auth')
  },
  auth: require('./auth')
};
