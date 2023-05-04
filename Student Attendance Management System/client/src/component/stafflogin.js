import { useFormik } from "formik";
import axios from 'axios';
import { useState,useContext } from "react";
import {FiLogIn} from "react-icons/fi"
import { toast } from "react-toastify";

import UserContext from "./context";

import Staff from "../staff/staff";
import Student from "../dashboard/student";
import { Link ,useNavigate} from "react-router-dom";

function StaffLogin({usertype}) {
  const Navigate=useNavigate();
  const ctx = useContext(UserContext);

  

  async function handle() {
    const url="http://localhost:4000/api/attendance/login/staff"
    await axios.post(url,{
      email:formik.values.email,
      password:formik.values.password,
    })
    .then(res=>{
      if(res.data == "Invalid Email" ){
            return toast.error(res.data);
      }
      if( res.data == "Invalid Password"){
        return toast.error(res.data);
  }
     
      localStorage.setItem('token',res.data.token);
     
    
    })
    let token =localStorage.getItem('token');
    console.log(token);
    const config = {
      headers: {
          'Content-type':'application/json',
          'Accept':'application/json',
          'token':token
           
      }
    };
    

    const url1="http://localhost:4000/api/attendance/login/staff/getprofile"
      await axios.post(url1,{
         email:formik.values.email
      },config)
     .then(res=>{
       console.log(res.data);
       ctx.users = res.data.email;

      //  toast.success(res.data)
      
      })

      const url2="http://localhost:4000/api/attendance/login/staff/authenticate"
      await axios.get(url2,config)
      .then(res=>{
        toast.success(res.data)
        if(res.data == "Login successfully"){
          Navigate('/staff');
       }
       
      })
  }



  const formik=useFormik({
    initialValues: {
      email: "",
      password:""
    },
    onSubmit:(values)=>{
         console.log(values);
         handle();
         
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if(!values.password) errors.password="Required"
      return errors;
    }
  })
    return(
        <>
           <div >
             <h1  className="heading">{usertype}</h1>
             <hr />
           </div>
           <div className="loginscreen">
                 <div className="sub-container">
                   <div className="head">
                     <h1 >LOGIN</h1>
                   </div>
                      <form onSubmit={formik.handleSubmit}>
                      
                        <label><h4>Email</h4></label>
                        <br />
                        <input type="text" className="inputbox" id="email" placeholder="Enter email" 
                           value={formik.values.email} onChange={formik.handleChange} />
                           <div>{formik.errors.email}</div>
                        <label><h4>Password</h4></label>
                        <input type="password" className="inputbox" id="password" placeholder="Enter password"
                           value={formik.values.password}  onChange={formik.handleChange} />
                           <div>{formik.errors.password}</div>
                        <br />
                        <br />
                        
                        <button type="submit" className="login-button">LOGIN <FiLogIn /></button>
                        <p>forgetten password?<Link to='/forget'>Reset</Link></p>
                      </form>
                 </div>
           </div>
           
        </>
        
    )
}

export default StaffLogin;