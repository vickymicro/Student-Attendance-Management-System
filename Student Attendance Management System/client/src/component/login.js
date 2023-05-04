import{Link}from "react-router-dom";
import {FiLogIn} from "react-icons/fi"
function LoginScreen({user}) {
     
  return (
    <>
    <h1 className="heading" >WELCOME TO RVS CAS</h1>
    <hr></hr>
    <div className="loginscreen">
        
        <div className="sub-container">
          <div className="head">
            <h1 >LOGIN</h1>
           </div>
           <div className="mini-container">
             <ul>
               <li className="list">
                 <Link to="/adminlogin"><button onClick={()=>user("ADMIN LOGIN")} class="login-button">ADMIN<FiLogIn /></button></Link>
               </li>
               <li className="list">
               <Link to="/stafflogin"><button onClick={()=>user("STAFF LOGIN")} class="login-button">STAFF<FiLogIn /></button></Link>
               </li>

        </ul>
        </div>
        </div>
        
     
    </div>
    </>
  );
}

export default LoginScreen;


