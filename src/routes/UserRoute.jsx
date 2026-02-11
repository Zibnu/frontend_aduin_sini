import React from 'react'
import { Navigate } from 'react-router-dom'

function UserRoute({children}) {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if(!token) {
        return <Navigate to="/login" replace/>
    }

    if(role !== "siswa") {
        return <Navigate to="/admin/dashboard" replace/>
    }

    return children;
}

export default UserRoute