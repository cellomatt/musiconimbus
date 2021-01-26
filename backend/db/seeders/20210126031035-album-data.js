'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Albums', [
        {
          title: 'Cordova Quartet Live',
          artistId: 3,
          releaseDate: 2016,
          imageUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/CordovaQuartet-cover.jpg',
          description: 'From a recital at the University of Texas in March 2016.'
        },
        {
          title: 'Romantic Cello Favorites',
          artistId: 5,
          releaseDate: 1989,
          imageUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/CordovaQuartet-cover.jpg',
          description: 'A tribute to cellist and composer David Popper.'
        },
        {
          title: 'Brahms',
          artistId: 7,
          releaseDate: 2007,
          imageUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/CordovaQuartet-cover.jpg',
          description: 'Featuring Brahms\' piano quintet with Leon Fleisher and all three string quartets.'
        },
        {
          title: 'Hilary Hahn plays Bach',
          artistId: 2,
          releaseDate: 1997,
          imageUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/CordovaQuartet-cover.jpg',
          description: 'Featuring J.S. Bach\'s Partitas no. 2 and 3 and Sonata no. 3 for solo violin.'
        },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Albums', null, {});
  }
};
