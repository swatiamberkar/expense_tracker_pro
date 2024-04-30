const mongoose = require('mongoose')

const userDashboard = async (req, res) => {

    //Mongodb
    const usersModel = mongoose.model('users')
    const transactionsModel = mongoose.model('transactions')


    const getUser = await usersModel.find({
        _id: req.user._id
    }).
        select("-password")


    const transcations = await transactionsModel.find({
        user_id: req.user._id,
    })
        .sort("-createdAt")
        .limit(2)







    //success
    res.status(200).json({
        status: "Success",
        data: getUser,
        transcations
    })
}

module.exports = userDashboard