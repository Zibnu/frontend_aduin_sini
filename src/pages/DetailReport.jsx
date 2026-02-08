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

function DetailReport() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

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
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Gagal Mendapatkan Detail Report");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetail();
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

    return (
        <motion.div
        initial={{opacity : 0, y : 20}}
        animate={{opacity : 1, y : 0}}
        className='min-h-screen bg-gray-100 p-6'
        >
            <button 
            onClick={() => navigate("/history")}
            className="text-[#2563EB] mb-4 flex items-center gap-2">
                <MdOutlineSubdirectoryArrowLeft /> Kembali ke History
            </button>

            <div className="bg-[#ffffff] rounded-xl shadow-md p-8 relative">
                {/* Edit Icon  */}
                <CiEdit
                className='absolute top-6 right-6 cursor-pointer text-gray-500 hover:text-black'
                size={20}
                onClick={() => console.log("Edit Report testing")}
                />

                <h1 className="text-2xl font-bold mb-3">
                    {report.judul}
                </h1>

                <div className="flex gap-3 mb-6">
                    <span 
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${priorityConfig[report.prioritas]}`}>
                        {report.prioritas}
                    </span>

                    <span 
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${statusConfig[report.status]}`}>
                        {report.status}
                    </span>
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
                        <p className="font-semibold mb-1">Ruangan</p>
                        <p className="mb-4">{report.room.nama_ruang}</p>

                        <p className="font-semibold mb-1">Kategori</p>
                        <p className="mb-4">{report.category.nama_kategori}</p>

                        <p className="font-semibold mb-1">Deskripsi</p>
                        <p className="mb-4">{report.deskripsi}</p>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="flex items-center gap-2 font-semibold text-lg mb-4"><FaCommentDots/> Komentar</h2>

                    {report.comments.length === 0 ? (
                        <div className="flex items-center gap-3 text-gray-400">
                            <FaCommentDots/>
                            Belum Ada Komentar
                        </div>
                    ) : (
                        <div className="space-y-3 mb-6">
                            {report.comments.map((comment, index) => (
                                <div 
                                key={index}
                                className="bg-gray-100 p-3 rounded-lg">
                                    {comment.isi_komentar}
                                </div>
                            ))}
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
                        className="bg-[#f59e0b] text-white px-6 py-2 rounded-lg hover:bg-[#cc8d20]">
                            Kirim
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default DetailReport