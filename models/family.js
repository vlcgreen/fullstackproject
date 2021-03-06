'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class family extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.family.belongsTo(models.users, {foreignKey: 'owner'});
      models.family.belongsToMany(models.users, {through: 'membership', foreignKey: 'familyID'});
    }
  };
  family.init({
    familyName: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    familyPhoto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'family',
  });
  return family;
};