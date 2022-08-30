"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try{
      await queryInterface.addColumn(
        "students",
         "address", {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "peshawar",
        },
        {transaction},
        );
        await queryInterface.addColumn(
          "students",
           "gender", {
            type:DataTypes.ENUM("Male", "Female"),
            allowNull:false,
            defaultValue:"male",
        },
          {transaction},
          );
          await transaction.commit();
    }catch(err){
      console.log(err);
      await transaction.rollback();
    }  
  },

  async down(queryInterface, Sequelize) {
    const transaction =await queryInterface.sequelize.transaction();
    try{
      await queryInterface.removeColumn("students", "address", {transaction});
      await queryInterface.removeColumn("students", "gender", {transaction});
      await transaction.commit();
    }catch(err){
      console.log(err);
      await transaction.rollback();
    }
  },
};
