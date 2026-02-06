import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authImage from "../assets/images/hrtoAuth.png"
import apiServices from '../utils/api'
import { motion } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nis : "",
        password : "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {name , value} = e.target;
        setForm((prev) => ({...prev, [name] : value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // if(!form.nama || !form.password) {
        //     return toast.error("Semua Field Wajib Diisi");
        // };

        try {
            const res = await apiServices.post("/auth/login", form);

            const token = res.data.token;
            const user = res.data.data.id_user;
            const role = res.data.data.role;

            if(!token) {
                console.error("Token Not Found in Response");
                toast.error("Login Gagal : Token Not Found");
                return
            };
            localStorage.setItem("token",token);
            localStorage.setItem("userId", user);
            localStorage.setItem("role", role);

            toast.success("Berhasil Login")

            if(role === "admin") {
                navigate("/admin/dashboard");
            }else {
                navigate("/")
            }
        } catch (error) {
            const status = error.response.status;
            const messageError = error.response.data.message;

            if(status === 404) {
                toast.error("Akun Belum Terdaftar");
            } else if( status === 401) {
                toast.error("Password Salah");
            } else {
                toast.error(messageError || "Internal Server Error");
            }
        }finally {
            setLoading(false);
        }
    };

    if(error) return <div className="text-center text-red-500">{error}</div>
    
    return (
        <div className='min-h-screen flex items-center justify-center bg-[#F1F5F9] px-4'>
            <motion.div 
            initial={{ opacity : 0, y : 30 }}
            animate={{ opacity : 1, y : 0 }}
            className="bg-white rounded-2xl shadow-lg flex w-full max-w-4xl overflow-hidden">
                {/* Left */}
                <div className="hidden md:flex w-1/2 bg-[#2563EB] text-white p-8 flex-col items-center justify-center gap-6 text-center">
                    <img 
                    src={authImage} 
                    alt="Hero Auth" 
                    className="w-full max-w-[240px] object-contain" />
                    <p className="text-lg md:text-xl font-semibold leading-relaxed">
                        Ayo Laporkan Sarana dan Prasana Sekolah yang Mengalami Kerusakan
                    </p>
                </div>

                {/* Right */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                    <form onSubmit={handleSubmit} className='space-y-4'>
                        <input 
                        type="text" 
                        name='nis'
                        placeholder='NIS'
                        value={form.nis}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-2 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition'
                        />

                        <input 
                        type="password" 
                        name='password'
                        placeholder='Password'
                        value={form.password}
                        onChange={handleChange}
                        required
                        className='w-full px-4 py-2 rounded-lg border border-[#CBD5E1] placeholder-[#334155] focus:ring-2 focus:ring-[#3B82F6] outline-none transition'
                        />

                        <hr className="border-gray-400 mb-3" />

                        <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#F59E0B] hover:bg-[#c6820b] text-white py-2 rounded-lg font-semibold transition disabled:opacity-70"
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>

                        <div className="mt-4 text-center">
                            <p className="text-sm text-[#334155]">
                                Belum Punya Akun? {" "}
                                <Link 
                                to="/regis"
                                className='text-[#2563EB] font-semibold'
                                >
                                    Daftar
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    )
}

export default Login