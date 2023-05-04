import{Link,Outlet} from "react-router-dom";

function Navbar() {
    
    return(
        <>
              <div class="nav">
                  <div class="side">
                      <ul>
                       <li>
                           <Link to='/admin'>Dashboard</Link>
                       </li>
                       <li>
                           <Link to='employee'>Manage Faculty</Link>
                       </li>
                       <li>
                           <Link to='student'>Manage Student</Link>
                       </li>
                       <li>
                           <Link to='department'>Manange Departments</Link>
                       </li>
                       <li>
                           <Link to='dailywise'> Daily Wise Attendance Report</Link>
                       </li>
                       <li>
                           <Link to='monthwise'>Month Wise Attendance Report</Link>
                       </li>
                       <li>
                           <Link to='semesterwise'>Semester Wise Attendance Report</Link>
                       </li>
                       <li>
                           <Link to='booastupapproval'>Attendance Booastup Approval</Link>
                       </li>
                     </ul> 
                   </div>    
                </div>
                
               
        </>
    )
}

export default Navbar;