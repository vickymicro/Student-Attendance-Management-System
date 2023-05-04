import { useState } from 'react';

import{Outlet}from "react-router-dom";
import Header from '../staff/header';
import Navbar from '../staff/navbar';


function  Staff({user}) {
    return(
        <>
        <div>
         <Header />
         <Navbar />
        </div>
        <Outlet />
        </>
    )
}

export default Staff;