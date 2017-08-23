'use strict';
module.exports = function(sequelize, DataTypes) {
  let Order = sequelize.define(
    'Order',
    {
      total_price: {
        type: DataTypes.DECIMAL,
        validate: {
          notEmpty: { msg: 'total_price can`t be empty' },
          max: { args: 9999999999, msg: 'max length must be less then 1000000000' }
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: 'total_price can`t be empty' }
          // чи є юзер
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
      tableName: 'orders'
    }
  );

  Order.associate = models => {
    Order.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
    Order.hasMany(models.OrderItem);
  };

  return Order;
};
