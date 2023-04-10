import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./Routers/userRouter.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Merhaba benim   dünyam.")
})

app.listen(process.env.PORT||5000,()=>{
    console.log("Server")
})