import mongoose from 'mongoose'

const AdminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:true
    }

})

const AdminModel=mongoose.model('adminusers',AdminSchema);

export default AdminModel;