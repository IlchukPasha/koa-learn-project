'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'roles',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
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
    );
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('roles');
  }
};
