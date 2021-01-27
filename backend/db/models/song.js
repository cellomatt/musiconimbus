'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    composerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    songUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.Album, {foreignKey: 'albumId'});
    Song.belongsTo(models.Composer, {foreignKey: 'composerId'});
    Song.belongsToMany(models.Playlist, { through: 'Playlist_Song' });
  };
  return Song;
};
