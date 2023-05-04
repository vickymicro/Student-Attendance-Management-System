import mongoose from 'mongoose'

const DepartmentSchema=new mongoose.Schema({
    department:{
        type:String,
        required:true
    },
    deptshortname:{
        type:String,
        required:true
    }

})

const DepartmentModel=mongoose.model('department',DepartmentSchema);

export default DepartmentModel;