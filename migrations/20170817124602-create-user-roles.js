'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable(
        'user_roles',
        {
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
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
          }
        },
        { charset: 'utf8', timestamps: true, underscored: true }
      )
      .then(() => {
        return queryInterface.addConstraint('user_roles', ['user_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'users',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      })
      .then(() => {
        return queryInterface.addConstraint('user_roles', ['role_id'], {
          type: 'FOREIGN KEY',
          references: {
            table: 'roles',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        });
      });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('user_roles');
  }
};
