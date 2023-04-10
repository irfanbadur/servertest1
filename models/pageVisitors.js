import mongoose from 'mongoose'

const visitorsSchema = mongoose.Schema({

    ID: {
        type: String,
        default:"pageVisitorsData"
     },
    toplamZiyaret: {
        type: Number,
     },
     localAddress: {
        type: Array,
     } 
 
})

export default mongoose.model('Visitors', visitorsSchema)