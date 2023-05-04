import { useFormik } from "formik";
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";
import {ImCancelCircle} from "react-icons/im"
import { toast } from "react-toastify";


function UpdateDepartment({setview}) {
  const Navigate=useNavigate();
  async function handle() {
    const url="http://localhost:4000/api/attendance/admin/adddepartment"
    await axios.post(url,{
            department:formik.values.department,
            deptshortname:formik.values.deptshortname
    })
    .then(res=>{
      if(res.data == "Department Already Exist"){
        return toast.error(res.data)
      }
        toast.success(res.data);
        if(res.data == "Department Added Successfully"){
          return  setview(false);
        }
      })
  }

    const formik=useFormik({
        initialValues:{
            department:"",
            deptshortname:""
        },
        onSubmit:(values)=>{
            console.log(values);
            handle();
        },
        validate:(values)=>{
            let errors ={};
            if (!values.department) {
                errors.department = 'Required';
              }
            if (!values.deptshortname) {
                errors.deptshortname = 'Required';
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
              
              <h3>EDIT DEPARTMENT</h3>
             
            
              <form onSubmit={formik.handleSubmit} >
              <div class="user-details">
          <div class="input-box">
          <label >Department<span className="required">*</span></label>
            <input type="text" id="department" value={formik.values.department} onChange={formik.handleChange} required />
            <p className="required">{formik.errors.department}</p>
          </div>
          
          <div class="input-box">
          <label >Department Short Name<span className="required">*</span></label>
            <input type="text" id="deptshortname" value={formik.values.deptshortname} onChange={formik.handleChange} required />
            <p className="required">{formik.errors.deptshortname}</p>
          </div>
         
          
        </div>
        
        <div class="button">
          <input type="submit" />
        </div>
                 
              </form>
              </div>
          </div>
          </div>
        </>
    )
}

export default UpdateDepartment;