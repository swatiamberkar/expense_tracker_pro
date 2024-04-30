const mongoose = require("mongoose")
const validator = require("validator")

const addIncome = async (req, res) => {

    const { amount, remarks } = req.body



    // validations
    if (!validator.isNumeric(amount.toString())) throw "Amount must be valid number!"
    if (!amount) throw "Amount is required!"
    if (amount < 0) throw "Amount must not be negative!"
    if (!remarks) throw "Remarks is required!"
    if (remarks.length < 5) throw "Remarks must be at least 5 characters long"




    //MongoDB
    const usersModel = mongoose.model('users')
    const transactionsModel = mongoose.model('transactions')

    await transactionsModel.create({
        user_id: req.user._id,
        amount: amount,
        remarks: remarks,
        transcation_type: "income"
    })


    await usersModel.updateOne(
        {
            _id: req.user._id,
        },
        {
            $inc: {
                balance: amount,
            }
        },
        {
            validator: true
        }
    )







    //Success
    res.status(200).json({
        status: "Success",
        message: "Income Added Successfully!"
    })
}

module.exports = addIncome