const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken');
const jwtManager = require("../../../managers/jwtManager");
const emailManager = require("../../../managers/emailManager");

const register = async (req, res) => {

  const userModel = mongoose.model('users')
  const { email, password, confirm_password, name, balance } = req.body;

  // validations...
  if (!email) throw "Email must be provided!"
  if (!password) throw "Password must be provided!"
  if (password.length < 5) throw "Password must be at least 5 character long."
  if (password !== confirm_password) throw "Password and comfirm password does not match!"
  if (!name) throw "Name must be provided!"


  const getDuplicateEmail = await userModel.findOne({
    email: email
  })

  if (getDuplicateEmail) throw "This email already exists!"


  const hashedPassword = await bcrypt.hash(password, 12)

  const createdUser = await userModel.create({
    name: name,
    email: email,
    password: hashedPassword,
    balance: balance
  })



  //JWT
  const accessToken = jwtManager(createdUser)






  //Mail
  const to = createdUser
  const text = "Welcome to expense tracker PRO. We hope you can manage your expense easily from our platform!"
  const html = "<h1>Welcome to expense tracker PRO. </h1> <br/> <br/>We hope you can manage your expense easily from our platform!"
  const subject = "Welcome to Expense Tracker PRO! "

  await emailManager(to, text, html, subject)





  res.status(201).json({
    status: "User register successfully!",
    accessToken: accessToken
  })
}

module.exports = register