const mongoose = require("mongoose");
const emailManager = require("../../../managers/emailManager");

const forgotPassword = async (req, res) => {

    const { email } = req.body;

    // validations...
    if (!email) throw "Email is required!"

    const userModel = mongoose.model('users')
    const getUser = await userModel.findOne({
        email: email
    })
    if (!getUser) throw "This email does not exist in the system."


    const resetCode = Math.floor(10000 + Math.random() * 90000)
    await userModel.updateOne(
        {
            email: email
        },
        {
            reset_code: resetCode
        },
        {
            runValidators: true
        }
    )



    //Mail
    const to = email
    const text = "Your password reset code is " + resetCode
    const html = "Your password reset code is " + resetCode
    const subject = "Reset your password - Expense Tracker PRO! "

    await emailManager(to, text, html, subject)





    res.status(200).json({
        status: "Reset code sent to email successfully!"
    })
}

module.exports = forgotPassword