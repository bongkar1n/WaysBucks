"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user, {
        foreignKey: {
          name: "userId",
        },
      });
      // transaction.belongsTo(models.orderDetail, {
      //   as: "orderDetail",
      //   foreignKey: {
      //     name: "orderId",
      //   },
      // });
    }
  }
  transaction.init(
    {
      userId: DataTypes.INTEGER,
      orderId: DataTypes.STRING,
      admin: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      //hooks, beforeCreate
      sequelize,
      modelName: "transaction",
    }
  );
  return transaction;
};
