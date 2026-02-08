import React, { useEffect, useState } from 'react';
import apiServices from '../utils/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaUserAstronaut } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchData = async () => {
        try {
            if(!token) {
                navigate("/login");
                return;
            }

            const res = await apiServices.get("/auth/myData", {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });
            setUser(res.data.data);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Gagal Mendapatkan Data User");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logout Berhasil");
        navigate("/login");
    };

    if(loading) return <div className="text-center text-gray-600 flex justify-center items-center">Loading.....</div>

    return (
        <motion.div
        initial={{opacity : 0, y : 20}}
        animate={{opacity : 1, y : 0}}
        className='min-h-screen bg-gray-100 flex justify-center items-center p-6'
        >
            <div className="bg-[#ffffff] w-full max-w-xl rounded-lg shadow-md p-8 text-center hover:shadow-xl transition">
                <FaUserAstronaut className='mx-auto text-gray-400 mb-4' size={90}/>

                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    {user?.nama}
                </h2>

                <p className="text-gray-500">NIS : {user?.nis}</p>

                <p className="text-gray-500 mb-6">Kelas : {user?.class?.nama_kelas}</p>

                <button 
                onClick={handleLogout}
                className="inline-flex items-center gap-2 cursor-pointer bg-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-300 transition">
                    <AiOutlineLogout/> Logout
                </button>
            </div>
        </motion.div>
    )
}

export default Profile