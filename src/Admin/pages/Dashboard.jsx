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
import DashboardCard from '../components/DashboardCard';
import StatusCard from '../components/StatusCard';

function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchDashboard = async () => {
            setLoading(true);
            try {
                const res = await apiServices.get("/report/dashboard_admin", {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                });

                console.log(res)
                setData(res.data.data);
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || "Gagal Mendapatkan Data Dashboard Admin");
            } finally {
                setLoading(false);
            };
        };

        fetchDashboard();
    }, [token]);


    if(loading || !data) {
        return (
            <div className="flex justify-center items-center h-screen text-center text-gray-500">
                Loading.....
            </div>
        )
    }

    const statusItems = [
        {label : "Waiting", value : data?.menunggu, icon : GiSandsOfTime, color : "text-[#f59e0b]"},
        {label : "Processing", value : data?.diproses, icon : FaGears, color : "text-[#3b82f6]"},
        {label : "Finished", value : data?.selesai, icon : HiCheckCircle, color : "text-[#15b5b0]"},
        {label : "Canceled", value : data?.ditolak, icon : FaTimesCircle, color : "text-[#ef4444]"},
    ]

    return (
        <div className="p-6 space-y-6">

            <div className="grid grid-cols-4 gap-6">
                <DashboardCard
                title="Total Report"
                value={data.total}
                icon={LuClipboardList}
                color="text-[#231f20]"
                />

                <DashboardCard
                title="Most Damaged"
                value={data?.most_damage_category?.category?.nama_kategori || "No Data"}
                icon={GiBrokenShield}
                color="text-[#0d9488]"
                />

                <DashboardCard
                title="Waiting"
                value={data.menunggu}
                icon={GiSandsOfTime}
                color="text-[#f59e0b]"
                />

                <DashboardCard
                title="High Priority"
                value={data.prioritas_tinggi}
                icon={FaExclamationTriangle}
                color="text-[#ef4444]"
                />
            </div>

            {/* Bottom section */}
            <div className="grid grid-cols-2 gap-6">

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <h2 className="font-semibold mb-4">Status Based Reports</h2>
                    {statusItems.map((item, index) => (
                        <StatusCard key={index} {...item}/>
                    ))}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <h2 className="font-semibold mb-4">Latest Report</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {data.latest_report.map((report) => (
                            <li key={report.id_report}>{report.judul}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard