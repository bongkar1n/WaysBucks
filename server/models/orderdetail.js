"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orderDetail.belongsTo(models.product, {
        foreignKey: {
          name: "productId",
        },
      });
      orderDetail.belongsTo(models.user, {
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  orderDetail.init(
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      topping: DataTypes.STRING,
      totalPrice: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "orderDetail",
    }
  );
  return orderDetail;
};
