import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MdNotificationsActive } from "react-icons/md";
import { FaRegPlusSquare, FaRegUserCircle } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import apiServices from '../utils/api';
import toast from 'react-hot-toast';

function Navbar() {
    // const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchNotifications = async () => {
        const res = await apiServices.get("/notif/my_notif", {
            headers : { 
                Authorization : `Bearer ${token}`,
            },
        });

        // console.log(res.data);
        return res.data.data;
    };

    const { data : notifications = [] } = useQuery({
        queryKey : ['notifications'],
        queryFn : fetchNotifications,
        enabled : !!token,
        refetchInterval : 5000,
        refetchOnWindowFocus : true,
    });

    const hasUnread = notifications.some(n => !n.is_read);
    // console.log(hasUnread);

    return (
        <nav className='bg-[#2563EB] text-[#334155] px-6 py-3 flex items-center justify-between shadow-md'>
            <Link to="/" className='text-lg font-bold hover:text-[#212832]'>
                Aduin_sini
            </Link>

            <div className="flex items-center gap-6">
                <NavLink 
                to="/"
                end
                className={({isActive}) => 
                    isActive ? "text-[#0b1018] font-semibold" : "text-[#334155] hover:text-[#0b1018]"
                }>
                    Dashboard
                </NavLink>

                <NavLink 
                onClick={() => !token ? toast.error("Silahkan Login Terlebih Dahulu") : ""}
                to={token ? "/history" : "/login"}
                className={({isActive}) => 
                    isActive ? "text-[#0b1018] font-semibold" : "text-[#334155] hover:text-[#0b1018]"
                }>
                    History
                </NavLink>

                <Link 
                onClick={() => !token ? toast.error("Silahkan Login Terlebih Dahulu") : ""}
                to={token ? "/report" : "/login"}
                className='flex items-center gap-2 bg-[#F59E0B] text-[#334155] px-3 py-1 rounded-md font-semibold hover:bg-[#c37d05] transition'
                >
                    Report <FaRegPlusSquare size={15}/>
                </Link>

                <Link 
                onClick={() => !token ? toast.error("Silahkan Login Terlebih Dahulu") : ""}
                to={token ? "/notifications" : "/login" }
                className='text-[#334155] hover:text-[#5a6b84] transition'
                >
                    <MdNotificationsActive 
                    size={20}
                    className={`transition-all duration-300 ${
                        token && hasUnread ? "text-red-500 animate-pulse drop-shadow-[0_0_4px_rgba(239,68,68,0.7)]" : ""
                    }`}
                    />
                </Link>

                <Link 
                onClick={() => !token ? toast.error("Silahkan Login Terlebih Dahulu") : ""}
                to={token ? "/profil" : "/login"}
                className='text-[##000000] hover:text-[#3f3d3d] transition'
                >
                    <FaRegUserCircle size={20}/>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar