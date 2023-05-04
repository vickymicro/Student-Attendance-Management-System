import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken';
import StaffModel from '../schema/staff.js';
import AdminModel from "../schema/admin.js";
import DepartmentModel from '../schema/department.js';
import StudentModel from '../schema/student.js';
import BooastuprequestModel from '../schema/booastuprequest.js';
import BooastupModel from '../schema/schema.js';

const Register=async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;

    try {
        const exist_user = await AdminModel.findOne({ email: email })
        if (exist_user) return res.send("User Already Exist")
        const gen_salt = 10;
        bcrypt.hash(password, gen_salt, async function (err, hash) {
            const data = await AdminModel.insertMany({
                email:email,
                password: hash,
                role: role
            })
            if (data) return res.send('User Registered Successfully')
        })
    } catch (error) {
        return res.send(error.message)
    }

}

const Login=async(req,res)=>{
let email = req.body.email;
let password = req.body.password;
    try {
        const data = await AdminModel.findOne({ email: email })
        console.log(data);
        if(!data){
            return res.send("Invalid Email")
        }
        if (data) {
            bcrypt.compare(password, data.password, async function (err, user) {
                if (err) {
                    return res.send(err);
                }
                if(!user){
                    return res.send("Invalid Password")
                }
                else{
                     // const token = jwt.sign({ _id: data._id }, '' + process.env.SECRET_KEY)
                     const admin=data.isAdmin
                     const token=await jwt.sign({isAdmin:admin},process.env.JWT_KEY)
                     console.log(token);
                     console.log("Login success");
                      return res.header('token',token).json({message:"login successfully",token:token})
                     
                }
                console.log(user);   
            })
        }
        else {
            return res.send("User Not Found!")
        }
    } catch (error) {
        console.log(error);
        return res.send(error.message)
    }
}
const Authenticate =(req,res)=>{
    res.send("Login successfully");
}

const getProfile=async(req, res)=>{
    let email=req.body.email;
    try {
     let result= await AdminModel.findOne({ email: email })
     if(!result){
       return res.status(200).send("don't exist user");
     }
    res.status(200).send(result)
    } catch (error) {
     res.status(400).send(error.message)
    }
}


const Adddepartment=async(req,res)=>{
    let department = req.body.department;
    let deptshortname = req.body.deptshortname;

    try {
        const exist_department = await DepartmentModel.findOne({ department: department })
        if (exist_department) return res.send("Department Already Exist")
        
       
            const data = await DepartmentModel.insertMany({
                department:department,
                deptshortname:deptshortname
            })
            if (data) return res.send('Department Added Successfully')
        
    } catch (error) {
        return res.send(error.message)
    }

}
const getAlldepartment=async(req, res)=>{
    try {
     let result=await DepartmentModel.find();
     res.status(200).send(result)
    } catch (error) {
     res.status(400).send(error.message)
    }
}

const facultySearch=async(req, res)=>{
    console.log("run");
    let value=String(req.body.value);
    console.log(value);
    try {
     let result=await StaffModel.find({
        $or: [
            {
                name: value
            },
            {
                department: value
            }
        ]
    });
     res.status(200).send(result)
    } catch (error) {
     res.status(400).send(error.message)
    }
}

const studentSearch=async(req, res)=>{
    console.log("run");
    let value=String(req.body.value);
    console.log(value);
    try {
     let result=await StudentModel.find({
        $or: [
            {
                name: value
            },
            {
                regno: value
            },
            {
                department: value
            }
        ]
    });
     res.status(200).send(result)
    } catch (error) {
     res.status(400).send(error.message)
    }
}

const departmentSearch=async(req, res)=>{
    console.log("run");
    let value=String(req.body.value);
    console.log(value);
    try {
     let result=await DepartmentModel.find({
        $or: [
            {
                department: value
            },
            {
                deptshortname: value
            }
           
        ]
    });
     res.status(200).send(result)
    } catch (error) {
     res.status(400).send(error.message)
    }
}


const Update=async (req, res) => {
    try {
        const date=new Date()
 
        let update=await Fine.findOneAndUpdate({_id:req.body.id},{$set:{status:req.body.status,Datepayment:date,amount:req.body.amount}},{new:true})

        res.send(update)

    } catch (error) {
        res.status(400).send(error.message)
    }
}
const Delete=async (req, res) => {
    let value=req.body.name
    console.log(value);
    try {
 
      let result=await StaffModel.deleteOne({name:value})
      console.log(result);
        res.send("Deleted Successfully");

    } catch (error) {
        res.status(400).send(error.message)
    }
}

const studentDelete=async (req, res) => {
    let value=req.body.regno
    console.log(value);
    try {
 
      let result=await StudentModel.deleteOne({regno:value})
      console.log(result);
        res.send("Deleted Successfully");

    } catch (error) {
        res.status(400).send(error.message)
    }
}

const departmentDelete=async (req, res) => {
    let value=req.body.dept
    console.log(value);
    try {
 
      let result=await DepartmentModel.deleteOne({deptshortname:value})
      console.log(result);
        res.send("Deleted Successfully");

    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getBooastupapproval=async(req, res)=>{
   
    try {
     let result= await BooastuprequestModel.find()
     if(!result){
       return res.status(200).send("don't exist user");
     }
    res.status(200).json({data:result,message:"fetch successfully"})
    } catch (error) {
     res.status(400).send(error.message)
    }
}

const booastupapprovalDelete=async (req, res) => {
    let value=req.body.regno
    console.log(value);
    try {
 
      let result=await BooastuprequestModel.deleteOne({regno:value})
      console.log(result);
        res.send("Deleted Successfully");

    } catch (error) {
        res.status(400).send(error.message)
    }
}

const addBooastup=async(req,res)=>{
    let regno=req.body.regno;
    let presentdays=req.body.presentdays; 
    let percentage =req.body.percentage;

    try {
        const update_attendance = await BooastupModel.findOneAndUpdate({ regno:regno},{"presentdays":presentdays,"percentage":percentage},{new:true})
            if (update_attendance) return res.json({message:'Attendance Booastup Updated Successfully'})
        
    } catch (error) {
        console.log(error.message);
        return res.send(error.message)
    }

}




 export default {Login,Register,Authenticate,Adddepartment,getAlldepartment,facultySearch,studentSearch,departmentSearch,Update,Delete,studentDelete,departmentDelete,getProfile,getBooastupapproval,booastupapprovalDelete,addBooastup};