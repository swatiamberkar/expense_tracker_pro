const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken');
const jwtManager = require('../../../managers/jwtManager');

const login = async (req, res) => {
    const { email, password } = req.body;



    //MongoDB
    const usersModel = mongoose.model('users')
    const getUser = await usersModel.findOne({
        email: email
    })


    //Validations
    if (!getUser) throw "This email does not exist in system."

    const comparePassword = await bcrypt.compare(password, getUser.password)
    if (!comparePassword) throw "Email and Password do not match!"




    //JWT
    const accessToken = jwtManager(getUser)




    //Success
    res.status(200).json({
        status: "Success",
        message: "User login successfully!",
        accessToken: accessToken
    })

}

module.exports = login