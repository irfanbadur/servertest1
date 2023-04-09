import express from "express";
const app=express();
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hello my World")
})

app.listen(process.env.PORT||5000,()=>{
    console.log("Server")
})