'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'categories',
      [
        { name: 'Active Life' },
        { name: 'Restaurants' },
        { name: 'Shopping' },
        { name: 'Nightlife' },
        { name: 'Beauty' },
        { name: 'Pets' },
        { name: 'Bars & Pubs' },
        { name: 'Sightseeing' },
        { name: 'Religious' },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
