import { Link } from "react-router-dom";


export default function Reset(){
    return(
        <>
          <form>
              <h1>Reset Password</h1>
              <label><h2>New Password</h2></label>
              <br />
              <input type="password" placeholder="Enter a New Password" />
              <br />
              <label><h2>Re-Enter Password</h2></label>
              <br />
              <input type="password" placeholder="Enter a Password again" />
              <br />
               <Link to="/reset"> <input type="submit" /></Link>
          </form>
        </>
    )
}