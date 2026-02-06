import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MdNotificationsActive } from "react-icons/md";
import { FaRegPlusSquare, FaRegUserCircle } from "react-icons/fa";
import toast from 'react-hot-toast';

function Navbar() {
    // const navigate = useNavigate();
    const token = localStorage.getItem("token");
    return (
        <nav className='bg-[#2563EB] text-[#334155] px-6 py-3 flex items-center justify-between shadow-md'>
            <Link to="/" className='text-lg font-bold hover:text-[#557095]'>
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
                to="/history"
                className={({isActive}) => 
                    isActive ? "text-[#0b1018] font-semibold" : "text-[#334155] hover:text-[#0b1018]"
                }>
                    History
                </NavLink>

                <Link 
                to="/report"
                className='flex items-center gap-2 bg-[#F59E0B] text-[#334155] px-3 py-1 rounded-md font-semibold hover:bg-[#c37d05] transition'
                >
                    Report <FaRegPlusSquare size={15}/>
                </Link>

                <Link 
                onClick={() => !token ? toast.error("Silahkan Login Terlebih Dahulu") : ""}
                to={token ? "/notifications" : "/login" }
                className='text-[#334155] hover:text-[#5a6b84] transition'
                >
                    <MdNotificationsActive size={20}/>
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