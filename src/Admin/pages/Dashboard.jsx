import React, { useEffect, useState } from 'react'
import { GiBrokenShield, GiSandsOfTime } from "react-icons/gi";
import { LuClipboardList } from "react-icons/lu";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { HiCheckCircle } from "react-icons/hi2";
import { FaTimesCircle } from "react-icons/fa";
import apiServices from '../../utils/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDashboard = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const res = await apiServices.get("/report/dashboard_admin", {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                });

                setData(res.data.data);
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || "Gagal Mendapatkan Data Dashboard Admin");
            } finally {
                setLoading(false);
            };
        };

        fetchDashboard();
    }, []);

    const cards = [
        { title : "Total Report", value : data.total },
        { title : "Most Damaged", value : data.most_damage_categor },
        { title : "Waiting", value : data.menunggu },
        { title : "Hight Priority", value : data.prioritas_tinggi },
    ];

    if(loading) return <div className="text-center text-gray-500">Loading....</div>

    return (
        <div className="grid grid-cols-3 gap-6">
            {cards.map((card, index) => (
                <motion.div 
                key={index}
                initial={{opacity : 0, y : 20}}
                animate={{opacity : 1, y : 0}}
                className="bg-[#ffffff] p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <h3 className="text-gray-500">{card.title}</h3>
                    <p className="text-2xl font-bold">{card.value}</p>
                </motion.div>
            ))}

            
        </div>
    )
}

export default Dashboard