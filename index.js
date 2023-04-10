import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./Routers/userRouter.js";
import cors from "cors";

 
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ extended: false, limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }));

app.use("/users", userRouter); 
app.get("/",(req,res)=>{
    res.send("Merhaba benim dünyacık3234.")
})

app.listen(process.env.PORT||5000,()=>{
    console.log("Server")
})