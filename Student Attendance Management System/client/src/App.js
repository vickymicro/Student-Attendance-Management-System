import logo from './logo.svg';
import './App.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import LoginScreen from './component/login.js';
import AdminLogin from './component/adminlogin.js';
import StaffLogin from './component/stafflogin';
import Home from './component/home'
import Admin from './admin/admin';
import Dashboard from './admin/dashboard';
import Employee from './admin/employee';
import Addemployee from './admin/addemployee';
import Student from './admin/student';
import Addstudent from './admin/addstudent';
import Department from './admin/department';
import Adddepartment from './admin/adddepartment';
import BooastupApproval from './admin/booastupapproval';

import Staff from './staff/staff';
import Staffdashboard from './staff/staffdashboard';
import Mlod from './staff/mlod';
import Longabsent from './staff/longabsent';
import Dailywise from './staff/dailywisereport';
import Monthwise from './staff/monthwisereport';
import Semesterwise from './staff/semesterwisereport';
import Booastup from './staff/booastup';

import NoPage from './dashboard/nopage';
import Forget from './resetpassword/forget';
import Reset from './resetpassword/reset';
import { Routes, Route, HashRouter ,Outlet} from "react-router-dom";
import { useState } from 'react';



function App() {
  const [type,setType]=useState("");
  const [booastup,setBooastup]=useState();
  const userType=(p)=>{
    setType(p);
  }
  const userBooastup=(p)=>{
    booastup(p);
  }
  return (
    
      <>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<LoginScreen user={userType}/>} />
          <Route path="/adminlogin" exact element={<AdminLogin usertype={type}/>} />
          <Route path="/stafflogin" exact element={<StaffLogin usertype={type}/>} />
          <Route path="/admin" exact element={<Admin usertype={type}/>} >
             <Route path="/admin" exact element={<Dashboard />} />
             <Route path="employee" exact element={<Employee />} />
             <Route path="addemployee" exact element={<Addemployee />}/> 
             <Route path="student" exact element={<Student />} />
             <Route path="addstudent" exact element={<Addstudent />}/> 
             <Route path="department" exact element={<Department />} />
             <Route path="adddepartment" exact element={<Adddepartment />}/> 
             <Route path="dailywise" exact element={<Dailywise />} />
             <Route path="monthwise" exact element={<Monthwise />} />
             <Route path="semesterwise" exact element={<Semesterwise />} />
             <Route path="booastupapproval" exact element={<BooastupApproval userBoastup={booastup} />} />

            
             
          </Route>
          <Route path="/staff" exact element={<Staff usertype={type}/>} >
             <Route path="/staff" exact element={<Staffdashboard />} />
             <Route path="mlod" exact element={<Mlod />} />
             <Route path="longabsent" exact element={<Longabsent />} />
             <Route path="dailywise" exact element={<Dailywise />} />
             <Route path="monthwise" exact element={<Monthwise />} />
             <Route path="semesterwise" exact element={<Semesterwise />} />
             <Route path="booastup" exact element={<Booastup userBoastup={userBooastup} />} />
          </Route>
          <Route path="*" element={<NoPage />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/reset" exact element={<Reset />} />
        </Routes>
       
        
    <ToastContainer theme="colored" />
        </>
  );
}

export default App;
