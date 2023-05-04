import bcrypt from 'bcryptjs';
import  jwt  from 'jsonwebtoken';
import StaffModel from '../schema/staff.js';
import StudentModel from '../schema/student.js';
import AttendanceModel from '../schema/attendance.js';
import BooastupModel from '../schema/schema.js';
import BooastuprequestModel from '../schema/booastuprequest.js';

const Register=async(req,res)=>{
    let name = req.body.name;
    let dob = req.body.dob;
    let gender = req.body.gender;
    let qualification = req.body.qualification;
    let department = req.body.department;
    let phoneno = req.body.phoneno;
    let email = req.body.email;
    let password = req.body.password;

    try {
        const exist_user = await StaffModel.findOne({ email: email })
        if (exist_user) return res.send("Faculty Already Exist")
        const gen_salt = 10;
        bcrypt.hash(password, gen_salt, async function (err, hash) {
            const data = await StaffModel.insertMany({
                name:name,
                dob:dob,
                gender:gender,
                qualification:qualification,
                department:department,
                phoneno:phoneno,
                email:email,
                password: hash
            })
            if (data) return res.send('Faculty Registered Successfully')
        })
    } catch (error) {
        return res.send(error.message)
    }

}


const Login=async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
        try {
            const data = await StaffModel.findOne({ email: email })
            console.log(data);
            if(!data){
                return res.send("Invalid Email ")
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
                         const staff=data.isStaff
                         const token=await jwt.sign({isStaff:staff},process.env.JWT_KEY)
                         console.log("Login success");
                         return res.header('token',token).json({message:"login successfully",token:token});
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
         let result= await StaffModel.findOne({ email: email })
         if(!result){
           return res.status(200).send("don't exist user");
         }
        res.status(200).send(result)
        } catch (error) {
         res.status(400).send(error.message)
        }
    }
    
const getAllstaff=async(req, res)=>{
        try {
         let result=await StaffModel.find();
         res.status(200).send(result)
        } catch (error) {
         res.status(400).send(error.message)
        }
    }

    const getStudent=async(req, res)=>{
        let department=req.body.department;
        let batch =req.body.batch;
        let section=req.body.section
        try {
         let result=await StudentModel.find({department:department,batch:batch,section:section});
         console.log("1"+result);
         if(!result[0]){
           return res.status(200).send({message:"Dosn't exist Students"})
         }
         res.status(200).send({data:result,message:"fetch"})
        } catch (error) {
         res.status(400).json({message:error.message})
        }
    }

    const addAttendance=async(req,res)=>{
        let department=req.body.department;
        let batch =req.body.batch;
        let section=req.body.section;
        let semester=req.body.semester;
        let date=new Date(req.body.date);
        let dayorder=req.body.dayorder;
        let attendance=req.body.attendance;
        let d=date.getDate();
        let month=date.getMonth()+1;
        let year=date.getFullYear();
        console.log(date);
        console.log(d);
        console.log(month);
        console.log(year);

        try {
            const exist_attendance = await AttendanceModel.findOne({ department:department,batch:batch,section:section,date:date })
            if (exist_attendance) return res.send({message:"User Already Exist"})
                const data = await AttendanceModel.insertMany({
                    department:department,
                    batch:batch,
                    section:section,
                    semester:semester,
                    date:date,
                    month:month,
                    year:year,
                    dayorder:dayorder,
                    attendance:attendance
                })
                if (data) return res.send({message:'Attendance added Successfully'})
            
        } catch (error) {
            console.log(error.message);
            return res.send(error.message)
        }
    
    }

    const mlodStudent=async(req, res)=>{
        let regno=req.body.regno;
        try {
         let result=await StudentModel.findOne({regno:regno});
         if(!result){
           return  res.status(200).json({message:"Student doesn't exist"})
         }
         res.status(200).json({data:result,message:"fetch"})
        } catch (error) {
         res.status(400).send(error.message)
        }
    }
    const updateAttendance=async(req,res)=>{
        let regno=req.body.regno;
        let department=req.body.department;
        let batch =req.body.batch;
        let section=req.body.section;
        let date=req.body.date;

        try {
            const exist_attendance = await AttendanceModel.findOne({department:department,batch:batch,section:section,date:date,attendance:regno})
           
            if (exist_attendance) return res.json({message:"Attendance Already Exist"})
            const update_attendance = await AttendanceModel.findOneAndUpdate({ department:department,batch:batch,section:section,date:date},{ $addToSet:{"attendance":regno}},{new:true})
                if (update_attendance) return res.json({message:'Attendance Updated Successfully'})
            
        } catch (error) {
            console.log(error.message);
            return res.send(error.message)
        }
    
    }

    const BooastupReport=async(req, res)=>{
        let regno=req.body.regno;
        try {
         let result=await BooastupModel.findOne({regno:regno});
         if(!result){
           return  res.status(200).json({message:"Student doesn't exist"})
         }
         res.status(200).json({data:result,message:"fetch"})
        } catch (error) {
         res.status(400).send(error.message)
        }
    }

    const BooastupRequest=async(req, res)=>{
        let regno=req.body.regno;
        let department=req.body.department;
        let batch=req.body.batch;
        let section=req.body.section;
        let semester=req.body.semester;
        let presentdays=req.body.presentdays;
        let workingdays=req.body.workingdays;
        let percentage=req.body.percentage;
        try {
         let result=await BooastuprequestModel.findOne({regno:regno});
         if(result){
           return  res.status(200).json({message:"Student already exist"})
         }
         const data = await BooastuprequestModel.insertMany({
            regno:regno,
            department:department,
            batch:batch,
            section:section,
            semester:semester,
            presentdays:presentdays,
            workingdays:workingdays,
            percentage: percentage
        })
        if(data){
            return res.status(200).json({message:"Request Sent Successfully"});
        }
         
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

 export default {Register,Login,Authenticate,getProfile,getAllstaff,getStudent,addAttendance,mlodStudent,updateAttendance,BooastupReport,BooastupRequest,addBooastup};