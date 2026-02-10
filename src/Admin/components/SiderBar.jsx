import React, { useState } from 'react'
import { IoIosHome } from "react-icons/io";
import { BsClipboard2Data } from "react-icons/bs";
import { MdInventory } from "react-icons/md";
import { motion } from 'framer-motion';
import { AiOutlineLogout } from "react-icons/ai";
import { NavLink, useNavigate } from 'react-router-dom';
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import toast from 'react-hot-toast';

function SiderBar() {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logout Berhasil");
        navigate("/login");
    };

    const menuItems = [
        {name : "Dashboard", path : "/admin/dashboard", icon : IoIosHome},
        {name : "Reports", path : "/admin/reports", icon : BsClipboard2Data},
        {name : "Resources", path : "/admin/resources", icon : MdInventory},
    ];
    return (
        <motion.div 
        animate={{width : isOpen ? 220 : 70}}
        transition={{duration : 0.3, type : "spring", damping : 15}}
        className="h-screen bg-[#1e293b] text-white sticky top-0 flex flex-col p-3">
            {/* Toogle Button */}
            <button 
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -right-3 top-6 bg-gray-200 text-black p-2 rounded-full shadow cursor-pointer">
                {isOpen ? (
                    <TbLayoutSidebarLeftCollapse size={20} />
                ) : (
                    <TbLayoutSidebarRightCollapse size={20} />
                )}
            </button>

            {/* Logo */}
            <div className="flex items-center mb-8 mt-4 px-2">
                <span className="font-bold text-lg text-[#2563eb]">
                    {isOpen && "Aduin_sini"}
                </span>
            </div>

            {/* Menu */}
            <nav className="flex flex-col gap-2">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                        key={index}
                        to={item.path}
                        className={({isActive}) => `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                            isActive ? "font-bold text-[#e4e7e9]" : "text-[#64748b] hover:text-[#e4e7e9]"
                        }`}
                        >
                            <span className='text-xl'>
                                <Icon />
                            </span>
                            {isOpen && <span>{item.name}</span>}
                        </NavLink>
                    )
                })}
            </nav>

            <button 
            onClick={handleLogout}
            className={`mt-auto flex items-center ${
                isOpen ? "gap-3 px-4 justify-start" : "justify-center"
            } py-3 rounded-md bg-red-200 text-red-500 hover:bg-red-300 transition `}>
                <AiOutlineLogout size={22}/>
                {isOpen && <span>Logout</span>}
            </button>
        </motion.div>
    )
}

export default SiderBar