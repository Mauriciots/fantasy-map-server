'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('favorites', {
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
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED,
        },
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('favorites');
  },
};
