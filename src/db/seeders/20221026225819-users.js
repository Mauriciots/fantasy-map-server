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
          password: '$2b$14$LL4kg4D1R8KYTkM.Skbg1.PInwuLXNvAD0RRCNstXN6hjEQBCv1S6',
          profilePicture: 'https://www.w3schools.com/howto/img_avatar.png',
          location: 'Vancouver, BC',
          description: 'Gimme somme wine!',
        },
        {
          name: 'Yuto Yamakita',
          email: 'yuto_yama123@gmail.com',
          password: '$2b$14$LL4kg4D1R8KYTkM.Skbg1.PInwuLXNvAD0RRCNstXN6hjEQBCv1S6',
          profilePicture: 'https://www.w3schools.com/howto/img_avatar.png',
          location: 'Vancouver, BC',
          description: 'Yo bro, call me U-2',
        },
        {
          name: 'Mauricio Tomaz',
          email: 'mauriciotomaz@yahoo.com',
          password: '$2b$14$LL4kg4D1R8KYTkM.Skbg1.PInwuLXNvAD0RRCNstXN6hjEQBCv1S6',
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
