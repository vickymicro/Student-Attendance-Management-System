import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from 'axios';
import {FiLogIn} from "react-icons/fi"
import { useState,useContext } from "react";
import { toast } from "react-toastify";


export default function Forget(){

  async function handle(){
    const url="http://localhost:4000/api/attendance/admin/forgetpassword"
    await axios.post(url,{
            email:formik.values.email
           
    })
    .then(res=>{
       if(res.data == "Faculty Already Exist"){
         return toast.error(res.data);
       }
        toast.success(res.data);
        
    
    })
  
  }

    const formik=useFormik({
        initialValues: {
          email: "",
          
        },
        onSubmit:(values)=>{
            console.log(values.email);
            handle();
             
        },
        validate: (values) => {
          let errors = {};
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
          
          <div className="loginscreen">
                 <div className="sub-container">
                   <div className="head">
                     <h1 >Forget Password</h1>
                   </div>
                      <form onSubmit={formik.handleSubmit}>
                      
                        <label><h4 >Email</h4></label>
                        <br />
                        <input type="text" className="inputbox" id="email" placeholder="Enter email" 
                           value={formik.values.email} onChange={formik.handleChange} />
                           <div>{formik.errors.email}</div>
                        <br />
                        <br />
                        
                        <button type="submit" className="login-button">SUBMIT</button>
                       
                      </form>
                 </div>
           </div>
        </>
    )
}