import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken';
import StudentModel from '../schema/student.js';


const Register=async(req,res)=>{
    let name = req.body.name;
    let dob = req.body.dob;
    let gender = req.body.gender;
    let regno = req.body.regno;
    let department = req.body.department;
    let section = req.body.section;
    let batch = req.body.batch;
    let phoneno = req.body.phoneno;
    let email = req.body.email;
    let password = req.body.password;

    try {
        const exist_user = await StudentModel.findOne({ email: email })
        if (exist_user) return res.send("User Already Exist")
            const data = await StudentModel.insertMany({
                name:name,
                dob:dob,
                gender:gender,
                regno:regno,
                department:department,
                section:section,
                batch:batch,
                phoneno:phoneno,
                email:email
            })
            if (data) return res.send('Student Registered Successfully')
        
    } catch (error) {
        return res.send(error.message)
    }

}

const getAllstudent=async(req, res)=>{
    try {
     let result=await StudentModel.find();
     res.status(200).send(result)
    } catch (error) {
     res.status(400).send(error.message)
    }
}



 export default {Register,getAllstudent};