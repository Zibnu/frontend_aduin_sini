import React, { useEffect, useState } from 'react'
import apiServices from '../utils/api'
import { AnimatePresence, motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { MdClose } from 'react-icons/md'

function EditCommentModal({isOpen, onClose, comment, onSuccess}) {
    const token = localStorage.getItem("token");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

        useEffect(() => {
            if(isOpen) {
                document.body.classList.add('overflow-hidden');
            } else {
                document.body.classList.remove('overflow-hidden');
            }
    
            // clear function
            return () => {
                document.body.classList.remove('overflow-hidden');
            };
        }, [isOpen])
    
    useEffect(() => {
        if(comment) {
            setText(comment.isi_komentar || "");
        }
    }, [comment]);

    const handleSubmit = async () => {
        if(!text.trim()) return;

        try {
            setLoading(true)

            await apiServices.put(`/comment/update_comment/${comment.id_comments}`, {
                isi_komentar : text,
            }, {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            });

            toast.success("Komentar Berhasil Diupdate");
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Gagal Memperbarui Komentar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                    initial={{opacity : 0}}
                    animate={{opacity : 1}}
                    exit={{opacity : 0}}
                    className="fixed inset-0 bg-black/40 z-40">
                        <motion.div 
                        initial={{opacity : 0, scale : 0.8}}
                        animate={{opacity : 1, scale : 1}}
                        exit={{opacity : 0, scale : 0.8}}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <div className="bg-[#ffffff] w-full max-w-xl rounded-xl p-6 shadow-lg relative">
                                <button 
                                onClick={onClose}
                                className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-black">
                                    <MdClose size={22}/>
                                </button>

                                <h2 className="text-lg font-bold text-[#2563EB] mb-4">
                                    Edit Comment
                                </h2>

                                <label className="block text-sm font-medium mb-2">
                                    Komentar
                                </label>

                                <textarea 
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full mb-4 p-4 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none h-28 transition"
                                rows={3}
                                placeholder='Edit Komentar'
                                />

                                <button 
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full bg-[#f59e0b] hover:bg-[#d88c07] text-white font-bold py-4 rounded-lg disabled:opacity-50 transition">
                                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default EditCommentModal