'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'reviews',
      [
        {
          content: 'Definitely the best place to play in the neighbourhood!',
          stars: 5,
          userId: 3,
          placeId: 1,
        },
        {
          content: 'I dont like basketball... what is the point..!?',
          stars: 2,
          userId: 1,
          placeId: 1,
        },
        {
          content:
            'I had so much wine, I dont remember, but probably it is nice place',
          stars: 5,
          userId: 3,
          placeId: 4,
        },
        {
          stars: 5,
          userId: 1,
          placeId: 4,
        },
        {
          stars: 5,
          userId: 2,
          placeId: 2,
        },
        {
          stars: 5,
          userId: 2,
          placeId: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reviews', null, {});
  },
};
