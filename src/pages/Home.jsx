import React, { useEffect, useState } from 'react'
import apiServices from "../utils/api";
import { motion } from "framer-motion";
import toast from 'react-hot-toast';
import { BsClipboard2Data } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { FaGears } from "react-icons/fa6";
import { HiCheckCircle } from "react-icons/hi2";
import { FaTimesCircle } from "react-icons/fa";

function Home() {
    const [user, setUser] = useState(null);
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {

            if(!token) {
                setLoading(false);
                return;
            }

            try {
                const userRes = await apiServices.get("/auth/myData", {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                });
                setUser(userRes.data.data);

                const dashboardRes = await apiServices.get("/report/my_dashboard", {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                });
                setDashboard(dashboardRes.data.data);
            } catch (error) {
                console.error("Fetch Data Dashboard Error", error.response?.data?.message);
                toast.error(error.response?.data?.message || "Gagal Mendapatkan Data Dashboard")
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);


    const stats = [
        {
            label : "Total Report",
            value : dashboard?.totalReport ?? "-",
            icon : BsClipboard2Data,
            color : "text-[#231f20]"
        },
        {
            label : "Menunggu",
            value : dashboard?.totalMenunggu ?? "-",
            icon : GiSandsOfTime,
            color : "text-[#f59e0b]"
        },
        {
            label : "Diproses",
            value : dashboard?.totalDiproses ?? "-",
            icon : FaGears,
            color : "text-[#3b82f6]"
        },
        {
            label : "Selesai",
            value : dashboard?.totalSelesai ?? "-",
            icon : HiCheckCircle,
            color : "text-[#15b5b0]"
        },
        {
            label : "Ditolak",
            value : dashboard?.totalDitolak ?? "-",
            icon : FaTimesCircle,
            color : "text-[#ef4444]"
        },
    ];

    if(loading) return <div className="text-center text-shadow-indigo-100">Loading data...</div>
    return (
        <motion.div
        initial={{opacity : 0, y : 20}}
        animate={{opacity : 1, y : 0}}
        className='min-h-screen bg-gray-100 p-6'
        >
            <h2 className="text-2xl font-bold mb-1 text-[#2563EB]">
                Dashboard
            </h2>
            <h3 className="text-xl text-[#1e293b] font-semibold mb-6">
                Selamat Datang {user?.nama || "-"}
            </h3>

            {/* Data Siswa */}
            <div className="bg-[#ffffff] rounded-xl p-6 shadow mb-8 hover:shadow-lg transition">
                <h4 className="font-bold text-[#231f20] mb-4">Data Siswa</h4>

                {!token ? (
                    <p className="text-gray-500">
                        Silahkan Login Terlebih Dahulu
                    </p>
                ) : (
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <p className="text-[#64748b]">NIS</p>
                            <p className="text-[#334155] font-semibold">{user.nis || "-"}</p>
                        </div>
                        <div>
                            <p className="text-[#64748b]">Nama</p>
                            <p className="text-[#334155] font-semibold">{user.nama || "-"}</p>
                        </div>
                        <div>
                            <p className="text-[#64748b]">Kelas</p>
                            <p className="text-[#334155] font-semibold">{user.class.nama_kelas || "-"}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Statistik */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {stats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                    <div 
                    key={index}
                    className="bg-[#ffffff] rounded-xl p-6 shadow flex flex-row justify-between items-center gap-2 hover:shadow-lg transition">

                        <div className="flex flex-col gap-1">
                        <p className={`font-semibold text-sm ${item.color}`}>
                            {item.label}
                            </p>
                        <p className={`text-xl font-bold ${item.color}`}>
                            {item.value}
                            </p>
                        </div>

                        <Icon className={`text-4xl ${item.color}`}/>
                    </div>
                    )
                })}
            </div>
        </motion.div>
    )
}

export default Home