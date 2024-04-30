const mongoose = require("mongoose")

const getTranscation = async (req, res) => {


    //MongoDB
    
    const transactionsModel = mongoose.model('transactions')

    const transcations =  await transactionsModel.find({
        user_id: req.user._id,
       // transcation_type: "income",
        ...req.query
    })




    //Success
    res.status(200).json({
        status: "Success",
        data : transcations
    })
}

module.exports = getTranscation