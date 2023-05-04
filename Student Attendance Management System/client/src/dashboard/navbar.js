import{Link,Outlet} from "react-router-dom";

function Navbar() {
    
    return(
        <>
              <div class="nav">
                  <div class="side">
                      <ul>
                       <li>
                           <Link to="/admin/dashboard">Dashboard</Link></li>
                       <li><a href="#">ML/OD</a></li>
                       <li><a href="#">Long Absent</a></li>
                       <li><a href="#">Daily wise Attendance</a></li>
                       <li><a href="#">Month Wise Attendance</a></li>
                       <li><a href="#">Semester Attendance</a></li>
                       <li><a href="#">Attendance Boostup</a></li>
                       <li><a href="#">Attendance Boostup Approval</a></li>
                     </ul> 
                   </div>    
                </div>
                
               
        </>
    )
}

export default Navbar;