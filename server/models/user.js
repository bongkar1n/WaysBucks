"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.transaction, {
        foreignKey: {
          name: "userId",
        },
      });
      user.hasMany(models.orderDetail, {
        foreignKey: {
          name: "userId",
        },
      });
    }
  }
  user.init(
    {
      fullName: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      address: DataTypes.STRING,
      logAs: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
