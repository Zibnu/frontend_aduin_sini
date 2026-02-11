import React, { useEffect, useState } from 'react'
import apiServices from '../../utils/api'
import toast from 'react-hot-toast'

import ReportFilter from '../components/ReportFilter'
import ReportTable from '../components/ReportTable'
import Pagination from '../components/Pagination'
import ReportDetailModal from '../components/ReportDetailModal'

function ManageReport() {
    const token = localStorage.getItem("token");

    const [reports, setReports] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [detail, setDetail] = useState(null);

    const fetchReports = async () => {
        try {
            const res = await apiServices.get("/report/all_reports", {
                headers : { Authorization : `Bearer ${token}`},
                params : {
                    page,
                    status,
                    prioritas : priority,
                },
            });

            setReports(res.data.data);
            setPagination(res.data.pagination);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Gagal Mendapatkan Data Report in Admin");
        }
    };

    useEffect(() => {
        fetchReports();
    }, [page, status, priority]);

    const updateStatus = async (id, value) => {
        await apiServices.patch(`/report/update_status/${id}`,
            { status : value},
            {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            },
        );
        fetchReports();
        toast.success(`Update Status to ${value} Success`)
    };

    const updatePriority = async (id, value) => {
        await apiServices.patch(`/report/update_prioritas/${id}`,
            {prioritas : value},
            {
                headers : {
                    Authorization : `Bearer ${token}`,
                },
            },
        );
        fetchReports();
        toast.success(`Update Prioritas to ${value} Success`)
    }

    const getDetail = async (id) => {
        const res = await apiServices.get(`/report/report_detail/${id}`, {
            headers : {
                Authorization : `Bearer ${token}`,
            },
        });
        setDetail(res.data.data);
    };

    const exportPDF = async () => {
        window.open(
            `${import.meta.env.VITE_BASE_URL}/report/export_pdf` ,
            "_blank"
        );
        toast.success("Export PDF success")
    };

    return (
        <div className='p-6'>
            <ReportFilter
            status={status}
            priority={priority}
            setStatus={setStatus}
            setPriority={setPriority}
            onExport={exportPDF}
            />

            <ReportTable
            reports={reports}
            onStatusChange={updateStatus}
            onPriorityChange={updatePriority}
            onDetail={getDetail}
            limit={pagination.itemsPerPage}
            currentPage={pagination.currentPage}
            />

            <Pagination
            currentPage={pagination.currentPage || 1}
            totalPages={pagination.totalPages || 1}
            setPage={setPage}
            />

            <ReportDetailModal
            data={detail}
            onClose={() => setDetail(null)}
            />
        </div>
    )
}

export default ManageReport