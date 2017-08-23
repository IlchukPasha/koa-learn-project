'use strict';
module.exports = function(sequelize, DataTypes) {
  let Role = sequelize.define(
    'Role',
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'name can`t be empty' }
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
      tableName: 'roles'
    }
  );

  Role.associate = models => {
    Role.belongsToMany(models.User, { as: 'users', through: 'UserRoles', foreignKey: 'role_id' });
  };

  return Role;
};
