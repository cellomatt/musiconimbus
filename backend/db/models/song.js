'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: DataTypes.STRING,
    albumId: DataTypes.INTEGER,
    composerId: DataTypes.INTEGER,
    songUrl: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
  };
  return Song;
};