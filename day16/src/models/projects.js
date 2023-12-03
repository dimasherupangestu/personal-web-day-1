'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projects.init({
    name: DataTypes.STRING,
    star_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    pesan: DataTypes.STRING,
    node_js: DataTypes.BOOLEAN,
    next_Js: DataTypes.BOOLEAN,
    react_Js: DataTypes.BOOLEAN,
    typescript: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    autorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'projects',
  });
  return projects;
};