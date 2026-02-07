import { useEffect, useState } from 'react'
import apiServices from '../utils/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GiSandsOfTime } from "react-icons/gi";
import { FaGears } from "react-icons/fa6";
import { HiCheckCircle } from "react-icons/hi2";
import { FaTimesCircle } from "react-icons/fa";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import iconNoHistory from "../assets/images/heroNoHistory.png"

function History() {
    const [reports, setReports] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage : 1,
        totalPage : 1,
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");


    const fetchReports = async ( page = 1) => {
        try {
            if(!token) {
                setLoading(false);
                return
            }

            setLoading(true)

            const res = await apiServices.get(`/report/my_reports?page=${page}`, {
                headers : { 
                    Authorization : `Bearer ${token}`
                },
            });

            setReports(res.data.data);
            setPagination(res.data.pagination);
        } catch (error) {
            console.error(error.response?.data?.message);
            toast.error(error.response?.data?.message || "Gagal Mendapatkan Data History");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports(pagination.currentPage);
    }, [pagination.currentPage]);

    const handlePageChange = (page) => {
        if(page >= 1 && page <= pagination.totalPage) {
            fetchReports(page);
            setPagination((prev) => ({
                ...prev,
                currentPage : page,
            }));
        }
    };

    const statusConfig = {
        menunggu : {
            color : "#f59e0b",
            icon : <GiSandsOfTime/>,
            label : "Menunggu",
        },
        diproses : {
            color : "#3b82f6",
            icon : <FaGears/>,
            label : "Diproses",
        },
        selesai : {
            color : "#15b5b0",
            icon : <HiCheckCircle/>,
            label : "Selesai",
        },
        ditolak : {
            color : "#ef4444",
            icon : <FaTimesCircle/>,
            label : "Ditolak"
        }
    };

    const priorityConfig = {
        rendah : "bg-gray-200 text-gray-700",
        sedang : "bg-purple-200 text-purple-700",
        tinggi : "bg-red-200 text-red-700",
    };

    if(loading) return <div className="text-center text-indigo-400">Loading....</div>
    

    return (
        <motion.div
        initial={{ opacity : 0, y : 20}}
        animate={{ opacity : 1, y : 0}}
        className='min-h-screen p-6'
        >
            <h2 className="text-2xl font-bold text-[#2563EB] mb-1">History Report</h2>
            <p className="text-[##334155] mb-1">Lihat Semua Laporan yang Telah Anda Buat</p>

            { !token ? (
                <div className="bg-white p-10 rounded-lg shadow flex flex-col items-center justify-center text-center h-64">
                    <p className="text-lg font-semibold text-gray-700 mb-2">Akses Ditolak</p>
                    <p className="text-gray-400 mb-4">Silahkan Login Terlebih Dahulu</p>
                    <button 
                    onClick={() => navigate("/login")}
                    className="px-6 py-2 bg-[#f59e0b] text-white rounded-md hover:bg-[#bc7a08] transition">
                        Login Sekarang
                    </button>
                </div>
            ) :reports.length === 0 ? (
                <div className="bg-white p-10 rounded-lg shadow flex flex-col md:flex-row items-center justify-center text-center gap-10">
                    <img 
                    src={iconNoHistory}
                    alt="No History Image"
                    className='w-3xs h-50 object-contain opacity-70 mb-4'
                    />
                    <div className="text-center md:text-left">
                        <p className="text-lg font-medium">Belum Membuat Laporan</p>
                        <p className="text-sm text-gray-500 mb-4 leading-relaxed">Mari laporkan setiap kerusakan yang ada di sekolah sehingga bisa membuat sekolah menjadi lebih baik kedepannya</p>
                    </div>
                </div>
            ) : (
                reports.map((item) => {
                    const status = statusConfig[item.status]

                    return (
                        <div 
                        key={item.id_report}
                        onClick={() => navigate(`/history/${item.id_report}`)}
                        className="bg-[#ffffff] rounded-xl p-5 shadow mb-4 cursor-pointer hover:shadow-lg transition">
                            <div className="flex justify-between mb-3">
                                <h3 className="font-semibold text-lg">
                                    {item.judul}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="flex gap-3 items-center">
                                {/* Priority */}
                                <span className={`px-3 py-1 rounded-sm font-semibold ${priorityConfig[item.prioritas]}`}>
                                    {item.prioritas.toUpperCase()}
                                </span>

                                {/* status */}
                                <span 
                                className="flex items-center gap-2 px-3 py-1 rounded-sm text-sm font-semibold"
                                style={{
                                    backgroundColor : `${status.color}20`,
                                    color : status.color,
                                }}
                                >
                                    {status.icon}
                                    {status.label}
                                </span>
                            </div>
                        </div>
                    );
                })
            )}

            {reports.length > 0 && (
                <div className="flex justify-center items-center gap-4 mt-6">
                    <button 
                    onClick={() => 
                        handlePageChange(pagination.currentPage - 1)
                    }
                    disabled={pagination.currentPage === 1}
                    className="px-4 py-2 text-gray-600 disabled:text-gray-300"
                    >
                        <MdNavigateBefore size={20} />
                    </button>

                    <span className="font-medium">
                        Page {pagination.currentPage} of {pagination.totalPage}
                    </span>

                    <button 
                    onClick={() => 
                        handlePageChange(pagination.currentPage + 1)
                    }
                    disabled={pagination.currentPage === pagination.totalPage}
                    className="px-4 py-2 text-gray-600 disabled:text-gray-300">
                        <MdNavigateNext size={20} />
                    </button>
                </div>
            )}
        </motion.div>
    )
}

export default History