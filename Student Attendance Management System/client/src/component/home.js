import{Link}from "react-router-dom";
import {FaSignInAlt} from "react-icons/fa"
function Home() {
    return(
        <div className="home">
            <img className="home-img" src="https://yt3.googleusercontent.com/p0rnKpI4OKGP4NPeIofY4TohhiVmdWcBsLCcXuQfgPhbXGdZ5SL1tv6s8UvztrGqt1OZGugQRQ=s900-c-k-c0x00ffffff-no-rj"  />
            <h4  className="home-heading">WELCOME TO</h4>
            <h3  className="home1-heading">STUDENT ATTENDANCE MANAGEMENT SYSTEM</h3>
            <Link to="/login"><button class="button" >Enter</button></Link>
        </div>
    )
    
}

export default Home;