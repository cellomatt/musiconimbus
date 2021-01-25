'use strict';
module.exports = (sequelize, DataTypes) => {
  const Composer = sequelize.define('Composer', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {});
  Composer.associate = function(models) {
    // associations can be defined here
  };
  return Composer;
};