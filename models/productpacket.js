'use strict';
module.exports = function(sequelize, DataTypes) {
  let ProductPacket = sequelize.define(
    'ProductPacket',
    {
      product_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: 'product_id can`t be empty' }
          // перевіряти чи є такий продукт
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: 'quantity can`t be empty' }
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
      tableName: 'product_packets'
    }
  );

  ProductPacket.associate = models => {
    ProductPacket.hasOne(models.OrderItem);
    ProductPacket.belongsTo(models.Product, { as: 'product', foreignKey: 'product_id' });
  };

  return ProductPacket;
};
