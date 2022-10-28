'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('list_place', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      placeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'places',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED,
        },
      },
      listId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'lists',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED,
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('list_place');
  },
};
