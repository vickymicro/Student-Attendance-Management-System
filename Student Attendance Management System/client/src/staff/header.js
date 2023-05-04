import { Link } from "react-router-dom";
import {FiLogOut} from "react-icons/fi"

import {useEffect,useContext } from "react";
import UserContext from "../component/context";

function Header() {
    let ctx = useContext(UserContext);
    console.log(ctx.users);

    const logout=()=>{
        localStorage.removeItem('token');
    }
    return(
        <>
            <div className="admin-head">
                <ul>
                    <li >
                        {/* <img className="logo-img" src="https://yt3.googleusercontent.com/p0rnKpI4OKGP4NPeIofY4TohhiVmdWcBsLCcXuQfgPhbXGdZ5SL1tv6s8UvztrGqt1OZGugQRQ=s900-c-k-c0x00ffffff-no-rj"/> */}
                         <h2 >RVSCAS</h2>
                   </li>
                   <li >
                       <Link ><button className="logout-button"  onClick={logout}>LogOut <FiLogOut /></button></Link>
                   </li>
                </ul>
               
                
             </div>
        </>
    )
}
export default Header;