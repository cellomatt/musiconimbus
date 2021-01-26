'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@email.com',
        username: 'demo',
        firstName: 'Demo',
        lastName: 'Doe',
        artistName: 'DemoArtist',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'hilary@email.com',
        username: 'hhahn2020',
        firstName: 'Hilary',
        lastName: 'Hahn',
        artistName: 'Hilary Hahn',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'cordova.quartet@gmail.com',
        username: 'cordova.quartet',
        firstName: 'Matt',
        lastName: 'Kufchak',
        artistName: 'Cordova Quartet',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'yo-yo@email.com',
        username: 'yoyo_cello',
        firstName: 'Yo-Yo',
        lastName: 'Ma',
        artistName: 'Yo-Yo Ma',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'janos@email.com',
        username: 'janos',
        firstName: 'János',
        lastName: 'Starker',
        artistName: 'János Starker',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'beethoven4tet@email.com',
        username: 'beethoven_q',
        firstName: 'Dmitri',
        lastName: 'Tsyganov',
        artistName: 'Beethoven Quartet',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: 'emerson4tet@email.com',
        username: 'esq',
        firstName: 'David',
        lastName: 'Finckel',
        artistName: 'Emerson String Quartet',
        hashedPassword: bcrypt.hashSync('emerson'),
      },
      {
        email: 'takacs@email.com',
        username: 'takacs_sq',
        firstName: 'Károly',
        lastName: 'Schranz',
        artistName: 'Takács Quartet',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        artistName: faker.random.word(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        artistName: faker.random.word(),
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
