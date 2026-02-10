import React, { useEffect, useState } from 'react'
import { MdNotificationsActive } from "react-icons/md";
import apiServices from '../../utils/api';
import toast from 'react-hot-toast';

function TopBar({title}) {
    const [admin, setAdmin] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchAdmin = async () => {
            try {
                const res = await apiServices.get("/auth/myData", {
                    headers : {
                        Authorization : `Bearer ${token}`,
                    },
                });

                setAdmin(res.data.data);
            } catch (error) {
                console.error(error);
                toast.error(error.response?.data?.message || "Gagal Mendapatkan Data Name Admin");
            }
        };

        fetchAdmin();
    }, []);

    return (
        <div className='ml-60 bg-[#ffffff] shadow-sm p-4 flex justify-between items-center'>
            <h2 className="text-xl font-semibold">{title}</h2>

            <div className="flex items-center gap-4">
                <MdNotificationsActive size={24}/>
                <div>
                    <p className="text-lg text-[#334155] font-semibold font-serif">Selamat Datang {admin?.nama || "-"}</p>
                </div>
            </div>
        </div>
    )
}

export default TopBar