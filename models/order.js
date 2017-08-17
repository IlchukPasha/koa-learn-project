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
      }
    },
    {
      classMethods: {
        associate: function(models) {
          Order.hasMany(OrderItem, { as: 'OrderItems' });

          Order.belongsTo(User, { as: 'User' });
        }
      }
    }
  );
  return Order;
};
