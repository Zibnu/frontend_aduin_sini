import React, { useState } from 'react'
import { motion } from 'framer-motion'
import apiServices from '../../utils/api';
import toast from "react-hot-toast";
import { MdClose } from 'react-icons/md'

function AddModal({open, type , onClose, onSuccess}) {
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    if(!open) return null;

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            let message;

            if(type === "class") {
                await apiServices.post("/class/add_class", form, {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                });
                message = "Add Class Success";
            }

            if(type === "room") {
                await apiServices.post("/room/create_room", form, {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                });
                message = "Add Room Success";
            }

            if(type === "category") {
                await apiServices.post("/category/create_category", form, {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                });
                message = "Add Category Success";
            }
            toast.success(message)
            onSuccess();
            onClose();
            setForm({});
        } catch (error) {
            console.error(error);
            toast(error.response?.data?.message || "Gagal Menambahkan Data Resource");
        } finally {
            setLoading(false);
        }
    };
    
    const renderForm = () => {

        if(type === "class") {
            return (
                <>
                    <input 
                    name="nama_kelas" 
                    placeholder='Nama Kelas'
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition"
                    />

                    <select 
                    name="tingkat" 
                    defaultValue=""
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition">
                        <option value="" disabled>Pilih Tingkat</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>

                    <select 
                    name="jurusan" 
                    onChange={handleChange}
                    defaultValue=""
                    className="w-full px-4 py-2 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition">
                            <option value="" disabled>
                                Pilih Jurusan
                            </option>
                        {["PPLG", "TO", "RPL", "PG", "TSM", "TOT"].map(j => (
                            <option key={j} value={j}>
                                {j}
                            </option>
                        ))}
                    </select>
                </>
            );
        }

        if(type === "room") {
            return (
                <>
                    <input 
                    name='nama_ruang'
                    placeholder="Nama Room" 
                    onChange={handleChange}
                    className='w-full px-4 py-2 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition'
                    />

                    <select 
                    name="tipe"
                    onChange={handleChange}
                    defaultValue=""
                    className='w-full px-4 py-2 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition'
                    >
                        <option
                        value=""
                        disabled
                        >
                            Pilih Tipe Ruang
                        </option>
                        {["kelas", "lab", "bengkel", "ruang_guru", "organisasi", "lainnya"].map(t => 
                        <option key={t}>
                            {t}
                        </option>)}
                    </select>
                </>
            );
        }

        if(type === "category") {
            return (
                <input 
                type="text" 
                placeholder='Nama Kategori'
                name='nama_kategori'
                onChange={handleChange}
                className='w-full px-4 py-2 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition'
                />
            );
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <motion.div 
            initial={{scale : 0.9}}
            animate={{scale : 1}}
            className="bg-white p-6 rounded-lg w-105 space-y-4">
                <button 
                onClick={onClose}
                className="top-4 right-4 cursor-pointer text-gray-500 hover:text-black">
                    <MdClose size={22}/>
                </button>
                <h2 className="text-xl font-bold text-[#2563EB] text-center">
                    Add {type}
                </h2>

                {renderForm()}

                <button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[#F59E0B] hover:bg-[#c6820b] text-white py-2 rounded-lg font-semibold transition disabled:opacity-70">
                    {loading ? "loading..." : "Tambahkan"}
                </button>
            </motion.div>
        </div>
    )
}

export default AddModal