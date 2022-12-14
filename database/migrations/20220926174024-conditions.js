'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('conditions', { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING
        },
        description: {
          allowNull: true,
          type: Sequelize.TEXT
        },
        createdBy: {
          allowNull: false,
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE
        }
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('conditions');
  }
};
