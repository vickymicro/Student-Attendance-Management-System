import { useState } from "react";
import axios from 'axios';
import {useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AiFillDelete} from "react-icons/ai"
import {MdEdit} from "react-icons/md"
import {IoMdRefresh} from "react-icons/io"
import { toast } from "react-toastify";

import Adddepartment from "./adddepartment";
import UpdateDepartment from "./updatedepartment";

function Department() {

  const Navigate=useNavigate();

      const[view,setView]=useState(false);
      const[department,setDepartment]=useState([{}]);
      const[filter,setFilter]=useState(false);
      const[filtervalue,setFiltervalue]=useState([{}]);

      function setview(p){
        setView(p);
      }

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

      async function handleDelete(item){
        console.log(item);
        let dept=item;
        console.log(dept);
        
        const url1="http://localhost:4000/api/attendance/admin/departmentdelete"
        await axios.post(url1,{dept:dept},config)
        .then(response=>{
          toast.success(response.data);
          
       })
       .catch(error=>{
         console.log(error);
       })
      }

  useEffect(()=>{
    const url="http://localhost:4000/api/attendance/admin/department"
     axios.get(url,config)
    .then(response=>{
       setDepartment(response.data);
    })
     
  },[handleDelete])

  async function handleSearch(e){
    const url="http://localhost:4000/api/attendance/admin/department/search"
    const value=e.target.value;
    console.log(value);
   await axios.post(url,{value:value},config)
    .then(res=>{
       console.log(res.data);
       if(res.data){
         setFiltervalue(res.data);
         return setFilter(true);
       }
       
    })
    if(!value){
      return setFilter(false);
    }
     
  }
    return(
        <>
        {view?<UpdateDepartment setview={setview}/>:
        <>
         <div className="content">
            <div >
            <ul>
              <li>
                 <input type="text" className="search-details" placeholder="Search here" id="search" onChange={handleSearch}/>
                    
                    <button className="search-button"  onClick={handleSearch} ><IoMdRefresh /></button>
                <Link to='/admin/adddepartment'> <button className="admin-button">Add Department</button></Link>
        
            </li>
            </ul>

          </div>
          <div  className="container3">
          <div className="box-content">
            <div className="box-container">
          <table class="table-fill">
              <thead>
                <tr>
                  <th class="text-center">S.No</th>
                  <th class="text-center">Department</th>
                  <th class="text-center">Department Short Name</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
           </table>
           
           {filter?<>
            {filtervalue.map((item,index)=>{
             return(
               <>
               <table >
                  <tbody>
                    <tr>
                     <td >{index+1}</td>
                      <td >{item.department}</td>
                      <td >{item.deptshortname}</td>
                      <td ><button className="table-button" onClick={()=>{setView(true)}}><MdEdit /></button><button className="table-button" onClick={()=>{handleDelete(item.deptshortname)}}><AiFillDelete/></button></td>
                    </tr>
                 </tbody>
                </table>
 
             </>
       )
             
           })}
           </>:<>
           {department.map((item,index)=>{
             return(
               <>
               <table >
                  <tbody>
                    <tr>
                     <td >{index+1}</td>
                      <td >{item.department}</td>
                      <td >{item.deptshortname}</td>
                      <td ><button className="table-button" onClick={()=>{setView(true)}}><MdEdit /></button><button className="table-button" onClick={()=>{handleDelete(item.deptshortname)}}><AiFillDelete/></button></td>
                    </tr>
                 </tbody>
                </table>
 
             </>
       )
             
           })}
           </>}
           </div>
           </div>
          </div>
          </div>
          </>
          }
         
        
        </>
    )
}

export default Department;