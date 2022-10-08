'use strict';

const { bcryptPassword } = require("../../helpers/bcrypt");
const { ADMIN_ID } = require("../../helpers/Constant/roleConstant");
const { MALE_ID } = require("../../helpers/Constant/sexConstant");
const { ACTIVE_ID } = require("../../helpers/Constant/statusConstant");
const { default: Admins } = require("../models/admins");
const { default: Users } = require("../models/user");

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        email: 'superadmin@gmail.com',
        password: await bcryptPassword('rahasia'),
        role: ADMIN_ID,
        status: ACTIVE_ID,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    const courses = await queryInterface.sequelize.query(
      `SELECT id from users;`
    );

    const courseRows = courses[0];

    await queryInterface.bulkInsert('admins', [
      {
        userId: courseRows[0].id,
        name: 'Super Admin',
        phone: '085290828518',
        address: 'Kuta Bali',
        sex: MALE_ID,
        createdBy: 'superadmin@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('users', null, {});
     await queryInterface.bulkDelete('admins', null, {});
  }
};
