require('express-async-errors')
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require('./modules/users/users.routes');
const register = require('./modules/users/controllers/register');
const errorHandler = require('./handlers/errorHandler');
const transcationRoutes = require('./modules/transcations/transcations.routes');
const cors = require("cors")



// mongodb
require("dotenv").config();
// connection to mongodb
mongoose.connect(process.env.mongo_connetcion, {})
.then(() => {
    console.log("Connection to mongodb successful!");
})
.catch(() => {
    console.log("Error with mongodb connection.");
})




// Create server
const app = express();
app.use(cors())
app.use(express.json())




// Model initialization
require('./models/user.model')
require('./models/transactions.model')




// Routes...
app.use("/api/users", userRoutes)
app.use("/api/transcations", transcationRoutes)



app.all("*", (req, res, next)=>{
    res.status(404).json({
        status : "Failed",
        message : "Not found!"
    })
})
//End of all routes
app.use(errorHandler)




app.listen(8000, () => {
    console.log("Server started successfully.");
})