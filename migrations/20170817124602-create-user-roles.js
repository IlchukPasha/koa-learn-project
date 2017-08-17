'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable('UserRoles', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        role_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        return queryInterface.addConstraint('UserRoles', ['user_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'Users',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      })
      .then(() => {
        return queryInterface.addConstraint('UserRoles', ['role_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'Roles',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('UserRoles');
  }
};
