import { useState } from "react";
import axios from 'axios';
import {useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AiFillDelete} from "react-icons/ai"
import {MdEdit} from "react-icons/md"
import {IoMdRefresh} from "react-icons/io"
import { toast } from "react-toastify";


import '../student.css'
import Addstudent from "./addstudent";
import UpdateStudent from "./updatestudent";

function Student() {
  const Navigate=useNavigate();

  const[view,setView]=useState(false);
  const[student,setStudent]=useState([{}]);
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
    let regno=item;
    console.log(regno);
    
    const url1="http://localhost:4000/api/attendance/admin/studentdelete"
    await axios.post(url1,{regno:regno},config)
    .then(response=>{
      toast.success(response.data);
      
   })
   .catch(error=>{
     console.log(error);
   })
  }
 
  useEffect(()=>{
    const url="http://localhost:4000/api/attendance/admin/student"
     axios.get(url,config)
    .then(response=>{
       setStudent(response.data);
    })
     
  },[handleDelete])

  async function handleSearch(e){
    const url="http://localhost:4000/api/attendance/admin/student/search"
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
        {view?<UpdateStudent setview={setview}/>:
        <>
         <div className="content">
            <div >
            <ul>
              <li>
                  <input type="text" className="search-details" placeholder="Search here" id="search" onChange={handleSearch} />
                    
                   <Link> <button className="search-button" onClick={handleSearch} ><IoMdRefresh /></button></Link>

                <Link to='/admin/addstudent'> <button className="admin-button">Add Student</button></Link>
        
            </li>
            </ul>

          </div>
          <div className="container3">
          <div className="box-content">
            <div className="box-container">
          <table class="table-fill">
              <thead>
                <tr className="box-heading">
                  <th class="text-center">S.No</th>
                  <th class="text-center">Reg No</th>
                  <th class="text-center">Name</th>
                  <th class="text-center">Department</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
           </table>
           {filter?<>
            {filtervalue.map
           ((item,index)=>{
             return(
               <>
              
                <table >
                  <tbody>
                    <tr>
                     <td >{index+1}</td>
                      <td >{item.regno}</td>
                      <td >{item.name}</td>
                      <td >{item.department}</td>
                      <td ><button className="table-button" onClick={()=>{setView(true)}}><MdEdit /></button><button className="table-button" onClick={()=>{handleDelete(item.regno)}}><AiFillDelete/></button></td>
                    </tr>
                 </tbody>
                </table>
 
   
 
             </>
       )
             
           })}</>:<>
           {student.map
           ((item,index)=>{
             return(
               <>
              
                <table >
                  <tbody>
                    <tr>
                     <td >{index+1}</td>
                      <td >{item.regno}</td>
                      <td >{item.name}</td>
                      <td >{item.department}</td>
                      <td ><button className="table-button" onClick={()=>{setView(true)}}><MdEdit /></button><button className="table-button" onClick={()=>{handleDelete(item.regno)}}><AiFillDelete/></button></td>
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

export default Student;