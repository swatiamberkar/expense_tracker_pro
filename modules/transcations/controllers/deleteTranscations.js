const mongoose = require("mongoose")
const validator = require("validator")

const deleteTranscations = async (req, res) => {

    const { transcation_id } = req.params



    // VAlidation
    if (!validator.isMongoId(transcation_id.toString())) throw "Please provide a valid ID."





    // MongoDB
    const transactionsModel = mongoose.model('transactions')
    const usersModel = mongoose.model('users')

    const getTranscation = await transactionsModel.findOne({
        _id: transcation_id
    })

    if (!getTranscation) throw "Transcation not found!"


    await transactionsModel.deleteOne({
        _id: transcation_id
    })

    if (getTranscation.transcation_type === "income") {
        // income login here
        await usersModel.updateOne(
            {
                _id: getTranscation.user_id
            },
            {
                $inc: {
                    balance: getTranscation.amount * -1
                }
            },
            {
                runValidators: true
            }
        )
    } else {
        // expense login here
        await usersModel.updateOne(
            {
                _id: getTranscation.user_id
            },
            {
                $inc: {
                    balance: getTranscation.amount
                }
            },
            {
                runValidators: true
            }
        )
    }






    //Success
    res.status(200).json({
        status: "Success",
        // data : transcations
    })

}

module.exports = deleteTranscations