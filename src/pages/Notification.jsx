import {useState} from 'react';
import apiServices from '../utils/api';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { GiSandsOfTime } from "react-icons/gi";
import { FaGears } from "react-icons/fa6";
import { HiCheckCircle } from "react-icons/hi2";
import { FaTimesCircle, FaArrowDown, FaMinus, FaExclamationTriangle } from "react-icons/fa";
import { MdNotificationsActive, MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


function Notification() {
    const token = localStorage.getItem("token");
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const fetchNotif = async () => {
        const res = await apiServices.get(`/notif/my_notif?page=${page}`, 
            {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            },
        );
        return res.data;
    };

    const { data, isLoading } = useQuery({
        queryKey : ["notifications", page],
        queryFn : fetchNotif,
        keepPreviousData : true,
        enabled : !!token,
    });

    const markAsRead = useMutation({
        mutationFn : async (id) => {
            await apiServices.patch(`/notif/read/${id}`, null, {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });
        },
        onSuccess : () => {
            queryClient.invalidateQueries(["notifications"]);
        },
    });

    const handleClickNotif = (notif) => {
        if(!notif.is_read) {
            markAsRead.mutate(notif.id_notifications);
        }

        navigate(`/report/${notif.report.id_report}`);
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
            label : "Laporan Menunggu",
        },
        diproses : {
            icon : FaGears,
            color : "text-[#3b82f6]",
            label : "Laporan Diproses",
        },
        selesai : {
            icon : HiCheckCircle,
            color : "text-[#15b5b0]",
            label : "Laporan Selesai",
        },
        ditolak : {
            icon : FaTimesCircle,
            color : "text-[#ef4444]",
            label : "Laporan Ditolak",
        },
    };

    const prioritasConfig = {
        rendah : {
            icon : FaArrowDown,
            className : "bg-gray-200 text-gray-700",
            label : "Rendah",
        },
        sedang : {
            icon : FaMinus,
            className : "bg-purple-200 text-purple-700",
            label : "Sedang",
        },
        tinggi : {
            icon : FaExclamationTriangle,
            className : "bg-red-200 text-red-700",
            label : "Tinggi",
        },
    };

    if(isLoading) return <div className="text-center text-gray-600">Loading....</div>

    return (
        <motion.div
        initial={{opacity : 0, y : 20}}
        animate={{opacity : 1, y : 0}}
        className='min-h-screen bg-[#ecedec] rounded-xl p-8'
        >
            <h2 className="text-2xl font-bold text-[#2563eb] mb-2"> 
                <MdNotificationsActive size={15}/> Notifikasi
                </h2>
                <p className="text-[#1e293b] mb-6">
                    Lihat Semua Pembaruan Laporan Anda
                </p>

                <div className="space-y-4">
                    {data?.data?.map((notif) => {
                        const status = statusConfig[notif.report.status];
                        const prioritas = prioritasConfig[notif.report.prioritas];

                        const StatusIcon = status.icon;
                        const PriorityIcon = prioritas.icon;

                        return (
                            <motion.div
                            key={notif.id_notifications}
                            layout
                            whileHover={{scale : 1.01 }}
                            onClick={() => handleClickNotif(notif)}
                            className="cursor-pointer bg-[#ffffff] rounded-xl p-5 shadow-sm flex justify-between items-start">
                                <div className="flex gap-4">
                                    <StatusIcon size={32} className={status.color} />
                                    <div>
                                        <h3 className="font-semibold text-[#334155]">
                                            {status.label}
                                        </h3>

                                        <p className="text-[#64748b]">
                                            {notif.report.judul}
                                        </p>

                                        <div className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs font-medium ${prioritas.className}`}>
                                            <PriorityIcon size={32} />
                                            {prioritas.label}
                                        </div>

                                        <p className="text-[#1e293b] text-sm mt-2">
                                            {formatDate(notif.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                {!notif.is_read && (
                                    <div className="w-2.5 h-2.5 bg-[#2563eb] rounded-full mt-2" />
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="flex justify-center gap-4 mt-8">
                    <button 
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-gray-600 disabled:bg-gray-200">
                        <MdNavigateBefore/>
                    </button>

                    <span className="px-4 py-2 font-semibold">
                        Page {data?.pagination?.currentPage} of {data?.pagination?.totalPage}
                    </span>

                    <button 
                    disabled={page === data?.pagination?.totalPage}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-gray-600 disabled:bg-gray-200">
                        <MdNavigateNext/>
                    </button>
                </div>

        </motion.div>
    )
}

export default Notification