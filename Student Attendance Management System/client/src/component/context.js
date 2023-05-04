import { createContext } from "react";

let value={
       users:"",
       booastup:[]

     }

     const UserContext = createContext(value);

export default UserContext;