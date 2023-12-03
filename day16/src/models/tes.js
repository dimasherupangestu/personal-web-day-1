'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tes.init({
    name: DataTypes.STRING,
    star_date: DataTypes.DATE,
    end_date: DataTypes.STRING,
    pesan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tes',
  });
  return tes;
};