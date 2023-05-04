import { useState ,useContext,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from 'axios';
import { toast } from "react-toastify";
import {ImSearch} from "react-icons/im"
import {FiLogOut} from "react-icons/fi"
import '../staffdashboard.css'
import UserContext from "../component/context";
function Booastup({booastupapproval}) {
 
    const ctx = useContext(UserContext);
    const Navigate=useNavigate();

    const[view,setView]=useState(false);
    const[student,setStudent]=useState([]);
    const[checkedValue,setCheckedValue]=useState([]);
    const[data,setData]=useState([{}]);
    const[booastup,setBooastup]=useState([]);


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
    console.log("2"+config.headers.token);
    
    const handleView=()=>{
        if(student){
            handle3();
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
          let presentdays=booastup.presentdays+Number(formik.values.noofdays);
          let percentage =Math.round((presentdays*100)/booastup.workingdays);
          ctx.booastup.push({
            "regno":booastup.regno,
            "presentdays":presentdays,
            "percentage":percentage
          });
          const url="http://localhost:4000/api/attendance/staff/booastuprequest"
          await axios.post(url,{
            regno:booastup.regno,
            department:booastup.department,
            section:booastup.section,
            batch:booastup.batch,
            semester:booastup.semester,
            workingdays:booastup.workingdays,
            presentdays:presentdays,
            percentage:percentage
          },config).then(res=>{
                toast.success(res.data.message)
                setView(false);
          })
        // const url="http://localhost:4000/api/attendance/staff/addbooastup"
        // await axios.put(url,{
        //     regno:booastup.regno,
        //     presentdays:presentdays,
        //     percentage:percentage
                
        // })
        // .then(res=>{
        //     console.log(res.data);
        //     if(res.data.message == "Attendance Already Exist"){
        //         setView(false);
        //         return toast.error(res.data.message)
        //     }
        //     toast.success(res.data.message);
        //     setView(false);
           
        // })
      }

      async function handle3() {
        
        const url="http://localhost:4000/api/attendance/staff/booastupreport"
        await axios.post(url,{
                regno:student.regno
        },config)
        .then(res=>{
            console.log(res.data.data);
            if(res.data.message == "Student doesn't exist"){
                 setBooastup("");
                 return toast.error(res.data.message);
            }
            toast.success(res.data.message)
            setBooastup(res.data.data);
           
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
           noofdays:""
           
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
            <h5 className="title1">Attendance Boostup</h5>
        {view ? 
            <div className="content1">
            <div className="container">
    <form onSubmit={formik.handleSubmit}>
    <div className="booastup-details">
                    <label>RegNo:</label>
                    <p>{booastup.regno}</p>
                    <label>Total No Of Days Present:</label>
                    <p>{booastup.presentdays}</p>
                    <label>Total Working Days:</label>
                    <p>{booastup.workingdays}</p>
                    <label>Total Percentage:</label>
                    <p>{booastup.percentage}%</p>
                    
                </div>
         <div class="form-details">
        <div class="input-box">
                    <h5>No Of Days</h5>
                    <input type="number" id="noofdays" placeholder="Enter the no of days" value={formik.values.noofdays} onChange={formik.handleChange} required />
                    
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

export default Booastup;