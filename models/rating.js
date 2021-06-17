'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rating.belongsTo(models.users, {foreignKey: 'userID'});
      rating.belongsTo(models.user_recipes, {foreignKey: 'recipeID'});
    }
  };
  rating.init({
    userID: DataTypes.INTEGER,
    recipeID: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'rating',
  });
  return rating;
};