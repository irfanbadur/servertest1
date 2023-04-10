import mongoose from 'mongoose'

const ProjeTaslakSchema = mongoose.Schema({
    projectOwnerUser: {
        type: String,
        required: true
    },
    projectNo: {
        type: String,
        required: true
    },
    customer: {
        type: String,
        
    },
    createDate: {
        type: Date,
        default:new Date()
    },
    arsaAdi: {
        type: String,
    },
    arsaAdresi: {
        type: String,
    },
    arsaIl: {
        type: String,
    },
    arsaIlce: {
        type: String,
    },
    arsaMah: {
        type: String,
    },
    arsaSok: {
        type: String,
    },
    arsaCadde: {
        type: String,
    },
    arsaNo: {
        type: String,
    },
    arsaAda: {
        type: String,
    },
    arsaPafta: {
        type: String,
    },
    arsaParsel: {
        type: String,
    },
    kullanimAmaci: {
        type: String,
    },
    katSayisi: {
        type: String,
    },
    yapiSinifi: {
        type: String,
    },
    yapimSuresi: {
        type: String,
    },
    alan: {
        type: String,
    },
    bagBolSay: {
        type: String,
    },
    yaptiranAdi: {
        type: String,
    },
    yaptiranAdres: {
        type: String,
    },
    yaptiranVergiDairesi: {
        type: String,
    },
    yaptiranVergiNo : {
        type: String,
    },

})

export default mongoose.model('ProjectTemplate', ProjeTaslakSchema)