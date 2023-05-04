import { useState } from "react";
import { useFormik } from "formik";
import axios from 'axios';
import '../staffdashboard.css'

function Longabsent() {

    const[view,setView]=useState(false);
    const[student,setStudent]=useState([]);
    const[checkedValue,setCheckedValue]=useState([]);
    const[data,setData]=useState([{}]);

    const[regno,setRegno]=useState("");

    async function handle(e) {
        e.preventDefault();
        const url="http://localhost:4000/api/attendance/staff/mlodstudent"
        await axios.post(url,{
                regno:regno
        })
        .then(res=>{
            console.log(res.data);
            setStudent(res.data);
           
        })
      }

      async function handle2() {
        const url="http://localhost:4000/api/attendance/staff/addattendance"
        await axios.post(url,{
                department:formik.values.department,
                batch:formik.values.batch,
                section:formik.values.section,
                date:formik.values.date,
                dayorder:formik.values.dayorder,
                attendance:checkedValue
        })
        .then(res=>{
            console.log(res.data);
            alert(res.data);
           
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
          
            handle2();
      }
    const formik=useFormik({
        initialValues:{
           regno:""  
        },
        onSubmit:(values)=>{
            console.log(values);
            handle();
            setView(true);
           
           
           
        },
        validate:(values)=>{
          
        }
    })
    return(
        <>
         <h5 className="title" >Student Details</h5>
        <ul >
            <li className="report-button">
                   <button className="report">Report</button>
            </li>
        </ul>
       
        <div className="content1">
            <div className="container">
                
                <form >
                <div class="form-details">
                   <div class="input-box">
                    <input type="text" placeholder="Search Reg No" id="regno" value={regno} onChange={(e)=>{setRegno(e.target.value)}}/>
                    <button onClick={handle}>Search</button>
                    </div>
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
            <h5 className="title1">Long Absent</h5>
            <div className="content2">
             <div className="container">
        {view ? 
    <form onSubmit={secondHandle}>
<thead>
			<tr className="head">
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
                <td className="values">{index+1}</td>
				<td className="values">{item.name}</td>
				<td>{item.regno}</td>
			    <td><input type="checkbox" value={item.regno} onChange={handleChange}   className="checkbox"/></td>
            </tr>
			
		</tbody>
	</table>
   
  </>
)
  
})}
<input type="submit" className="button" />
 </form>

       :
                   <h1>No records found</h1>
            }   
            </div>
</div>
         
        </>
    )
}

export default Longabsent;