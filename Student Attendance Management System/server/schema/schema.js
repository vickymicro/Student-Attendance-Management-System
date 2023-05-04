import mongoose from 'mongoose'

const BooastupSchema=new mongoose.Schema({
    
    regno:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    batch:{
        type:Number,
        required:true
    },
    semester:{
        type:Number,
        required:true
    },
    presentdays:{
        type:Number,
        required:true
    },
    workingdays:{
        type:Number,
        required:true
    },
    percentage:{
        type:Number,
        required:true
    }
   

})

const BooastupModel=mongoose.model('booastupusers',BooastupSchema);



export default BooastupModel;