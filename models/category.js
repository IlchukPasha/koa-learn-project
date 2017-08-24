'use strict';
module.exports = function(sequelize, DataTypes) {
  let Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: 'name can`t be empty' },
          len: { args: [4, 30], msg: 'name length must be in 4-30 symbols' }
        }
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          max: { args: 1000, msg: 'description length must be less then 1000 symbols' }
        }
      },
      parent_id: {
        type: DataTypes.INTEGER(11),
        validate: {
          isInt: { msg: 'Parent id must be integer' },
          isCategoryExist: async value => {
            let c = await Category.count({
              where: {
                id: value
              }
            });
            if (c === 0) {
              throw new Error('Parent category not exist');
            }
          }
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
      tableName: 'categories'
    }
  );

  Category.associate = models => {
    Category.hasMany(models.Product, { as: 'products' });
    Category.belongsTo(Category, { as: 'category', foreignKey: 'parent_id', targetKey: 'id' });
    Category.hasMany(Category, { as: 'categories', foreignKey: 'parent_id', sourceKey: 'id' });
  };

  return Category;
};
