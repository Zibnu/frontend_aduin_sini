import React, { useEffect, useState } from 'react'
import apiServices from '../utils/api'
import { motion } from 'framer-motion'
import { MdNotificationsActive ,MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { FaCommentDots ,FaTimesCircle } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { GiSandsOfTime } from "react-icons/gi";
import { HiCheckCircle } from "react-icons/hi2";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage : 1,
        totalPage : 1,
    });
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const fetchNotif = async (page = 1) => {
        try {
            if(!token) return;

            setLoading(true);

            const res = await apiServices.get(`/notif/my_notif?page=${page}`, {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });

            setNotifications(res.data.data);
            setPagination(res.data.pagination);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Gagal Mendapatkan Notifications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotif(pagination.currentPage);
    }, [pagination.currentPage]);

    const handleChangePage = (page) => {
        if(page >= 1 && page <= pagination.totalPage) {
            fetchNotif(page);
            setPagination((prev) => ({
                ...prev,
                currentPage : page,
            }));
        }
    };

    const markAsRead = async (id) => {
        try {
            await apiServices.patch(`/notif/read/${id}`, null, {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Gagal Mengubah Mark in Notif");
        }
    };

    const handleClickNotif = async (notif) => {
        if(!notif.is_read) {
            await markAsRead(notif.id_notifications);
        }

        navigate(`/history/${notif.report.id_report}`);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("id-ID", {
            day : "2-digit",
            month : "2-digit",
            year : "numeric",
            hour : "2-digit",
            minute : "2-digit",
        });
    };

    const statusConfig = {
        menunggu : {
            icon : GiSandsOfTime,
            color : "text-[#f59e0b]",
        },
        diproses : {
            icon : FaGears,
            color : "text-[#3b82f6]",
        },
        selesai : {
            icon : HiCheckCircle,
            color : "text-[#15b5b0]",
        },
        ditolak : {
            icon : FaTimesCircle,
            color : "text-[#ef4444]",
        },
    }

    if(!loading && notifications.length === 0 ) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center">
                <MdNotificationsActive
                size={80}
                className='text-gray-300 mb-4'
                />
                <p className="text-gray-500 font-medium">Belum Ada Notifikasi</p>
            </div>
        );
    };

    if(loading) return <div className="text-center mt-20 text-gray-500">Loading....</div>

    return (
        <motion.div
        initial={{opacity : 0, y : 20}}
        animate={{opacity : 1, y : 0}}
        className='min-h-screen bg-gray-100 p-8'
        >
            <h2 className="text-2xl font-bold text-[#2563EB] flex items-center gap-2">
                <MdNotificationsActive/> Notifikasi
            </h2>

            <p className="text-[#1e293b] mb-6">Lihat Semua Pembaruan Report Anda</p>

            <div className="space-y-4">
                {notifications.map((notif) => {
                    const report = notif.report;

                    const isComment = notif.message?.toLowerCase().includes("comment");

                    const latestComment = report.comments?.at(-1)?.isi_komentar;

                    const status = statusConfig[report.status];

                    const StatusIcon = isComment ? FaCommentDots : status.icon;

                    const iconColor = isComment ? "text-indigo-500" : status.color;

                    const description = isComment ? latestComment : report.judul;

                    return (
                        <motion.div 
                        key={notif.id_notifications}
                        onClick={() => handleClickNotif(notif)}
                        className="cursor-pointer bg-[#ffffff] rounded-xl p-5 shadow-sm flex hover:shadow-lg justify-between gap-4">
                            <StatusIcon size={34} className={iconColor}/>

                            <div className="flex-1">
                                <h3 className="font-semibold text-[#334155]">
                                    {notif.message}
                                </h3>

                                <p className="text-[#64748b]">
                                    {description}
                                </p>

                                <p className="text-sm text-[#64748b] mt-1">
                                    {formatDate(notif.createdAt)}
                                </p>
                            </div>

                            {!notif.is_read && (
                                <div className="w-2.5 h-2.5 bg-[#2563EB] rounded-full mt-2" />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex justify-center gap-4 mt-8 items-center">
                <button 
                onClick={() => handleChangePage(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-4 py-2 cursor-pointer text-gray-600 disabled:text-gray-200 disabled:cursor-not-allowed">
                    <MdNavigateBefore size={20}/>
                </button>

                <span className="font-semibold">
                    Page {pagination.currentPage} Of {pagination.totalPage}
                </span>

                <button 
                onClick={() => handleChangePage(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPage}
                className="px-4 py-2 cursor-pointer text-gray-600 disabled:text-gray-200 disabled:cursor-not-allowed">
                    <MdNavigateNext size={20}/>
                </button>
            </div>


            
        </motion.div>
    )
}

export default Notification