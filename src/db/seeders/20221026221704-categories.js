'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'categories',
      [
        { name: 'Active Life', picture: 'https://via.placeholder.com/120' },
        { name: 'Restaurants', picture: 'https://via.placeholder.com/120' },
        { name: 'Shopping', picture: 'https://via.placeholder.com/120' },
        { name: 'Nightlife', picture: 'https://via.placeholder.com/120' },
        { name: 'Beauty', picture: 'https://via.placeholder.com/120' },
        { name: 'Pets', picture: 'https://via.placeholder.com/120' },
        { name: 'Bars & Pubs', picture: 'https://via.placeholder.com/120' },
        { name: 'Sightseeing', picture: 'https://via.placeholder.com/120' },
        { name: 'Religious', picture: 'https://via.placeholder.com/120' },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
