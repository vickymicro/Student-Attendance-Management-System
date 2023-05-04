import { Routes, Route, HashRouter } from "react-router-dom";
import { useState } from 'react';
import Home from './home.js';
import Header from './header.js';
import Navbar from './navbar.js';
import Dashboard from './dashboard';
import{Outlet}from "react-router-dom";


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