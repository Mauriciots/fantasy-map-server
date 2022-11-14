'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'places',
      [
        {
          name: 'Kitsilano Beach Basketball Courts',
          address: '1499 Arbutus St, Vancouver, BC V6J 5N2',
          description: 'Public court in front of the ocean',
          picture: 'https://kitsfest.com/wp-content/uploads/2013/05/brempong-sm.jpg',
          userId: 2,
          latitude: 49.27255272638686,
          longitude: -123.15266690720541,
          deleted: false,
        },
        {
          name: 'Chinatown craaazy court',
          address: '1200 Hastings St., Vancouver, BC 3M3 5N2',
          description: 'The craziest court in Chinatown',
          picture: 'https://kitsfest.com/wp-content/uploads/2013/05/brempong-sm.jpg',
          userId: 2,
          latitude: 49.27751469250019,
          longitude: -123.10111132731328,
          deleted: false,
        },
        {
          name: 'Costco Basketball Court',
          address: '1000 Main St, Vancouver, BC V66 5NN',
          description: 'You can play and then have some cheap hotdogs...',
          picture: 'https://kitsfest.com/wp-content/uploads/2013/05/brempong-sm.jpg',
          userId: 2,
          latitude: 49.278757619791826,
          longitude: -123.10944024551479,
          deleted: false,
        },
        {
          name: 'Eri Wine Store',
          address: '123 Sherbrooke, Vancouver, BC 3M3 Y67',
          description: 'Best wine store in town',
          picture: 'https://kitsfest.com/wp-content/uploads/2013/05/brempong-sm.jpg',
          userId: 1,
          latitude: 49.22509073104125,
          longitude: -123.08147945968294,
          deleted: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('places', null, {});
  },
};
