'use strict';
module.exports = function(sequelize, DataTypes) {
  let Auth = sequelize.define(
    'Auth',
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: { msg: 'not correct email format' },
          notEmpty: { msg: 'email can`t be empty' },
          len: { args: [4, 30], msg: 'email length must be in 4-30 symbols' }
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'password can`t be empty' },
          len: { args: [4, 100], msg: 'password length must be in 4-100 symbols' }
        }
      }
    },
    {
      classMethods: {
        associate: function(models) {}
      }
    }
  );
  return Auth;
};
