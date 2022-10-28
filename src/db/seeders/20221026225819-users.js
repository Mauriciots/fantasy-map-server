'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Megumi Akama',
          email: 'megaka@outlook.com',
          password: 'not_soSaf&_password',
          profilePicture: 'https://www.w3schools.com/howto/img_avatar.png',
          location: 'Vancouver, BC',
          description: 'Gimme somme wine!',
        },
        {
          name: 'Yuto Yamakita',
          email: 'yuto_yama123@gmail.com',
          password: 'not_soSaf&_password',
          profilePicture: 'https://www.w3schools.com/howto/img_avatar.png',
          location: 'Vancouver, BC',
          description: 'Yo bro, call me U-2',
        },
        {
          name: 'Mauricio Tomaz',
          email: 'mauriciotomaz@yahoo.com',
          password: 'not_soSaf&_password',
          profilePicture: 'https://www.w3schools.com/howto/img_avatar.png',
          location: 'Vancouver, BC',
          description: 'No matter where, but with you',
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
