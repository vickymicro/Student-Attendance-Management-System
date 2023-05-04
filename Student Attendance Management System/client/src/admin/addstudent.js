import { useFormik } from "formik";
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";
import {ImCancelCircle} from "react-icons/im"
import { toast } from "react-toastify";
import { useEffect ,useState} from "react";


function Addstudent({setview}) {
  const Navigate=useNavigate();

  const[department,setDepartment]=useState([{}]);

  let token =localStorage.getItem('token');
  useEffect(()=>{
    if(!token){
      return Navigate('/login')
 }
  },[token])
  const config = {
    headers: {
        'Content-type':'application/json',
        'Accept':'application/json',
        'token':token
         
    }
  };


  useEffect(()=>{
      
    const url="http://localhost:4000/api/attendance/admin/department"
     axios.get(url,config)
    .then(response=>{
       console.log(response.data);
       setDepartment(response.data)
      
    })
     
  },[])

  async function handle() {
    const url="http://localhost:4000/api/attendance/admin/addstudent"
    await axios.post(url,{
            name:formik.values.name,
            dob:formik.values.dob,
            gender:formik.values.gender,
            regno:formik.values.regno,
            department:formik.values.department,
            section:formik.values.section,
            batch:formik.values.batch,
            phoneno:formik.values.phoneno,
            email:formik.values.email
    },config)
    .then(res=>{
       if(res.data == "User Already Exist"){
         return toast.error(res.data);
       }
        toast.success(res.data);
      if(res.data == "Student Registered Successfully"){
         return  setview(false);
      }
     
    })
  }

  

    const formik=useFormik({
        initialValues:{
            name:"",
            dob:"",
            gender:"",
            regno:"",
            department:"",
            section:"",
            batch:"",
            phoneno:"",
            email:""
            
        },
        onSubmit:(values)=>{
            console.log(values);
            handle();
           
        },
        validate:(values)=>{
            let errors ={};
            if (!values.name) {
                errors.name = 'Required';
              }
            if (!values.regno) {
                errors.regno = 'Required';
              }
            if (!values.dob) {
                errors.dob = 'Required';
              }
            if (!values.gender) {
                errors.gender = 'Required';
              }
            if (!values.department) {
                errors.department = 'Required';
              }
            if (!values.section) {
                errors.section = 'Required';
              }
              if (!values.batch) {
                errors.batch = 'Required';
              }
            if (!values.phoneno) {
                errors.phoneno = 'Required';
              }else if(!values.phoneno.length == 10){
                errors.phoneno ='invalid phone number'
              }
            if (!values.email) {
                errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
            return errors;
        }
    })
    return(
        <>
          <div className="content">
            <div className="container">
            <div className="form">
            <Link to='/admin/student'> <button className="cancel-button" ><ImCancelCircle /></button> </Link>
             
              <h3>ADD NEW STUDENT</h3>
             
              <form onSubmit={formik.handleSubmit} >
              <div class="user-details">
          <div class="input-box">
          <label >Name<span className="required">*</span></label>
            <input type="text" placeholder="Enter your name" id="name" value={formik.values.name} onChange={formik.handleChange} required />
            <p className="required">{formik.errors.name}</p>
          </div>
          
          <div class="input-box">
          <label >DOB<span className="required">*</span></label>
            <input type="date" placeholder="Enter your username" id="dob" value={formik.values.dob} onChange={formik.handleChange} required />
            <p className="required">{formik.errors.dob}</p>
          </div>
         
          <div class="input-box">
          <label >Reg No<span className="required">*</span></label>
            <input type="text" placeholder="Enter your Reg No" id="regno" value={formik.values.regno} onChange={formik.handleChange} required />
            <p className="required">{formik.errors.regno}</p>
          </div>
         
          <div class="input-box">
          <label >Email<span className="required">*</span></label>
            <input type="email" placeholder="Enter your email" id="email" value={formik.values.email} onChange={formik.handleChange} required />
            <p className="required">{formik.errors.email}</p>
          </div>
         
          <div class="input-box">
          <label >Gender<span className="required">*</span></label>
            <select id="gender" value={formik.values.gender} onChange={formik.handleChange}>
              <option>Select Gender</option>
              <option value="Male">Male</option>
              <option  value="Female">Female</option>
            </select>
            <p className="required">{formik.errors.gender}</p>
          </div>
          
          <div class="input-box">
          <label >Department<span className="required">*</span></label>
            <select id="department" value={formik.values.department} onChange={formik.handleChange} >
              <option>Select Programme</option>
               {department.map((item,index)=>{
                      return(
                        <>
                           <option value={item.deptshortname}>{item.deptshortname}</option>
                        </>
                      )
                              
                        })}
            </select>
            <p className="required">{formik.errors.department}</p>
          </div>
          
          <div class="input-box">
          <label >Section<span className="required">*</span></label>
            <select id="section" value={formik.values.section} onChange={formik.handleChange}>
              <option>Select Section</option>
              <option value="nill">-</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
            <p className="required">{formik.errors.section}</p>
          </div>
         
          
          <div class="input-box">
          <label >Batch<span className="required">*</span></label>
            <input type="number" id="batch" value={formik.values.batch} onChange={formik.handleChange} required />
            <p className="required">{formik.errors.batch}</p>
          </div>
          
          
          <div class="input-box">
          <label >Phone No<span className="required">*</span></label>
            <input type="number" placeholder="Enter your phone number" id="phoneno" value={formik.values.phoneno} onChange={formik.handleChange} required />
            <p className="required">{formik.errors.phoneno}</p>
          </div>
          
          
        </div>
        <div class="button">
          <input type="submit"  />
        </div>
        
              </form>
              </div>
          </div>
          </div>
        </>
    )
}

export default Addstudent;