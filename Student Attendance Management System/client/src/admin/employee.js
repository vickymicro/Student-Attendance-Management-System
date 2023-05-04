import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AiFillDelete} from "react-icons/ai"
import {MdEdit} from "react-icons/md"
import {IoMdRefresh} from "react-icons/io"
import{Outlet}from "react-router-dom";
import axios from 'axios';
import {useEffect } from "react";
import { toast } from "react-toastify";



import Addemployee from "./addemployee";
import UpdateFaculty from "./updatefaculty";
function Employee(){

  const Navigate=useNavigate();

    const[view,setView]=useState(false);
    const[filter,setFilter]=useState(false);
    const[staff,setStaff]=useState([{}]);
    const[search,setSearch]=useState("");
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
      let name=item;
      console.log(name);
      
      const url1="http://localhost:4000/api/attendance/admin/delete"
      await axios.post(url1,{name:name},config)
      .then(response=>{
        toast.success(response.data);
        
     })
     .catch(error=>{
       console.log(error);
     })
    }
   

    async function handleSearch(e){
      const url="http://localhost:4000/api/attendance/admin/faculty/search"
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
    useEffect(()=>{
     
      
      const url="http://localhost:4000/api/attendance/admin/employee"
       axios.get(url,config)
      .then(response=>{
         
         setStaff(response.data);
      })
       
    },[])
  

    const Updatefaculty=()=>{
       UpdateFaculty();
    }
    
    return(
        <>
        {view?<UpdateFaculty setview={setview} />:
        <>
         <div className="content">
           
            <div >
            <ul >
              <li>
                
                    <input type="text" className="search-details" placeholder="Search here" id="search"  onChange={handleSearch} />
                    
                    <button className="search-button" onClick={handleSearch} ><IoMdRefresh/></button>
             
               <Link to='/admin/addemployee' > <button className="admin-button" >Add Faculty</button> </Link>
        
            </li>
            </ul>

          </div>
          <div className="container3">
          <div className="box-content">
            <div className="box-container">
         
          <table class="table-fill">
              <thead>
                <tr>
                  <th class="text-center">S.No</th>
                  <th class="text-center">Name</th>
                  <th class="text-center">Department</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
           </table>
           {filter ?  <>
          {filtervalue.map((item,index)=>{
            return(
              <>
              <table>
                 <tbody >
                   <tr>
                    <td>{index+1}</td>
                     <td>{item.name}</td>
             
                     <td>{item.department}</td>
                     <td><button className="table-button" onClick={()=>{setView(true)}}><MdEdit /></button><button onClick={()=>{handleDelete(item.name)}} className="table-button"><AiFillDelete/></button></td>
                   </tr>
                </tbody>
               </table>

           </>
            )
          })}
        </> : <>
          {staff.map((item,index)=>{
            return(
              <>
               <table>
                  <tbody >
                    <tr>
                     <td>{index+1}</td>
                      <td>{item.name}</td>
              
                      <td>{item.department}</td>
                      <td><button className="table-button" onClick={()=>{setView(true)}}><MdEdit /></button><button onClick={()=>{handleDelete(item.name)}} className="table-button"><AiFillDelete/></button></td>
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
          <Outlet />
        </>
    )
}
export default Employee;