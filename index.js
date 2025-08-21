
require('dotenv').config();
const express=require("express");
const app= express();
const connectDB= require("./utils/db");
const userRouter=require('./Routes/userRouter')
const port=5000;
app.use(express.json());
app.use("/user" , userRouter);

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log("Server is running on Port: ", port)
    })
})