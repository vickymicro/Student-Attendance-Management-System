import { useState,useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {FiLogOut} from "react-icons/fi"
import axios from 'axios';
import { toast } from "react-toastify";
import {ImSearch} from "react-icons/im"
import '../staffdashboard.css'

function Mlod() {
    const Navigate=useNavigate();

    const[view,setView]=useState(false);
    const[student,setStudent]=useState([]);
    const[checkedValue,setCheckedValue]=useState([]);
    const[data,setData]=useState([{}]);

    const[regno,setRegno]=useState("");

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

    const handleView=()=>{
        if(student){
           return setView(true);
        }

    }

    async function handle(e) {
        e.preventDefault();
        const url="http://localhost:4000/api/attendance/staff/mlodstudent"
        await axios.post(url,{
                regno:regno
        },config)
        .then(res=>{
            if(res.data.message == "Student doesn't exist"){
                 setStudent("");
                 setView(false);
                 return toast.error(res.data.message);
            }
            toast.success(res.data.message)
            setStudent(res.data.data);
           
        })
      }

      async function handle2() {
        const url="http://localhost:4000/api/attendance/staff/updateattendance"
        await axios.put(url,{
                department:student.department,
                batch:student.batch,
                section:student.section,
                regno:student.regno,
                date:formik.values.date,
                
        },config)
        .then(res=>{
            console.log(res.data);
            if(res.data.message == "Attendance Already Exist"){
                setView(false);
                return toast.error(res.data.message)
            }
            toast.success(res.data.message);
            setView(false);
           
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
      
    const formik=useFormik({
        initialValues:{
           date:"",
           
        },
        onSubmit:(values)=>{
            console.log(values);
            handle2();
            
           
           
           
        },
        validate:(values)=>{
          
        }
    })
    return(
        <>
          <div>
       <button className="logout-button">LogOut <FiLogOut /></button>
        </div>
         <h5 className="title" >Student Details</h5>
        <ul >
            <li className="report-button">
                   <input type="submit" onClick={handleView} value="Report"className="report" />
            </li>
        </ul>
       
        <div className="content1">
            <div className="container">
                
                <form >
                <div class="form-details">
                   <div class="input-box">  
                    <input type="text" placeholder="Search Reg No" id="regno" value={regno} onChange={(e)=>{setRegno(e.target.value)}}/>
                    
                    </div>
                    <button className="search-button" onClick={handle}><ImSearch /></button>
                <div className="stu-details">
                    <label>Name:</label>
                    <p>{student.name}</p>
                    <label>Section:</label>
                    <p>{student.section}</p>
                    <label>Batch:</label>
                    <p>{student.batch}</p>
                    <label>Programme:</label>
                    <p>{student.department}</p>
                </div>
                    </div>
                </form> 
            </div> 
            </div>
            <h5 className="title1">ML/OD</h5>
        {view ? 
            <div className="content1">
            <div className="container">
    <form onSubmit={formik.handleSubmit}>
         <div class="form-details">
        <div class="input-box">
                    <label>From Date</label>
                    <input type="date" id="date" value={formik.values.date} onChange={formik.handleChange} required />
                    
        </div>
       
     <input type="submit" className="submit-button" />

</div>
 </form>
 </div>
 </div>

       :
       <div className="content1">
       <div className="container">
       <div className="no-record">
                   <h2>No records found</h2>
                   </div>
                   </div>
                   </div>
            }   
           
         
        </>
    )
}

export default Mlod;