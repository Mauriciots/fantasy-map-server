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
          userId: 2,
        },
        {
          name: 'Best places to buy wine',
          description: 'Come and see!',
          userId: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('lists', null, {});
  },
};
