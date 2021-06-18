"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.membership.hasMany(models.users, { foreignKey: "id" });
      //models.membership.hasMany(models.user_recipes, { foreignKey: "userID" });
    }
  }
  membership.init(
    {
      userID: DataTypes.INTEGER,
      familyID: DataTypes.INTEGER,
      isApproved: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "membership",
    }
  );
  return membership;
};
