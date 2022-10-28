'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'favorites',
      [
        {
          userId: 1,
          placeId: 1,
        },
        {
          userId: 1,
          placeId: 4,
        },
        {
          userId: 2,
          placeId: 1,
        },
        {
          userId: 2,
          placeId: 2,
        },
        {
          userId: 2,
          placeId: 3,
        },
        {
          userId: 2,
          placeId: 4,
        },
        {
          userId: 3,
          placeId: 1,
        },
        {
          userId: 3,
          placeId: 2,
        },
        {
          userId: 3,
          placeId: 3,
        },
        {
          userId: 3,
          placeId: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('favorites', null, {});
  },
};
