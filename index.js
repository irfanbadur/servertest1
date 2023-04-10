import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./Routers/userRouter.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ extended: false, limit: '50mb' }));


app.get("/",(req,res)=>{
    res.send("Merhaba benim dünyacığım2.")
})

app.listen(process.env.PORT||5000,()=>{
    console.log("Server")
})