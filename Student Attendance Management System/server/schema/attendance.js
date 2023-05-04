import mongoose from 'mongoose'

const AttendanceSchema=new mongoose.Schema({
    department:{
        type:String,
        required:true,
    },
    batch:{
         type:String,
        required:true,
    },
    section:{
        type:String,
        required:true,
    },
    semester:{
        type:Number,
        required:true,
    },
    dayorder:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    month:{
        type:Number,
        required:true,
    },
    year:{
        type:Number,
        required:true,
    },
    attendance:[{
            type:String,
            required:true
        } ]       
    })

const AttendanceModel=mongoose.model('attendance',AttendanceSchema);

export default AttendanceModel;