import React from 'react'
import { motion } from 'framer-motion';
import apiServices from '../../utils/api';
import toast from 'react-hot-toast';

function DeleteModal({open, type, item, onClose, onSuccess}) {
    if(!open || !item) return null;
    const token = localStorage.getItem("token")

    const name = item.nama_kelas || item.nama_ruang || item.nama_kategori;

    const handleDelete = async () => {
        try {
            let message;
            if(type === "class") {
                await apiServices.delete(`/class/del_class/${item.id}`, {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                });
                message = `Delete Class ${item.nama_kelas} Success`;
            }

            if(type === "room") {
                await apiServices.delete(`/room/del_room/${item.id}`, {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                });
                message = `Delete Room ${item.nama_ruang} Success`;
            }

            if(type === "category") {
                await apiServices.delete(`/category/del_category/${item.id}`, {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                });
                message = `Delete Category ${item.nama_kategori} Success`
            }

            toast.success(message)
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Delete Resource Failed")
        }
    };
    return (
        <div className='fixed inset-0 bg-black/40 flex justify-center items-center'>
            <motion.div 
            initial={{scale : 0.8, opacity : 0}}
            animate={{scale : 1, opacity : 1}}
            className="bg-white p-6 rounded-lg w-100">
                <h2 className="text-lg font-semibold mb-4">
                    Delete {type}
                </h2>

                <p className="mb-4">
                    Apakah kamu yakin ingin menghapus <b>{name}</b> ? tindakan in bersifat permanen
                </p>

                <div className="flex gap-3">
                    <button 
                    onClick={onClose}
                    className="flex-1 bg-gray-500 text-white py-3 rounded-lg cursor-pointer">
                        Canceled
                    </button>

                    <button 
                    onClick={handleDelete}
                    className="flex-1 bg-red-500 text-white py-3 rounded-lg cursor-pointer">
                        Delete
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default DeleteModal