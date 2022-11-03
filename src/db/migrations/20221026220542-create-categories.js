'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      picture: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('categories');
  },
};
