import express from "express";

import mongoose from "mongoose";
import MongoClient from 'mongodb'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js';
import ProjectTemplate from '../models/ProjeTaslak.js'
import MusteriDB from '../models/MusteriModel.js'
import Mesajlar from '../models/Mesajlar.js'

 
import Visitors from '../models/pageVisitors.js'

import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

router.post("/", async (req,res)=>{   
  
    console.log("Ana Sayfa")
    const localAdress= req.socket.localAddress
    const ziyaretler = await Visitors.find({ID:"pageVisitorsData"} )   

    let toplamZiyaret=      ziyaretler[0].toplamZiyaret+1
    let locals=             ziyaretler[0].localAddress
    let index=locals.indexOf(localAdress)
    if(index===-1){
        locals.push(localAdress)
    }
    try {
            const visitor = await Visitors.updateOne(
            { "ID": "pageVisitorsData"}, 
           { $set:  {
            "toplamZiyaret":toplamZiyaret ,
            "localAddress":locals,
            },
            })
        return res.status(200).json(visitor);
        } catch (error) {
            console.log(error)
            return res.json({message: "Hata"})
        }   

         
})
router.post("/test", async (req,res)=>{ 
    
    return res.send("Merhaba TEST post isteği")

})
router.get("/test", async (req,res)=>{ 
    
    return res.send({"deger":"Merhaba TEST post isteği","akim":23})

})

router.post("/signup", async (req, res)=>{
    console.log("SIGN IN POST")
    try {
         
        const { fullname, password, phoneNumber, email } = req.body;
        
        const userExists = await User.findOne({ email })
        if(userExists)
            return res.status(400).json({ message: 'User already exists.'})

        const hashedPassword = await bcrypt.hash(password, 10)

        const createdUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
        })
        return res.status(201).json(createdUser);
    } catch (error) {
        console.log(error)
        return res.json({message: "create user failed"})
    }
})
router.post("/deleteproject", async (req, res)=>{
     
    try {
    const deletedProject = await ProjectTemplate.deleteOne(req.body )
    return res.status(201).json({ message: "proje silindi"});
    } catch (error) {
        console.log(error)
        return res.json({message: "project couldn't delete"})
    }
 
    
})
router.post("/updateproject", async (req, res)=>{    
   
    try {
    const { ID,projectOwnerUser, projectNo, customer, arsaAdi,arsaAdresi,arsaIl,arsaIlce,
        arsaMah,arsaSok,arsaCadde,arsaNo,arsaAda,arsaPafta,arsaParsel,
        yaptiranAdi,yaptiranAdres,yaptiranVergiDairesi,yaptiranVergiNo,
        projeNo,bagBolSay,alan,yapimSuresi,yapiSinifi,katSayisi,kullanimAmaci } = req.body.updatedProject;
         const updatedTemplate = await ProjectTemplate.updateOne(
        { "_id": ID}, 
       { $set:  {"arsaAdresi":arsaAdresi ,
            "projectNo":"3",
            "customer":customer,
            "arsaAdi":arsaAdi,
            "arsaAdresi":arsaAdresi,
            "arsaIl":arsaIl},
        })
    return res.status(200).json(updatedTemplate);
    } catch (error) {
        console.log(error)
        return res.json({message: "project couldn't delete"})
    } 
    
})
  router.post("/updatemuellif", async (req, res)=>{    
     const { ID,fullname, email, password, phoneNumber,BuroNo,MuellifAdiSoyad,OdaNo,DiplomaNo,
        MuelllifTelefonNo,Firma,vergiDairesi,vergiNo,Adresi,FirmaTelefonNo } = req.body;
        const updatedUser=  await User.findByIdAndUpdate(
            ID , 
            {     
                fullname:fullname,
                email:email,
                password:password,
                userType:'USER',
                phoneNumber:phoneNumber, 
                MuellifAdiSoyad:MuellifAdiSoyad,
                OdaNo:OdaNo,
                BuroNo:BuroNo,
                DiplomaNo:DiplomaNo, 
                MuelllifTelefonNo:MuelllifTelefonNo,
                Firma:Firma,
                vergiDairesi:vergiDairesi,
                vergiNo:vergiNo,
                Adresi:Adresi,
                FirmaTelefonNo:FirmaTelefonNo,              
             
           }
           ).then((error,user)=>{
               console.log(error,"USER",user) 
               return res.status(200).json(error);
 
           }) 

   
    
})  
//-------------------------------------------------------------------------------------
router.post("/signin", async (req,res)=>{
    console.log("SIGN IN PSOT")
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email})

        if(!user)
            return res.status(400).json({message: "user does not exist"})
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect)
            return res.status(400).json({message: "Wrong Password"})
        const deneme=await ProjectTemplate.find({email})

        return  res.status(200).json({ user,deneme, message: 'Authentication successful' })
      
        
    } catch (error) {       
        return res.status(400).json({ message: error.message })
    }
})
router.post("/admin", async ({},res)=>{
    
    try {
        
        const userList = await User.find()        
        return res.status(200).json({userList, message: 'Tüm kullanıcılar listesi' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

router.post("/user", async (req,res)=>{
    try {        
        const user = await User.findById(req.body.id)    
     
        return res.status(200).json(user )
    } catch (error) {
        return res.status(400).json({ message: error.message })
     }
})
router.get("/adminVisitors", async (req,res)=>{ 
    try {
        
        const ziyaretler = await Visitors.find()        
        return res.status(200).json({ziyaretler  ,message:"visitors"})

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})
router.get("/admin", async (req,res)=>{ 
    try {                    
        const userList = await User.find()        
        return res.status(200).json({userList, message: 'Tüm kullanıcılar listesi' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})
router.post("/test", async (req,res)=>{ 
    
        return res.send("Merhaba TEST post isteği")
    
})
router.post("/ProjeTaslak", async (req, res)=>{
    try {
        const { projectOwnerUser, projectNo, customer, arsaAdi,arsaAdresi,arsaIl,arsaIlce,
        arsaMah,arsaSok,arsaCadde,arsaNo,arsaAda,arsaPafta,arsaParsel,
        yaptiranAdi,yaptiranAdres,yaptiranVergiDairesi,yaptiranVergiNo,
        projeNo,bagBolSay,alan,yapimSuresi,yapiSinifi,katSayisi,kullanimAmaci } = req.body;
        const createdProjectTemplate = await ProjectTemplate.create({
            projectOwnerUser:projectOwnerUser,
            projectNo:"3",
            customer:customer,
            arsaAdi:arsaAdi,
            arsaAdresi:arsaAdresi,
            arsaIl:arsaIl,
            arsaIlce:arsaIlce,
            arsaMah:arsaMah,
            arsaSok:arsaSok,
            arsaCadde:arsaCadde,
            arsaNo:arsaNo,
            arsaAda:arsaAda,
            arsaPafta:arsaPafta,
            arsaParsel:arsaParsel,
            yaptiranAdi:yaptiranAdi,
            yaptiranAdres:yaptiranAdres,
            yaptiranVergiDairesi:yaptiranVergiDairesi,
            yaptiranVergiNo:yaptiranVergiNo,
            projeNo:projeNo,
            bagBolSay:bagBolSay,
            alan:alan,
            yapimSuresi:yapimSuresi,
            yapiSinifi:yapiSinifi,
            katSayisi:katSayisi,
            kullanimAmaci:kullanimAmaci
        })
        return res.status(201).json(createdProjectTemplate);
    } catch (error) {
        console.log(error)
        return res.json({message: "create Project Template failed"})
    }
}) 
router.post("/addCustomer", async (req, res)=>{
    try {
        const { isimSoyisim, firma, cepTel, isTel,email1,email2,adres,
        vergiDaire,vergiNo,notlar} = req.body;
        const Musteri = await MusteriDB.create({
            isimSoyisim:isimSoyisim,
            firma:firma,
            cepTel:cepTel,
            isTel:isTel,
            email1:email1,
            email2:email2,
            adres:adres,
            vergiDaire:vergiDaire,
            vergiNo:vergiNo,
            notlar:notlar 
        })
        return res.status(201).json(Musteri);
    } catch (error) {
        console.log(error)
        return res.json({message: "create Project Template failed"})
    }
}) 
router.get("/myProjects", async (req, res)=>{
    try {

        const myProjectList = await ProjectTemplate.find({projectOwnerUser:"persembe@gmail.com"} )        
        return res.status(200).json({myProjectList, message: 'Tüm Projelerin listesi' })
      
    } catch (error) {
        return res.json({error,message: "create Project Template failed"})
    }
}) 
router.post("/message", async (req, res)=>{
    try {
        const { name, msg, email, tel,konu,file } = req.body;
        const mesaj = await Mesajlar.create({
            name:name,
            msg:msg,
            konu:konu,
            file:file,
            email:email,
            tel:tel,
        })
        return res.status(201).json(mesaj);
    } catch (error) {
        console.log(error)
        return res.json({message: "create Project Template failed"})
    }
}) 
router.get("/messages", async (req, res)=>{
    try {

        const mesajlar = await Mesajlar.find( )        
        return res.status(200).json({mesajlar,message: 'Tüm mesajlar listesi'})
      
    } catch (error) {
        return res.json({error,message: "create Project Template failed"})
    }
}) 
   
export default router;