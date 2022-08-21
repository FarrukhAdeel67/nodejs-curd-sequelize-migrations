const {DataTypes} = require('sequelize');
const sequelize = require('./index');
const moment = require("moment");
const bcrypt = require('bcryptjs');
const tableName = 'students';
const  Students = sequelize.define(tableName,{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement: true
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

Students.beforeCreate(async function (student){
     const salt = bcrypt.genSaltSync();
     var hashedPassword =student.password;
     hashedPassword =  await bcrypt.hashSync(student.password, salt);
    student.dataValues.createdAt = moment().unix();
    student.dataValues.updatedAt = moment().unix();
})
Students.beforeUpdate(async function  (student){
    student.dataValues.updatedAt = moment().unix();
})
module.exports = Students;