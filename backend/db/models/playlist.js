'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  Playlist.associate = function(models) {
    // associations can be defined here
  };
  return Playlist;
};