'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'list_place',
      [
        {
          listId: 1,
          placeId: 1,
        },
        {
          listId: 1,
          placeId: 2,
        },
        {
          listId: 1,
          placeId: 3,
        },
        {
          listId: 2,
          placeId: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('list_place', null, {});
  },
};
