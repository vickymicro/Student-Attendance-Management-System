import mongoose from 'mongoose'

const StaffSchema=new mongoose.Schema({
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
    qualification:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    phoneno:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isStaff:{
        type:Boolean,
        default:true
    }

})

const StaffModel=mongoose.model('staffusers',StaffSchema);

export default StaffModel;