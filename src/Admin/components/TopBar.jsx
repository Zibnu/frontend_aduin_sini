import React from 'react'
import { MdNotificationsActive } from "react-icons/md";
import apiServices from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

function TopBar({title = "Dashboard Admin"}) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    
    const fetchNotifications = async () => {
        const res = await apiServices.get("/notif/my_notif", {
            headers : {
                Authorization : `Bearer ${token}`,
            },
        });
        return res.data.data;
    };

    const { data : notifcations = []} = useQuery({
        queryKey : ["notifications"],
        queryFn : fetchNotifications,
        enabled : !!token,
        refetchInterval : 5000,
        refetchOnWindowFocus : true,
    });

    const hasUnread = notifcations.some((n) => !n.is_read);

    const fetchUser = async () => {
        const res = await apiServices.get("/auth/myData", {
            headers : {
                Authorization : `Bearer ${token}`,
            },
        });
        return res.data.data;
    };

    const {data : user} = useQuery({
        queryKey : ["myData"],
        queryFn : fetchUser,
        enabled : !!token,
    });

    return (
        <div className="bg-[#ffffff] shadow rounded-lg p-5 flex justify-between items-center">
            <h1 className="text-xl font-semibold">{title}</h1>

            <div className="flex items-center gap-6">
                <button 
                onClick={() => navigate("/admin/notifications")}>
                    <MdNotificationsActive
                    size={24}
                    className={`transition-all cursor-pointer duration-300${
                        token && hasUnread ? "text-red-500 animate-pulse drop-shadow-[0_0_4px_rgba(239,68,68,0.7)]" : ""
                    }`}
                    />
                </button>

                <span className="font-medium">
                    Welcome {user?.nama || "Admin"}
                </span>
            </div>
        </div>
    )
}

export default TopBar