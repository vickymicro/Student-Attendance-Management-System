import { useState ,useRef,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {FiLogOut} from "react-icons/fi"
import { useFormik } from "formik";
import axios from 'axios';
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import {FiDownload} from "react-icons/fi"
import '../staffdashboard.css'

function Monthwise() {
    const Navigate=useNavigate();

    const[view,setView]=useState(false);
    const[btn,setBtn]=useState(false);
    const[checkedValue,setCheckedValue]=useState([]);
    const[data,setData]=useState([]);
    const[report,setReport]=useState({});
    const[students,setStudents]=useState([{}]);
    const[department,setDepartment]=useState([{}]);


    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Daily-Attendance',
        onafterprint: () => alert("print success")
    })
     
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
        const url1="http://localhost:4000/api/attendance/report/month"
        await axios.post(url1,{
                department:formik.values.department,
                batch:formik.values.batch,
                section:formik.values.section,
                month:formik.values.month
        },config)
        .then(res=>{
            console.log(res.data.data);
            if(res.data.message == "Dosn't exist Attendance"){
                setView(false);
                return toast.error(res.data.message);
            }
            toast.success(res.data.message);
            let value=res.data.data;
            console.log(value);
            setData(value);
            setReport(value[0])
           
           
        })
       
        const url="http://localhost:4000/api/attendance/staff/getstudent"
        await axios.post(url,{
            department:formik.values.department,
            batch:formik.values.batch,
            section:formik.values.section,
    },config)
    .then(res=>{
        console.log(res.data.data);
        if(res.data.message == "Dosn't exist Students"){
            setView(false);
            return toast.error(res.data.message);
        }
        toast.success(res.data.message)
        setStudents(res.data.data);
       
       
    })
       
      }


    const formik=useFormik({
        initialValues:{
            department:"",
            batch:"",
            section:"",
            month:""
        },
        onSubmit:(values)=>{
            console.log(values);
            handle();
            setView(true);
           
           
           
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
            if (!values.month) {
                errors.month = 'Required';
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
                    <label>Programme<span className="required">*</span></label>
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
                    <label>Batch<span className="required">*</span></label>
                    <select id="batch" value={formik.values.batch} onChange={formik.handleChange} required >
                       <option>Select Batch</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                       
                    </select>
                    <p className="required">{formik.errors.batch}</p>
                    </div>
                    
                    <div class="input-box">
                    <label>Section<span className="required">*</span></label>
                    <select id="section" value={formik.values.section} onChange={formik.handleChange} required >
                       <option>Select Section</option>
                        <option value="-nill">-</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                    </select>
                    <p className="required">{formik.errors.section}</p>
                   </div>
                    
                    <div class="input-box">
                    <label>Month<span className="required">*</span></label>
                    <input type="month" id="month" value={formik.values.month} onChange={formik.handleChange} required />
                    <p className="required">{formik.errors.month}</p>
                    </div>
                    
                   
                    
                    
                   
                       <input type="submit" value="report" className="submit-button"  />
                    
                    </div>
                </form> 
            </div> 
            </div>
            <h5 className="title1">Reports</h5>
            <div className="content2">
             <div className="container">
        {view ? 
        <>
        <button className="download-button" onClick={handlePrint}>Download<FiDownload /></button>
    <form  ref={componentRef}>
    <div className="report-details">
        <label>Department:</label>
        <p>{report.department}</p>
        <label>Section:</label>
        <p>{report.section}</p>
        <label>Batch:</label>
        <p>{report.batch}</p>
        <label>Semester:</label>
        <p>{report.semester}</p>
        <label>Month:</label>
        <p>{report.month}</p>
    </div>
      
<thead>
			<tr >
            <th >S.no</th>
				<th >Name</th>
				<th >Reg No</th>
				<th >Present Days</th>
                <th>Percentage(%)</th>
			</tr>
		</thead>  
           
{students.map((item,index)=>{
    
    let attendance=data.map((value,i) => {
        if(item.regno == value.regno){
            return value.count;
        }});
    console.log(attendance);
    let percentage=data.map((value,i) => {
        if(item.regno == value.regno){
            return value.percentage;
        }});
    console.log(percentage);
  return(
    <>      
	<table>
		<tbody>
			<tr>
                <td >{index+1}</td>
				<td >{item.name}</td>
				<td>{item.regno}</td>
                <td>{attendance}</td>
                <td>{percentage}%</td>
            </tr>
			
		</tbody>
	</table>
   
  </>
)
  
})}

 </form>
 </>
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

export default Monthwise;