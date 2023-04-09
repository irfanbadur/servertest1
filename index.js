import express from "express";
const app=express();
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Merhaba benim dünyam")
})

app.listen(process.env.PORT||5000,()=>{
    console.log("Server")
})