'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable(
        'users',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          email: {
            allowNull: false,
            type: Sequelize.STRING
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING
          },
          first_name: {
            allowNull: false,
            type: Sequelize.STRING
          },
          last_name: {
            allowNull: false,
            type: Sequelize.STRING
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
        return queryInterface.addIndex('users', ['email'], {
          indicesType: 'UNIQUE'
        });
      });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
