'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false,
      },
      birthPlace: {
        type: Sequelize.STRING,
        allowNull: true
      },
      birthDate: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
          type: Sequelize.STRING,
          allowNull: true,
      },
      sex: {
          type: Sequelize.INTEGER,
          allowNull: true
      },
      salutation: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      isMarried: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      identityType: {
          type: Sequelize.INTEGER,
          allowNull: true,
      },
      identityId: {
          type: Sequelize.STRING,
          allowNull: true,
      },
      religion: {
        type: Sequelize.INTEGER,
        allowNull: true
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('patients');
  }
};