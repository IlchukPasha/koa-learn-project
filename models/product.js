'use strict';
module.exports = function(sequelize, DataTypes) {
  let Product = sequelize.define(
    'Product',
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'name can`t be empty' },
          len: { args: [4, 30], msg: 'name length must be in 4-30 symbols' }
        }
      },
      price: {
        type: DataTypes.DECIMAL,
        validate: {
          notEmpty: { msg: 'price can`t be empty' },
          isDecimal: true,
          max: { args: 9999999999, msg: 'max length must be less then 1000000000' }
        }
      },
      category_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: { msg: 'category_id can`t be empty' }
          // перевіряти чи єтака категорія
        }
      }
    },
    {
      classMethods: {
        associate: function(models) {
          Product.belongsTo(Category, { as: 'Category' });

          Product.hasOne(ProductPacket, { as: 'ProductPacket' });
        }
      }
    }
  );
  return Product;
};
