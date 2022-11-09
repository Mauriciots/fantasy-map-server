'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'lists',
      [
        {
          name: 'Best basketball courts',
          description: 'Find here the best basketball courts in Vancouver',
          picture: 'https://www.ctvnews.ca/content/dam/ctvnews/en/images/2020/12/3/basketball-court-1-5216003-1629825004731.jpg',
          userId: 2,
          categoryId: 1,
        },
        {
          name: 'Best places to buy wine',
          description: 'Come and see!',
          picture: 'https://ychef.files.bbci.co.uk/976x549/p0cwcj6m.jpg',
          userId: 1,
          categoryId: 7,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('lists', null, {});
  },
};
