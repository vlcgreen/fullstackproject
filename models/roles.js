'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.roles.hasMany(models.users);
    }
  };
  roles.init({
    title: DataTypes.INTEGER,
    level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};