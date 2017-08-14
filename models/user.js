'use strict';
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [4,30]
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [4,15]
      }
    },
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [4,30]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [4,30]
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};