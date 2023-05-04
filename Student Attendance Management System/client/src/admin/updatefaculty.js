import { useFormik } from "formik";
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";
import {ImCancelCircle} from "react-icons/im"
import { useEffect ,useState} from "react";
import { toast } from "react-toastify";


function UpdateFaculty({setview}) {
  const Navigate=useNavigate();

  const[department,setDepartment]=useState([{}]);

  
  async function handle() {
    const url="http://localhost:4000/api/attendance/admin/addemployee"
    await axios.post(url,{
            name:formik.values.name,
            dob:formik.values.dob,
            gender:formik.values.gender,
            qualification:formik.values.qualification,
            department:formik.values.department,
            phoneno:formik.values.phoneno,
            email:formik.values.email,
            password:formik.values.confirmpassword,
    })
    .then(res=>{
       if(res.data == "Faculty Already Exist"){
         return toast.error(res.data);
       }
        toast.success(res.data);
        
      if(res.data == "Faculty Registered Successfully"){
         return setview(false);
      }
     
    })
  }

    const formik=useFormik({
        initialValues:{
            name:"",
            dob:"",
            gender:"",
            qualification:"",
            department:"",
            phoneno:"",
            email:"",
            password:"",
            confirmpassword:""
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
            if (!values.dob) {
                errors.age = 'Required';
              }
            if (!values.gender) {
                errors.gender = 'Required';
              }
            if (!values.qualification) {
                errors.qualification = 'Required';
              }
            if (!values.department) {
                errors.department = 'Required';
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
              if(!values.password) errors.password="Required"
            if(values.password != values.confirmpassword){
                errors.confirmpassword="password don't match";
            }
            return errors;
        }
    })
    return(
        <>
          <div className="content">
            <div className="container">
            <div className="form">
            <button className="cancel-button" onClick={()=>{setview(false)}}><ImCancelCircle /></button> 
                  <h3>EDIT FACULTY</h3>
               
              
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
          <label >Email<span className="required">*</span></label>
            <input type="text" placeholder="Enter your email" id="email" value={formik.values.email} onChange={formik.handleChange} required />
            <p className="required">{formik.errors.email}</p>
          </div>
         
          <div class="input-box">
          <label >Gender<span className="required">*</span></label>
            <select id="gender" value={formik.values.gender} onChange={formik.handleChange}>
              <option>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <p className="required">{formik.errors.gender}</p>
          </div>
         
          
          <div class="input-box">
          <label >Qualification<span className="required">*</span></label>
            <input type="text" placeholder="Enter your qualification" id="qualification" value={formik.values.qualification} onChange={formik.handleChange} required />
            <p className="required">{formik.errors.qualification}</p>
          </div>
          
          <div class="input-box">
          <label >Department<span className="required">*</span></label>
            <select id="department" value={formik.values.department} onChange={formik.handleChange}>
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
          <label >Phone No<span className="required">*</span></label>
            <input type="number" placeholder="Enter your phone number"id="phoneno" value={formik.values.phoneno} onChange={formik.handleChange} required />
            <p className="required">{formik.errors.phoneno}</p>
          </div>
          
          <div class="input-box">
          <label >Password<span className="required">*</span></label>
            <input type="text" placeholder="Enter your password" id="password" value={formik.values.password} onChange={formik.handleChange} required />
            <p className="required">{formik.errors.password}</p>
          </div>
         
          <div class="input-box">
          <label >Confirm Password<span className="required">*</span></label>
            <input type="text" placeholder="Confirm your password" id="confirmpassword" value={formik.values.confirmpassword} onChange={formik.handleChange} required />
            <p className="required">{formik.errors.confirmpassword}</p>
          </div>
         
       
        </div>
        <div className="button" >
          <input  type="submit" value="Submit" />
        </div>
        
                 
              </form>
              </div>
              </div>
          </div>
        </>
    )
}

export default UpdateFaculty;