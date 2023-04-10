import mongoose from 'mongoose'

const MusteriSchema = mongoose.Schema({
    isimSoyisim: {
        type: String,
        required: true
    },
    firma: {
        type: String,
        required: true
    },
    cepTel: {
        type: String,
        
    },
    isTel: {
        type: String,
       
    },
    email1: {
        type:String ,
    },
    email2: {
        type: String,
    },
    adres: {
        type: String,
    },
    vergiDaire: {
        type: String,
    },
    vergiNo: {
        type: String,
    }  ,

    notlar: {
        type: String,
    }   

})

export default mongoose.model('MusteriDB', MusteriSchema)