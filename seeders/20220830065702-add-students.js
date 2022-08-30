'use strict';
const bcrypt = require("bcryptjs");
const moment = require("moment");
const {Students} = require("../models");

module.exports = {
  async up (queryInterface, Sequelize) {
    const hash = await bcrypt.hash('password',10);
    const students = [];
    for( let i =0; i<25; i++){
      students.push({
        name: `student${i+1}`,
        email:`student${i+1}@gmail.com`,
        password:hash,
        address: 'peshawar',
        gender : 'male',
        createdAt: moment().unix(),
        updatedAt: moment().unix(),
      })
    }
    await queryInterface.bulkInsert('students',students,{})
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('students', null, {});
  }
};
