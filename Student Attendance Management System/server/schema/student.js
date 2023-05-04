import mongoose from 'mongoose'

const StudentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
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
    phoneno:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const StudentModel=mongoose.model('studentusers',StudentSchema);

export default StudentModel;