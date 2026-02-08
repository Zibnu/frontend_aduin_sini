import React, { useEffect, useState } from 'react'
import apiServices from '../utils/api'
import toast from 'react-hot-toast'
import { MdOutlineCloudUpload } from "react-icons/md";
import { motion } from 'framer-motion';

function CreateReport() {
    const token = localStorage.getItem("token");

    const [categories, setCategories] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [form, setForm] = useState({
        judul : "",
        deskripsi : "",
        prioritas : "",
        category_id : "",
        room_id : "",
        foto : null,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, roomRes] = await Promise.all([
                    apiServices.get("/category/get_all_category"),
                    apiServices.get("/room/get_all_room"),
                ]);

                setCategories(catRes.data.data);
                setRooms(roomRes.data.data);
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || "Gagal Mengambil Data Category and Room in Create Report");
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const handleFile = (e) => {
        const file = e.target.files[0];

        if(!file) return;

        if(file.size > 5 * 1024 * 1024) {
            toast.error("Ukuran Gambar Max 5 Mb");
            return;
        }

        setForm({...form, foto : file});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!token) {
            toast.error("Silahkan Login Terlebih Dahulu");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("judul", form.judul);
            formData.append("deskripsi", form.deskripsi);
            formData.append("prioritas", form.prioritas);
            formData.append("category_id", form.category_id);
            formData.append("room_id", form.room_id);
            formData.append("foto", form.foto);

            await apiServices.post("/report/create_report", formData, {
                headers : {
                    Authorization : `Bearer ${token}`,
                    // "Content-Type" : "multipart/form-data",
                },
            });

            toast.success("Laporan Berhasil Dikirim");

            setForm({
                judul : "",
                deskripsi : "",
                prioritas : "",
                category_id : "",
                room_id : "",
                foto : null,
            });
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Gagal Mengirim Laporan");
        } finally {
            setLoading(false);
        }
    };
    return (
        <motion.div
        initial={{opacity : 0, y : 20}}
        animate={{opacity : 1, y : 0}}
        className='min-h-screen bg-[#ecedec] rounded-2xl p-8 flex justify-center'
        >
            <form 
            onSubmit={handleSubmit}
            className="w-full max-w-3xl bg-[#ecedec] rounded-2xl p-8 shadow">
                <h2 className="text-2xl text-[#2563eb] font-bold mb-6">Buat Laporan Baru</h2>

                <input 
                type="text" 
                name='judul'
                value={form.judul}
                onChange={handleChange}
                placeholder='Judul Laporan'
                className='w-full mb-4 p-4 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition'
                required
                />

                <textarea 
                name='deskripsi'
                value={form.deskripsi}
                onChange={handleChange}
                placeholder='Deskripsi'
                className='w-full mb-4 p-4 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none h-28 transition'
                required
                />

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <select 
                    name="prioritas" 
                    value={form.prioritas}
                    onChange={handleChange}
                    className='w-full p-4 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition'
                    required
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
                    className='w-full p-4 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition'
                    required
                    >
                        <option value="">Ruangan</option>
                        {rooms.map((room) => (
                            <option 
                            key={room.id_room}
                            value={room.id_room}
                            >
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
                    required
                    >
                        <option value="">Kategori</option>
                        {categories.map((cat) => (
                            <option 
                            key={cat.id_category}
                            value={cat.id_category}
                            >
                                {cat.nama_kategori}
                            </option>
                        ))}
                    </select>

                    <label className='w-full mb-6 flex items-center gap-3 p-4 cursor-pointer rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition'>
                        <MdOutlineCloudUpload />
                        <span>
                            {form.foto ? form.foto.name : "Upload foto Kerusakan (MAX 5MB)"}
                        </span>
                        <input 
                        type="file" 
                        hidden 
                        accept='image/*' 
                        onChange={handleFile}
                        />
                    </label>

                    <button 
                    type="submit"
                    disabled={loading}
                    className='w-full bg-[#f59e0b] hover:bg-[#d88c07] text-white font-bold py-4 rounded-lg disabled:opacity-50 transition'
                    >
                        {loading ? "Mengirim..." : "Kirim Laporan"}
                    </button>
            </form>
        </motion.div>
    )
}

export default CreateReport