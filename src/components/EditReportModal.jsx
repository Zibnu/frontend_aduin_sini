import React, { useEffect, useState } from 'react'
import apiServices from '../utils/api'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { MdOutlineCloudUpload } from "react-icons/md";

function EditReportModal({ isOpen, onClose, report, rooms = [], categories = [], onSuccess }) {
    const token = localStorage.getItem("token");

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

    const [form, setForm] = useState({
        judul: "",
        deskripsi: "",
        prioritas: "",
        room_id: "",
        category_id: "",
        foto: null,
    });

    useEffect(() => {
        if (report) {
            setForm({
                judul: report.judul || "",
                deskripsi: report.deskripsi || "",
                prioritas: report.prioritas || "",
                room_id: report.room_id || "",
                category_id: report.category_id || "",
                foto: null,
            });
        }
    }, [report]);

    // const handleChange = (e) => {
    //     const { name, value, files } = e.target;

    //     if (files) {
    //         setForm((prev) => ({ ...prev, [name]: files[0] }));
    //     } else {
    //         setForm((prev) => ({ ...prev, [name]: value }));
    //     }
    // };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const handleFile = (e) =>  {
        const file = e.target.files[0];

        if(!file) return;

        const allowedtypes = [
            "image/jpeg",
            "image/jpg",
            "image/png"
        ];

        if(!allowedtypes.includes(file.type)) {
            toast.error("Format File hanya JPG, JPEG, dan PNG");
            e.target.value = null; //reset input
            return;
        };

        if(file.size > 5 * 1024 * 1024) {
            toast.error("Ukuran Gambar Max 5Mb");
            return;
        }

        setForm({...form, foto : file});
    }

    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            Object.keys(form).forEach((key) => {
                if (form[key] !== null) {
                    formData.append(key, form[key]);
                }
            });

            await apiServices.put(`/report/update_report/${report.id_report}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            toast.success("Laporan Berhasil Diupdate");
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Gagal Update Laporan");
        }
    };
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-lg p-6 shadow-lg overflow-y-auto ">
                                <h2 className="text-xl font-semibold text-[#2563EB] mb-4 gap-3]">
                                    Edit Laporan
                                </h2>

                                <div className="space-y-4">
                                    <input
                                        name='judul'
                                        value={form.judul}
                                        onChange={handleChange}
                                        placeholder='Judul Laporan'
                                        type="text"
                                        className='w-full mb-4 p-4 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition'
                                    />

                                    <textarea
                                        name="deskripsi"
                                        value={form.deskripsi}
                                        onChange={handleChange}
                                        placeholder='Deksripsi'
                                        className='w-full mb-4 p-4 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition'
                                    />

                                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                                        <select
                                            name="prioritas"
                                            value={form.prioritas}
                                            onChange={handleChange}
                                            className='w-full mb-4 p-4 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition'
                                        >
                                            <option value="" disabled>Prioritas</option>
                                            <option value="rendah">Rendah</option>
                                            <option value="sedang">Sedang</option>
                                            <option value="tinggi">Tinggi</option>
                                        </select>

                                        <select
                                            name="room_id"
                                            value={form.room_id}
                                            onChange={handleChange}
                                            className='w-full mb-4 p-4 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition'
                                        >
                                            <option value="" disabled>Ruangan</option>
                                            {rooms.map((room) => (
                                                <option 
                                                key={room.id_room}
                                                value={room.id_room}>
                                                    {room.nama_ruang}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                        <select 
                                        name="category_id" 
                                        value={form.category_id}
                                        onChange={handleChange}
                                        className='w-full mb-4 p-4 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition'
                                        >
                                            <option value="" disabled>Kategori</option>
                                            {categories.map((cat) => (
                                                <option 
                                                key={cat.id_category}
                                                value={cat.id_category}>
                                                    {cat.nama_kategori}
                                                </option>
                                            ))}
                                        </select>

                                        <label className="w-full mb-6 flex items-center gap-3 p-4 cursor-pointer rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition">
                                            <MdOutlineCloudUpload/>
                                            <span>
                                                {form.foto ? form.foto.name : "Upload Foto Kerusakan Baru"} <span className="text-red-500 text-xs">(JPG/PNG MAX 5Mb)</span>
                                            </span>
                                            <input 
                                            type="file" 
                                            hidden
                                            accept='.jpg, .jpeg, .png, image/jpeg, image/png'
                                            onChange={handleFile}
                                            />
                                        </label>

                                        <div className="flex justify-end gap-2 mt-4">
                                            <button 
                                            type='button'
                                            onClick={onClose}
                                            className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer">
                                                Kembali
                                            </button>
                                            <button 
                                            onClick={handleSubmit}
                                            className="px-4 py-2 bg-[#f59e0b] hover:bg-[#d88c07] text-white font-bold rounded-lg cursor-pointer transition">
                                                Simpan
                                            </button>
                                        </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default EditReportModal