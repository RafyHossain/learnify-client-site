import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const AuthLayout = () => {
    return (
        <div className='bg-base-200 min-h-screen '>
           <header className='w-screen '>
            <Navbar></Navbar>
           </header>

           <main className='w-11/12 mx-auto py-5'>

           <Outlet></Outlet>

           </main>

           <div className='mt-10'>
            <Footer></Footer>
           </div>
            
        </div>
    );
};

export default AuthLayout;