'use strict';
const {DataTypes} = require('sequelize');
const moment  = require("moment");
const bcrypt = require("bcryptjs");
const table = 'students'
module.exports = {
   up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable(table,{
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },name:{
        type: DataTypes.STRING,
        allowNull: false,
    },email:{
        type: DataTypes.STRING,
        allowNull: false,
    },password:{
        type: DataTypes.STRING,
        allowNull: false,
    },createdAt:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },updatedAt:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    });
  
  },

   down: (queryInterface)=> {
    return queryInterface.dropTable('students');
  }
};
