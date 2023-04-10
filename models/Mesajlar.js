import mongoose from 'mongoose'

const MesajSchema = mongoose.Schema({
    name: {
        type: String,
        
    },
    konu: {
        type: String,
         
    },
    msg: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        
    
    },
    file: {
        type: String,
        
    },
    email: {
        type:String ,
    
    },
    createDate: {
        type: Date,
        default:new Date()
    },

})

export default mongoose.model('Mesajlar', MesajSchema)