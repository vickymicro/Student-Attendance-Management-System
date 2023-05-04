import {SiGoogleclassroom} from "react-icons/si"
import {TiTick} from "react-icons/ti"
import {MdOutlineDoubleArrow} from "react-icons/md"

import {AiFillDelete} from "react-icons/ai"
import {MdEdit} from "react-icons/md"
import { toast } from "react-toastify";


import { useState,useEffect,useContext } from "react";
import axios from 'axios';

import { Link ,Outlet,useNavigate} from 'react-router-dom';

export default function BooastupApproval(){

  const Navigate=useNavigate();


  const[approval,setApproval]=useState([{}]);
 

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
     
      
    const url="http://localhost:4000/api/attendance/admin/booastupapproval"
     axios.get(url,config)
    .then(res=>{
       
       setApproval(res.data.data);
    })
     
  },[handleDelete])

  async function addBooastup(item){
    console.log(item);
    let regno=item.regno;
    let presentdays=item.presentdays;
    let percentage=item.percentage;
    console.log(regno);
    console.log(presentdays);
    console.log(percentage);


    
    const url1="http://localhost:4000/api/attendance/admin/addbooastup"
    await axios.put(url1,{
      regno:regno,
      presentdays:presentdays,
      percentage:percentage
    },config)
    .then(response=>{
      if(response.data.message == 'Attendance Booastup Updated Successfully'){
        handleDelete(regno);
        return   toast.success(response.data.message);
      }
     
      
   })
   .catch(error=>{
     console.log(error);
   })
  }



  async function handleDelete(item){
    console.log(item);
    let regno=item;
    console.log(regno);
    
    const url1="http://localhost:4000/api/attendance/admin/booastupapproval/delete"
    await axios.post(url1,{regno:regno},config)
    .then(response=>{
      toast.success(response.data);
      
   })
   .catch(error=>{
     console.log(error);
   })
  }



  
    return(
        <>
          <div className="booastup-content">
            <div className="container">
             
            <h3  >Attendance Booastup Approvals</h3>
               <div class="approval-cards">
               
                        {approval.map((item,i)=>{
                          return(
                            <>
                              <div class="card1 card-1">
                              <div className="approval-details">
                              <label>RegNo:</label>
                                 <p>{item.regno}</p>
                                 <label>Department:</label>
                                 <p>{item.department}</p>
                                 <label>Batch:</label>
                                 <p>{item.batch}</p>
                                 <label>Section:</label>
                                 <p>{item.section}</p>
                                 <label>Semester:</label>
                                 <p>{item.semester}</p>
                                 <label>Percentage:</label>
                                 <p>{item.percentage}%</p>
                                 
                           
                            
                                 </div>
                                 <button className="booastup-button" onClick={()=>{addBooastup(item)}} ><TiTick /></button>
                                <button  className="booastup-delete-button" onClick={()=>{handleDelete(item.regno)}}><AiFillDelete/></button>
                            </div>
                           
                            </>
                          )
                        })}
                       
                        
                        

                       
                 
                 
                
   
 
</div>
          </div>
          </div>
          <Outlet />
        </>
    )
}