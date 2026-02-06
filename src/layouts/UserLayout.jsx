import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function UserLayout() {
    const location = useLocation();

    return (
        <div className='min-h-screen flex flex-col bg-[#f1f5f9]'>
            <Navbar/>
            <main className="flex-grow">
                <motion.div
                key={location.pathname}
                initial={{opacity : 0, y : 20}}
                animate={{opacity : 1, y : 0}}
                exit={{opacity : 0, y : -20}}
                transition={{duration : 0.4}}
                className="h-full">
                    <Outlet/>
                </motion.div>
            </main>
            <Footer/>
        </div>
    )
}

export default UserLayout