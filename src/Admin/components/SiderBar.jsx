import React from 'react'
import { IoIosHome } from "react-icons/io";
import { BsClipboard2Data } from "react-icons/bs";
import { MdInventory } from "react-icons/md";
import { motion } from 'framer-motion';
import { AiOutlineLogout } from "react-icons/ai";
import { NavLink } from 'react-router-dom';

function SiderBar() {
    const menu = [
        {name : "Dashboard", path : "/admin/dashboard", icon : IoIosHome},
        {name : "Reports", path : "/admin/reports", icon : BsClipboard2Data},
        {name : "Resources", path : "/admin/resources", icon : MdInventory},
    ];
    return (
        <div className='w-60 h-screen bg-[#1e293b] text-white sticky top-0 p-4'>
            <h1 className="text-xl font-bold mb-8 text-[#2563EB]">Aduin Sini</h1>

            <div className="space-y-2">
                {menu.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                        key={index}
                        to={item.path}
                        >
                            {({isActive}) => (
                                <motion.div 
                                whileHover={{ x : 5 }}
                                className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive ? "bg-[#e4e7e9] text-black" : "text-[#64748b]"}`}>
                                    <Icon size={22}/>
                                    <span>{item.name}</span>
                                </motion.div>
                            )}
                        </NavLink>
                    );
                })}
            </div>

            <button 
            className="absolute bottom-6 cursor-pointer bg-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-300 transition">
                <AiOutlineLogout/> Logout
            </button>
        </div>
    )
}

export default SiderBar