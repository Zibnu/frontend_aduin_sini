import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SiderBar from '../Admin/components/SiderBar'
import TopBar from '../Admin/components/TopBar'
import { motion } from 'framer-motion'

function AdminLayout() {
    const location = useLocation();
    return (
        <div className='min-h-screen flex bg-[#f1f5f9]'>
            <SiderBar/>
            <TopBar/>
            <main className="flex-1 p-6 overflow-y-auto">
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
        </div>
    )
}

export default AdminLayout