import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';
import Hero from '../Components/Hero';


const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
           
            <Outlet></Outlet>
            
            <Footer></Footer>
            
        </div>
    );
};

export default HomeLayout;