'use strict';
module.exports = function(sequelize, DataTypes) {
  let UserRoles = sequelize.define(
    'UserRoles',
    {
      user_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: 'user_id can`t be empty' }
          // чи є юзер
        }
      },
      role_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: 'role_id can`t be empty' }
          // чи є роль
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
      tableName: 'user_roles'
    }
  );
  return UserRoles;
};
