'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.belongsToMany(models.family, {through: 'membership', foreignKey: 'userID'});
      users.hasMany(models.user_recipes, {foreignKey: 'userID'});
      users.hasMany(models.family, {foreignKey: 'owner'});
      users.hasMany(models.rating, {foreignKey: 'userID'});
      users.belongsTo(models.roles, {foreignKey: 'roleID'});
    }
  };
  users.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    photo: DataTypes.STRING,
    roleID: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};