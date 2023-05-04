
import { Routes, Route, HashRouter } from "react-router-dom";
import { useState } from 'react';

import Header from '../admin/header';
import Navbar from '../admin/navbar';

import{Outlet}from "react-router-dom";
function  Admin({user}) {
    return(
        <>
        <div>
        <Header  />
        <Navbar />
        </div>
        <Outlet />
        </>
    )
}

export default Admin;