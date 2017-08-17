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
      }
    },
    {
      classMethods: {
        associate: function(models) {
          Role.belongsToMany(User, { as: 'Users', through: 'UserRoles', foreignKey: 'role_id' });
        }
      }
    }
  );
  return Role;
};
