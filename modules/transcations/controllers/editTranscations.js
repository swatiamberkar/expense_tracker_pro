const mongoose = require("mongoose")
const validator = require("validator")

const editTranscations = async (req, res) => {

    const { transcation_id, remarks, amount, transcation_type } = req.body


    // VALIDATIONS
    if (!transcation_id) throw "Transcation id is required!"

    if (!validator.isMongoId(transcation_id.toString())) throw "Please provide a valid ID."

    if (transcation_type !== "income" && transcation_type !== "expense") throw "Transcation type must be income or expense!"



    // MongoDB
    const transactionsModel = mongoose.model('transactions')

    const getTranscation = await transactionsModel.findOne({
        _id: transcation_id
    })

    if (!getTranscation) throw "Transcation not found!"

    await transactionsModel.updateOne(
        {
            _id: transcation_id
        },
        {
            remarks,
            amount,
            transcation_type
        },
        {
            runValidators: true
        }
    )






    //Success
    res.status(200).json({
        status: "Transcation updated successfully!",
        // data : transcations
    })

}

module.exports = editTranscations