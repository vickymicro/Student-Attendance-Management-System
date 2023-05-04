import{Link,Outlet} from "react-router-dom";

function Navbar() {
    
    return(
        <>
              <div class="nav">
                  <div class="side">
                      <ul>
                       <li>
                           <Link to="/staff">Dashboard</Link>
                       </li>
                       <li>
                           <Link to="mlod">ML/OD</Link>
                       </li>
                
                       <li>
                           <Link to="dailywise"> Daily  Wise Attendance  Report</Link>
                       </li>
                       <li>
                           <Link to="monthwise">Month Wise Attendance Report</Link>
                       </li>
                       <li>
                           <Link to="semesterwise">Semester Wise Attendance Report</Link>
                       </li>
                       <li>
                           <Link to="booastup">Attendance Boostup</Link>
                       </li>
                     </ul> 
                   </div>    
                </div>
                
               
        </>
    )
}

export default Navbar;