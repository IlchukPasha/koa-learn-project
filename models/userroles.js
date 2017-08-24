'use strict';
module.exports = function(sequelize, DataTypes) {
  let UserRoles = sequelize.define(
    'UserRoles',
    {
      user_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: 'user_id can`t be empty' },
          isUserExist: async value => {
            let User = sequelize.models.User;
            let c = await User.count({
              where: {
                id: value
              }
            });
            if (c === 0) {
              throw new Error('User not exist');
            }
          }
        }
      },
      role_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: 'role_id can`t be empty' },
          isRoleExist: async value => {
            let Role = sequelize.models.Role;
            let c = await Role.count({
              where: {
                id: value
              }
            });
            if (c === 0) {
              throw new Error('Role not exist');
            }
          }
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
