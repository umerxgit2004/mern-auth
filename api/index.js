import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import e from 'express'
dotenv.config()
mongoose.connect(process.env.MONGO)
.then(() => {
    console.log("Connected to MongoDb")
})
.catch ((err)=>{
    console.log(err)
})
const app = express()

app.listen(3001,()=>{console.log("server running on Port 3001")})