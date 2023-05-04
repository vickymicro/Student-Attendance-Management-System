import {SiGoogleclassroom} from "react-icons/si"
import {GiTeacher} from "react-icons/gi"
import {MdOutlineDoubleArrow} from "react-icons/md"

import { useState,useEffect } from "react";
import axios from 'axios';

import { Link ,Outlet,useNavigate} from 'react-router-dom';

export default function(){

  const Navigate=useNavigate();
  const[staff,setStaff]=useState([{}]);
  const[student,setStudent]=useState([{}]);
  const[department,setDepartment]=useState([{}]);

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
      
    const url="http://localhost:4000/api/attendance/admin/employee"
     axios.get(url,config)
    .then(response=>{
       console.log(response.data);
       setStaff(response.data);
    })

    const url1="http://localhost:4000/api/attendance/admin/student"
    axios.get(url1,config)
   .then(response=>{
      console.log(response.data);
      setStudent(response.data);
   })

   const url2="http://localhost:4000/api/attendance/admin/department"
   axios.get(url2,config)
  .then(response=>{
     console.log(response.data);
     setDepartment(response.data);
  })
   
     
  },[])
    return(
        <>
          <div className="content">
            <div className="container">
              <div class="main-container">
  
               <div class="cards">
                 <div class="card card-1">
                  
                        
                        <div className="icon">< GiTeacher /></div>
                        <h2 class="card__title">Facultys</h2>
                        <h1 class="card__title">{staff.length}</h1>
                        <hr className="hr"></hr>
                        <p class="card__apply">

                            <ul>
                                <li>
                                  <Link to='/admin/employee' class="card__link" >View details  < MdOutlineDoubleArrow /></Link>
                                </li>
                            </ul>
                        </p>

                       
                 </div>
                 <div class="card card-1">
                        
                        <div className="icon">< GiTeacher /></div>
                        <h2 class="card__title">Students</h2>
                        <h1 class="card__title">{student.length}</h1>

                        <hr className="hr"></hr>
                        <p class="card__apply">
                        <ul>
                                <li>
                                  <Link to='/admin/student' class="card__link" >View details  < MdOutlineDoubleArrow /></Link>
                                </li>
                            </ul>
                        </p>
                 </div>
                 <div class="card card-1">
                        
                        <div className="icon">< SiGoogleclassroom /></div>
                        <h2 class="card__title">Departments</h2>
                        <h1 class="card__title">{department.length}</h1>

                        <hr className="hr"></hr>
                        <p class="card__apply">
                        <ul>
                                <li>
                                  <Link to='/admin/department' class="card__link" >View details  < MdOutlineDoubleArrow /></Link>
                                </li>
                            </ul>
                        </p>
                 </div>
                 
   
  </div>
</div>
          </div>
          </div>
          <Outlet />
        </>
    )
}