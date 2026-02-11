import React, { useState } from 'react'
import apiServices from '../../../utils/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { CiEdit } from "react-icons/ci";
import { FaCommentDots } from "react-icons/fa";

import EditCommentModal from '../../../components/EditCommentModal';

function ReportDetailContent({report, token, userId, onRefresh}) {
    const [commentText, setCommentText] = useState("");
    const [showEditComment, setShowEditComment] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);

    if(!report) return null;

    const sendComment = async () => {
        if(!commentText.trim()) return;

        try {
            await apiServices.post(`/report/add_comment/${report.id_report}`, 
                {isi_komentar : commentText},
                {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                },
            );

            setCommentText("");
            onRefresh();
            toast.success("Add Comment by Admin Success");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message);
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

    return (
        <motion.div
        initial={{opacity : 0}}
        animate={{opacity : 1}}
        >
            <h1 className="text-2xl font-bold mb-4">
                {report.judul}
            </h1>

            <img 
            src={report.foto}
            alt="foto report"
            className='w-full h-60 object-cover rounded mb-6'
            />

            <p className="mb-6">{report.deskripsi}</p>

            <h3 className="flex items-center gap-2 font-semibold text-lg mb-4">
                <FaCommentDots/> Comment
            </h3>

            <div className="space-y-3 mb-6">
                {report?.comments?.map((comment) => {
                    const isMine = Number(comment.user.id_user) === Number(userId);

                    return (
                        <div
                        key={comment.id_comments}
                        className="bg-gray-100 p-3 rounded-lg">
                            <div className="flex justify-between mb-1">
                                <span className="font-semibold">
                                    {comment.user.nama}
                                </span>

                                <div className="flex gap-3 items-center">
                                    <span className="text-xs text-gray-400">
                                        {formatDate(comment.createdAt)}
                                    </span>

                                    {isMine && (
                                        <CiEdit
                                        className='cursor-pointer'
                                        onClick={() => {
                                            setSelectedComment(comment)
                                            setShowEditComment(true)
                                        }}
                                        />
                                        )
                                    }
                                </div>
                            </div>

                            <p>{comment.isi_komentar}</p>
                        </div>
                    );
                })}
            </div>

            <div className="flex gap-3">
                <input 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 border rounded px-4 py-2"
                placeholder='Type Comment Hire...'
                />

                <button 
                onClick={sendComment}
                className="bg-[#f59e0b] cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-[#f59e0b]">
                    Send
                </button>
            </div>

            <EditCommentModal
            isOpen={showEditComment}
            onClose={() => setShowEditComment(false)}
            comment={selectedComment}
            onSuccess={onRefresh}
            />
        </motion.div>
    )
}

export default ReportDetailContent