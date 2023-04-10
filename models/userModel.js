import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, 
    userType: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    MuellifAdiSoyad: {
        type: String,
      //  required: true
    },
    OdaNo: {
        type: String,
      //  required: true
    },
    BuroNo: {
        type: String,
      //  required: true
    },
    DiplomaNo: {
        type: String,
      //  required: true
    },
    MuelllifTelefonNo: {
        type: String,
      //  required: true
    },
    Firma: {
        type: String,
     //   required: true
    },
    vergiDairesi: {
        type: String,
      //  required: true
    },
    vergiNo: {
        type: String,
     //   required: true
    },
    Adresi: {
        type: String,
     //   required: true    
    },
    FirmaTelefonNo: {
        type: String,
     //   required: true
    },
    phoneNumber: {
        type: String,
     //   required: true
    },
})

export default mongoose.model('User', userSchema)