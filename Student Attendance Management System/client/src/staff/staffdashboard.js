import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FiLogOut} from "react-icons/fi"
import { useFormik } from "formik";
import axios from 'axios';
import '../staffdashboard.css'
import { toast } from "react-toastify";

function Staffdashboard() {
    const Navigate=useNavigate();

    const[view,setView]=useState(false);
    const[btn,setBtn]=useState(false);
    const[checkedValue,setCheckedValue]=useState([]);
    const[data,setData]=useState([{}]);
    const[department,setDepartment]=useState([{}]);

    let token =localStorage.getItem('token');
    console.log(token);
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
        const url="http://localhost:4000/api/attendance/staff/getstudent"
        await axios.post(url,{
                department:formik.values.department,
                batch:formik.values.batch,
                section:formik.values.section
        },config)
        .then(res=>{
            console.log(res.data.data);
            if(res.data.message == "Dosn't exist Students"){
              setView(false); 
              return toast.error(res.data.message);
            }
            toast.success(res.data.message);
            setData(res.data.data)
            setView(true); 
           
        })
      }

      async function handle2() {
        
        const url="http://localhost:4000/api/attendance/staff/addattendance"
        await axios.post(url,{
                department:formik.values.department,
                batch:formik.values.batch,
                section:formik.values.section,
                semester:formik.values.semester,
                date:formik.values.date,
                dayorder:formik.values.dayorder,
                attendance:checkedValue
        },config)
        .then(res=>{
            console.log(res.data);
            toast.success(res.data.message);
           
        })
      }



      const handleChange=(e)=>{
        const tempCheck = checkedValue
        let index;
        const regno=e.target.value;
        if (e.target.checked)
        {
            tempCheck.push(regno);
        }
        else {
            index = tempCheck.indexOf(e.target.value);
            tempCheck.splice(index,1);
        }
        setCheckedValue(tempCheck);
        console.log(checkedValue);
      }
      
      const secondHandle=(e)=>{
           e.preventDefault();
            handle2();
            setView(false);
      }
    const formik=useFormik({
        initialValues:{
            department:"",
            batch:"",
            section:"",
            semester:"",
            date:"",
            dayorder:""   
        },
        onSubmit:(values)=>{
            console.log(values);
            handle();
             
        },
        onReset:()=>{
          formik.values("");
        },
        validate:(values)=>{
            let errors ={};
            if (!values.department) {
                errors.department = 'Required';
              }
            if (!values.batch) {
                errors.batch = 'Required';
              }
            if (!values.section) {
                errors.section = 'Required';
              }
              if (!values.semester) {
                errors.semester = 'Required';
              }
            if (!values.date) {
                errors.date = 'Required';
              }
            if (!values.dayorder) {
                errors.dayorder = 'Required';
              }
            
            return errors;
        }
    })
    return(
        <>
          <div>
       <button className="logout-button">LogOut <FiLogOut /></button>
        </div>
        <h5 className="title">Dashboard</h5>
        <div className="content1">
            <div className="container">
                <form onSubmit={formik.handleSubmit}>
                <div class="form-details">
                   <div class="input-box">
                    <label>Programme <span className="required">*</span></label>
                    <select id="department" value={formik.values.department} onChange={formik.handleChange} required >
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
                    <label>Batch <span className="required">*</span></label>
                    <select id="batch" value={formik.values.batch} onChange={formik.handleChange} required >
                       <option>Select Batch</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                       
                    </select>
                    <p className="required">{formik.errors.batch}</p>
                    </div>
                    
                    <div class="input-box">
                    <label>Section <span className="required">*</span></label>
                    <select id="section" value={formik.values.section} onChange={formik.handleChange} required >
                       <option>Select Section</option>
                       <option value="nill">-</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                    </select>
                    <p className="required">{formik.errors.section}</p>
                   </div>
                   <div class="input-box">
                    <label>Semester <span className="required">*</span></label>
                    <select id="semester" value={formik.values.semester} onChange={formik.handleChange} required >
                       <option>Select Semester</option>
                        <option value="1">I</option>
                        <option value="2">II</option>
                        <option value="3">III</option>
                        <option value="4">IV</option>
                        <option value="5">V</option>
                        <option value="6">VI</option>
                    </select>
                    <p className="required">{formik.errors.semester}</p>
                   </div>
                    
                    <div class="input-box">
                    <label>Date <span className="required">*</span></label>
                    <input type="date" id="date" value={formik.values.date} onChange={formik.handleChange} required />
                    <p className="required">{formik.errors.date}</p>
                    </div>
                    
                    <div class="input-box">
                    <label>Day Order <span className="required">*</span></label>
                    <select id="dayorder" value={formik.values.dayorder} onChange={formik.handleChange} required >
                       <option>Select Day Order</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    <p className="required">{formik.errors.dayorder}</p>
                    </div>
                    
                  
                       <input type="submit" className="submit-button" />
                   
                    </div>
                </form> 
            </div> 
            </div>
            <h5 className="title1">Hours</h5>
            
            <div className="content2">
             <div className="container">
        {view ? 
    <form onSubmit={secondHandle}>
<thead>
			<tr >
            <th classname="header">S.no</th>
				<th classname="header">Name</th>
				<th classname="header">Reg No</th>
				<th classname="header">Attendance</th>
			</tr>
		</thead>  
           
{data.map((item,index)=>{
  return(
    <>      
	<table>
		<tbody>
			<tr>
                <td >{index+1}</td>
				<td >{item.name}</td>
				<td>{item.regno}</td>
			    <td><input type="checkbox" value={item.regno} onChange={handleChange}   className="checkbox"/></td>
            </tr>
			
		</tbody>
	</table>
   
  </>
)
  
})}
<input type="submit" className="download-button" />
 </form>

       :
       <div className="no-record">
                   <h2>No records found</h2>
                   </div>
            }   
            </div>
</div>
         
        </>
    )
}

export default Staffdashboard;