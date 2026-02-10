import React, { useEffect, useState } from 'react';
import apiServices from '../utils/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { GiSandsOfTime } from "react-icons/gi";
import { FaGears } from "react-icons/fa6";
import { HiCheckCircle } from "react-icons/hi2";
import { FaTimesCircle, FaCommentDots } from "react-icons/fa";
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useNavigate, useParams } from 'react-router-dom';
import { VscLocation } from "react-icons/vsc";
import { TbCategory } from "react-icons/tb";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { FaUserGraduate } from "react-icons/fa";
import EditReportModal from '../components/EditReportModal';
import EditCommentModal from '../components/EditCommentModal';

function DetailReport() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userId = Number(localStorage.getItem("userId"));
    // console.log(typeof(userId))

    const [showEditModal, setShowEditModal] = useState(false);
    const [showEditComment, setShowEditComment] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState("");
    const [imgError, setImgError] = useState(false);

    const fetchDetail = async () => {
        try {
            const res = await apiServices.get(`report/detail_report/${id}`, {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });

            setReport(res.data.data);
            // console.log(res);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Gagal Mendapatkan Detail Report");
        } finally {
            setLoading(false);
        }
    };

    const fetchDataEditReport = async () => {
        try {
            const [catRes, roomRes] = await Promise.all([
                apiServices.get("/category/get_all_category"),
                apiServices.get("/room/get_all_room"),
            ]);

            setCategories(catRes.data.data);
            setRooms(roomRes.data.data);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Gagal Mendapatkan Data Rooms and Categories")
        }
    }

    useEffect(() => {
        fetchDetail();
        fetchDataEditReport();
    }, [id]);

    const sendComment = async () => {
        if(!commentText.trim()) return;

        try {
            await apiServices.post("/report/reply_comment",{
                report_id : report.id_report,
                isi_komentar : commentText,
            }, {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            }
            );

            setCommentText("")
            fetchDetail();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Gagal Mengirimkan Komentar");
        }
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

    if(loading) return <div className="text-center text-gray-500 flex justify-center items-center h-screen">Loading ....</div>
    if(!report) return null;

    const statusConfig = {
        menunggu : {
            className : "text-[#f59e0b] bg-yellow-200",
            icon : GiSandsOfTime,
        },
        diproses : {
            className : "text-[#3b82f6] bg-blue-200",
            icon : FaGears,
        },
        selesai : {
            className : "text-[#15b5b0] bg-green-200",
            icon : HiCheckCircle,
        },
        ditolak : {
            className : "text-[#ef4444] bg-red-200",
            icon : FaTimesCircle,
        }
    };

    const StatusIcon = statusConfig[report.status].icon;

    const priorityConfig = {
        rendah : "bg-gray-200 text-gray-700",
        sedang : "bg-purple-200 text-purple-700",
        tinggi : "bg-red-200 text-red-700",
    };

    const roleConfig = {
        admin : {
            icon : LiaUserAstronautSolid,
            className :  "bg-blue-200 text-blue-800",
        },
        siswa : {
            icon : FaUserGraduate,
            className : "bg-green-200 text-green-800"
        }
    }

    return (
        <motion.div
        initial={{opacity : 0, y : 20}}
        animate={{opacity : 1, y : 0}}
        className='min-h-screen bg-gray-100 p-6'
        >
            <button 
            onClick={() => navigate("/history")}
            className="text-[#2563EB] cursor-pointer mb-4 flex items-center hover:text-[#0c3da5] gap-2">
                <MdOutlineSubdirectoryArrowLeft /> Kembali ke History
            </button>

            <div className="bg-[#ffffff] rounded-xl shadow-md p-8 relative">
                {/* Edit Icon  */}
                <CiEdit
                className='absolute top-6 right-6 cursor-pointer text-[#231f20] hover:text-[#4a4244]'
                size={20}
                onClick={() => setShowEditModal(true)}
                />

                <h1 className="text-2xl font-bold mb-3">
                    {report?.judul || "Data Sudah Terhapus"}
                </h1>

                <div className="flex gap-3 mb-6">
                    <span 
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${priorityConfig[report?.prioritas]}`}>
                        {report?.prioritas.toUpperCase() || "Data Sudah Terhapus"}
                    </span>

                    <span 
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium ${statusConfig[report.status].className}`}
                    >
                        <StatusIcon/>
                        {report?.status.toUpperCase() || "Data Sudah Terhapus"}
                    </span>
                </div>

                            <div className='grid grid-cols-2 gap-8 mb-6'>
                                <div>
                                <p className="font-semibold flex items-center gap-2">
                                    <VscLocation/>
                                    Ruangan
                                </p>
                                <p className="font-medium mb-2">{report?.room?.nama_ruang || "Data Terhapus"}</p>
                                </div>

                                <div>
                                <p className="font-semibold flex items-center gap-2">
                                    <TbCategory/>
                                    Kategori
                                </p>
                                <p className="font-medium mb-4">{report?.category?.nama_kategori || "Data Terhapus"}</p>
                                </div>

                            </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        {!imgError ? (
                            <img 
                            src={report.foto} 
                            alt={report.judul}
                            onError={() => setImgError(true)}
                            className='w-full h-60 object-cover rounded-lg border'
                            />
                        ) : (
                            <div className="w-full h-60 flex items-center justify-center border rounded-lg text-gray-400">
                                Gambar Rusak / Gambar Tidak Tersedia
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="font-sembolibold mb-1">Deskripsi</p>
                        <p className="mb-4 leading-relaxed">{report?.deskripsi || "Data Sudah Terhapus"}</p>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
                        <FaCommentDots/> Komentar
                    </h2>

                    {report.comments.length === 0 ? (
                        <div className="flex items-center gap-3 text-gray-400">
                            <FaCommentDots/>
                            Belum Ada Komentar
                        </div>
                    ) : (
                        <div className="space-y-3 mb-6">
                            {report.comments.map((comment) => {
                                const isMine = Number(comment?.user?.id_user) === Number(userId);
                                const RoleIcon = roleConfig[comment.user.role]?.icon;

                                return (
                                    <div 
                                    key={comment.id_comments}
                                    className="bg-gray-100 p-3 rounded-lg relative">
                                        <div className="flex justify-between items-start mb-1">

                                            <div className="flex gap-2 items-center">
                                                <span className="font-semibold">
                                                    {comment.user.nama}
                                                </span>

                                                <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded ${roleConfig[comment.user.role]?.className}`}>
                                                    {RoleIcon && <RoleIcon size={12}/>}
                                                    {comment.user.role}
                                                </span>

                                            </div>

                                            <div className="flex items-center gap-3">
                                            <p className="text-center text-gray-400 text-xs flex justify-end">{formatDate(comment.createdAt)}</p>

                                            {isMine && (
                                                <CiEdit
                                                className='cursor-pointer text-[#231f20] hover:text-[#4a4244]'
                                                onClick={() => {
                                                    setSelectedComment(comment);
                                                    setShowEditComment(true);
                                                }}
                                                />
                                            )}
                                            </div>
                                        </div>

                                        <p>{comment?.isi_komentar || "Data Sudah Terhapus"}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    <div className="flex gap-3 mt-4">
                        <input 
                        type="text" 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)} 
                        placeholder='Tulis Komentar...'
                        className='flex-1 border rounded-lg px-4 py-2'
                        />

                        <button 
                        onClick={sendComment}
                        className="bg-[#f59e0b] cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-[#f59e0b]">
                            Kirim
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <EditReportModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            report={report}
            rooms={rooms}
            categories={categories}
            onSuccess={fetchDetail}
            />

            <EditCommentModal
            isOpen={showEditComment}
            onClose={() => setShowEditComment(false)}
            comment={selectedComment}
            onSuccess={fetchDetail}
            />
        </motion.div>
    )
}

export default DetailReport