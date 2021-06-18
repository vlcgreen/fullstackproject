"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_recipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user_recipes.belongsTo(models.users, { foreignKey: "userID" });
    }
  }
  user_recipes.init(
    {
      title: DataTypes.STRING,
      ingredients: DataTypes.STRING,
      directions: DataTypes.STRING,
      image: DataTypes.STRING,
      userID: DataTypes.INTEGER,
      tag: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user_recipes",
    }
  );
  return user_recipes;
};
