import React from 'react'
import { FaPhone, FaEnvelope } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer
        className='bg-[#1e293b] text-[#f8fafc] py-8 px-6 mt-10'
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand */}
                <div>
                    <h2 className='font-bold text-lg mb-2'>Aduin_sini</h2>
                    <p className="text-sm leading-relaxed opacity-90">
                        Platform Pengaduan Kerusakan Sarana dan Prasarana Sekolah
                    </p>
                </div>

                <div className="md:text-center">
                    <h3 className="font-semibold text-lg mb-2">Halaman</h3>
                    <ul className="space-y-1">
                        <li>
                            <Link 
                            to={"/"}
                            className='hover:underline hover:text-[#c5c6c7] transition-all'
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                            to={"/history"}
                            className='hover:underline hover:text-[#c5c6c7] transition-all'
                            >
                                History
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="md:text-right">
                    <h3 className="font-semibold text-lg mb-3">Kontak</h3>
                    <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2 justify-start md:justify-end">
                            <FaPhone/> +62 8202-9772-9982
                        </p>
                        <p className="flex items-center gap-2 justify-start md:justify-end">
                            <FaEnvelope/> aduin_sini@gmail.com
                        </p>
                    </div>
                </div>
            </div>

            <hr className="border-gray-500 my-6" />
            {/* Copyright */}
            <div className="text-center text-xs opacity-60">
                <p> &copy; {new Date().getFullYear()} aduin_sini. All Right Reserved</p>
            </div>
        </footer>
    )
}

export default Footer