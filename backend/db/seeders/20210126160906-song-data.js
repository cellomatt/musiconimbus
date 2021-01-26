'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Songs', [
        {
          title: 'Ravel String Quartet - I. Allegro moderato – très doux'
          albumId: 1,
          composerId: 3,
          songUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/Cordova_Ravel_1.mp3'
          description: 'A live performance of Maurice Ravel\'s String Quartet.'
        },
        {
          title: 'Ravel String Quartet - II. Assez vif – très rythmé'
          albumId: 1,
          composerId: 3,
          songUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/Cordova_Ravel_2.mp3'
          description: 'A live performance of Maurice Ravel\'s String Quartet.'
        },
        {
          title: 'Ravel String Quartet - III. Très lent'
          albumId: 1,
          composerId: 3,
          songUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/Cordova_Ravel_3.mp3'
          description: 'A live performance of Maurice Ravel\'s String Quartet.'
        },
        {
          title: 'Ravel String Quartet - IV. Vif et agité'
          albumId: 1,
          composerId: 3,
          songUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/Cordova_Ravel_4.mp3'
          description: 'A live performance of Maurice Ravel\'s String Quartet.'
        },
        {
          title: 'Elfentanz'
          albumId: 2,
          composerId: 1,
          songUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/15+Elfentanz.mp3'
          description:
        },
        {
          title: 'String Quartet No. 1 in C minor - I. Allegro'
          albumId: 3,
          composerId: 9,
          songUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/01+No.1+In+C+Minor+-+1+Allegro.m4a'
          description:
        },
        {
          title: 'String Quartet No. 1 in C minor - II. Romanze: Poco adagio'
          albumId: 3,
          composerId: 9,
          songUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/02+No.1+In+C+Minor+-+2+Romanze_+Poco.m4a'
          description:
        },
        {
          title: 'String Quartet No. 1 in C minor - III. Allegretto molto moderato e comodo'
          albumId: 3,
          composerId: 9,
          songUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/03+No.1+In+C+Minor+-+3+Allegro+Molto.m4a'
          description:
        },
        {
          title: 'String Quartet No. 1 in C minor - IV. Allegro'
          albumId: 3,
          composerId: 9,
          songUrl: 'https://musiconimbus.s3.us-east-2.amazonaws.com/04+No.1+In+C+Minor+-+4+Allegro.m4a'
          description:
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Songs', null, {});
  }
};
