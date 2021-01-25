'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    title: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    releaseDate: DataTypes.DATE,
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
  };
  return Album;
};