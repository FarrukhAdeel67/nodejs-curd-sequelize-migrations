const Sequelize = require("sequelize");
const Students = require("../models/student");
const sequelize = require("../models/index");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const bcrypt = require("bcryptjs");
async function post(req, res) {
  try {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    var hashedPassword = await bcrypt.hashSync(password, salt);
    if (!name || !email) {
      return res.status(400).send("Required Fields cannot be empty");
    }
    const emailFound = await Students.findOne({
      where: { email: email },
    });
    if (emailFound) {
      return res.status(400).send("email Already exists...");
    }
    const student = await Students.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(200).send({ studentCreated: student });
    console.log({ student });
  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong...");
  }
}
async function getAll(req, res) {
  try {
    const students = await Students.findAll();
    res.status(200).send({ students });
  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong...");
  }
}
async function getSingle(req, res) {
  try {
    const { studentId } = req.params;
    console.log(studentId);
    const student = await Students.findByPk(studentId);
    res.status(200).send({ student });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong!");
  }
}
async function update(req, res) {
  try {
    const { name, email } = req.body;
    const { studentId } = req.params;
    if (!name || !email) {
      return res.status(400).send("name and email are required....");
    }
    const studentFound = Students.findOne({
      where: { id: studentId },
    });
    console.log(studentFound);
    const student = await Students.update(
      {
        name: name,
        email: email,
      },
      {
        where: { id: studentId },
        individualHooks: true,
      }
    );
    res.status(200).send({ student });
  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong....");
  }
}
async function deleteStudent(req, res) {
  try {
    const { studentId } = req.params;
    const student = await Students.destroy({
      where: { id: studentId },
    });
    res.status(200).send("student deleted successfully...");
  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong.....");
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Required fields cannot be empty!");
    }
    let key = await Students.findOne({
        where:{password},
    });
    if(!key){
        return res.status(404).send("incorrect password....");
    }
    let student = await Students.findOne({
      where: { email },
    });
    if (!student) {
      return res.status(404).send("email does not exists...");
    }
    const result = await bcrypt.compare( password, student.password,(err, result) => {
        if (err) {
          throw err;
        }
          student = student.toJSON();
          delete student.password;
          const token = jwt.sign({ student: student }, "first-token");
          res.send({token,student});    
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong....");
  }
}
module.exports = {
  post,
  getAll,
  getSingle,
  update,
  deleteStudent,
  login,
};
