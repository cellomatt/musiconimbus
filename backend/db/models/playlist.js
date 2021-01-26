'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Playlist.associate = function(models) {
    Playlist.belongsTo(models.User, { foreignKey: 'userId' });
    Playlist.belongsToMany(models.Song, { through: 'Playlist_Song' });
  };
  return Playlist;
};
