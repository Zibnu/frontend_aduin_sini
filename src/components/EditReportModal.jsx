import React, { useEffect, useState } from 'react'
import apiServices from '../utils/api'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

function EditReportModal({isOpen, onClose, report, rooms = [], categories =[], onSuccess}) {
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        judul : "",
        deskripsi : "",
        prioritas : "",
        room_id : "",
        category_id : "",
        foto : null,
    });

    useEffect(() => {
        if(report) {
            setForm({
                judul : report.judul || "",
                deskripsi : report.deskripsi || "",
                prioritas : report.prioritas || "",
                room_id : report.room_id || "",
                category_id : report.category_id || "",
                foto : null,
            });
        }
    }, [report]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if(files) {
            setForm((prev) => ({ ...prev, [name] : files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name] : value }));
        }
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            
        } catch (error) {
            
        }
    }
    return (
        <div>EditReportModal</div>
    )
}

export default EditReportModal