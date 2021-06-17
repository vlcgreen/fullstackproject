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
      models.users.belongsToMany(models.family, {through: 'membership', foreignKey: 'userID'});
      models.users.hasMany(models.user_recipes, {foreignKey: 'userID'});
      models.users.hasMany(models.family, {foreignKey: 'owner'});
      models.users.hasMany(models.rating, {foreignKey: 'userID'});
      models.users.belongsTo(models.roles, {foreignKey: 'roleID'});
    }
  };
  users.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    photo: DataTypes.STRING,
    roleID: {
      DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};

