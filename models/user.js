'use strict';
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: { msg: 'not correct email format' },
          notEmpty: { msg: 'email can`t be empty' },
          len: { args: [4, 30], msg: 'email length must be in 4-30 symbols' },
          isUnique: async value => {
            let c = await User.count({
              where: {
                email: value
              }
            });
            if (c > 0) {
              throw new Error('Email already exist');
            }
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'password can`t be empty' },
          len: { args: [4, 100], msg: 'password length must be in 4-100 symbols' }
        }
      },
      first_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'first_name can`t be empty' },
          len: { args: [4, 30], msg: 'first_name length must be in 4-30 symbols' }
        }
      },
      last_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'last_name can`t be empty' },
          len: { args: [4, 30], msg: 'last_name length must be in 4-30 symbols' }
        }
      },
      created_at: {
        type: DataTypes.DATE
      },
      updated_at: {
        type: DataTypes.DATE
      }
    },
    {
      underscored: true,
      tableName: 'users'
    }
  );

  User.associate = models => {
    User.hasMany(models.Order, { as: 'orders' });
    User.belongsToMany(models.Role, {
      as: 'roles',
      through: {
        model: 'UserRoles',
        unique: false
      },
      foreignKey: 'user_id'
    });
  };

  return User;
};
