import { useEffect, useState } from 'react'
import apiServices from '../utils/api'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Link,useNavigate } from 'react-router-dom'
import authImage from "../assets/images/authImage.png"

function Regis() {
    const [form , setForm] = useState({
        nama : "",
        nis : "",
        password : "",
        class_id : "",
    });
    const [classes, setClasses] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await apiServices.get("/class/get_allClass");
                setClasses(res.data.data)
            } catch (error) {
                toast.error(error.response?.data?.message || "Gagal Mendapatkan Data Class");
                console.error(error.response?.data?.message);
            }
        };
        fetchClasses();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name] : e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await apiServices.post("/auth/regis", form);
            toast.success("Regis Berhasil Silahkan Login");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Register Gagal");
            console.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    if(error) return <div className="text-center text-red-500">{error}</div>
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] px-4">
        <motion.div 
        initial={{ opacity : 0, y : 30}}
        animate={{ opacity : 1, y : 0}}
        className="bg-[#FFFFFF] rounded-2xl shadow-lg flex w-full max-w-4xl overflow-hidden">
            {/* Left */}
            <div className="hidden md:flex w-1/2 bg-[#2563EB] text-white p-8 flex-col justify-center">
                <img src={authImage} alt="Hero Auth" className="w-48 sm:w-56 md:w-64 mt-4" />
                <p className="text-2xl font-bold mb-4">
                    Ayo Laporkan Sarana dan Prasarana
                </p>
                <p className="text-sm opacity-90">
                    Sekolah yang Mengalami Kerusakan
                </p>
            </div>

            {/* Right */}
            <div className="w-full md:w-1/2 p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                    type="text"
                    name="nama"
                    placeholder="Nama"
                    className="w-full px-4 py-2 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition"
                    onChange={handleChange}
                    />

                    <input
                    type="text"
                    name="nis"
                    placeholder="NIS"
                    className="w-full px-4 py-2 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition"
                    onChange={handleChange}
                    />

                    <select 
                    name="class_id" 
                    className="w-full px-4 py-2 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition"
                    onChange={handleChange}
                    defaultValue=""
                    >
                        <option value="" disabled>
                            Pilih Kelas
                        </option>
                        {classes.map((cls) => (
                            <option key={cls.id_class} value={cls.id_class}>
                                {cls.nama_kelas}
                            </option>
                        ))}
                    </select>

                        <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition"
                        onChange={handleChange}
                        />

                        <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#F59E0B] hover:bg-[#c6820b] text-white py-2 rounded-lg font-semibold transition"
                        >
                            {loading ? "loading" : "Regis"}
                        </button>
                        <div className="mt-4 text-center">
                            <p className="text-sm text-[#FFFFFF]">
                                Sudah Punya Akun?{" "}
                                <Link 
                                to="/login"
                                className='text-[#2563EB] font-semibold'
                                >
                                    Masuk
                                </Link>
                            </p>
                        </div>
                </form>
            </div>
        </motion.div>
    </div>
  )
}

export default Regis