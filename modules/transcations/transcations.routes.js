const express = require("express") 
const auth = require("../../middleware/auth");
const addIncome = require("./controllers/addIncome");
const addExpense = require("./controllers/addExpense");
const getTranscation = require("./controllers/getTranscations");
const deleteTranscations = require("./controllers/deleteTranscations");
const editTranscations = require("./controllers/editTranscations");


//Create Router
const transcationRoutes = express.Router();


// Apply auth middleware
transcationRoutes.use(auth)
//Routes..
transcationRoutes.post("/addIncome", addIncome)
transcationRoutes.post("/addExpense", addExpense)
transcationRoutes.get("/", getTranscation)

transcationRoutes.delete("/:transcation_id", deleteTranscations)
transcationRoutes.patch("/", editTranscations)

module.exports = transcationRoutes