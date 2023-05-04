import { useFormik } from "formik";
import axios from 'axios';
import { useState } from "react";
import Admin from "../dashboard/admin";
import Staff from "../dashboard/staff";
import Student from "../dashboard/student";
import { Link } from "react-router-dom";

function Signin({usertype}) {
  
  const[loged,setLoged]=useState();
  async function handle() {
    const url="http://localhost:4000/api/attendance/login"
    await axios.post(url,{
      email:formik.values.email,
      password:formik.values.password,
      role:formik.values.role
    })
    .then(res=>{
      alert(res.data);
    })
  }


  const formik=useFormik({
    initialValues: {
      email: "",
      password:"",
      role:{usertype}
    },
    onSubmit:(values)=>{
         console.log(values);
         handle();
         setLoged(values.role.usertype);
         console.log(values.role.usertype);
         
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
        { loged == "ADMIN LOGIN" ? <Admin user={formik.values.email}/> : loged == "STAFF LOGIN" ? <Staff /> :loged == "STUDENT LOGIN" ? <Student /> :
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
                      {/* <label><h2>Role</h2></label>
                      <select>
                          <option>Admin</option>
                          <option>Staff</option>
                          <option>Student</option>
                        </select>
                        <br /> */}
                        <label><h2>Email</h2></label>
                        <br />
                        <input type="text" className="inputbox" id="email" placeholder="Enter email" 
                           value={formik.values.email} onChange={formik.handleChange} />
                           <div>{formik.errors.email}</div>
                        <label><h2>Password</h2></label>
                        <input type="password" className="inputbox" id="password" placeholder="Enter password"
                           value={formik.values.password}  onChange={formik.handleChange} />
                           <div>{formik.errors.password}</div>
                        <br />
                        <br />
                        
                        <button type="submit" className="button">LOGIN</button>
                        <p>forgetten password?<Link to='/forget'>Reset</Link></p>
                      </form>
                 </div>
           </div>
           </>
           }
        </>
        
    )
}

export default Signin;