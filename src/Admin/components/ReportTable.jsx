import React from 'react'

function ReportTable({reports, onStatusChange, onPriorityChange, onDetail, limit, currentPage}) {
    return (
        <table className='w-full bg-[#ffffff] rounded-lg shadow mt-4'>
            <thead className="bg-gray-100">
                <tr>
                    <th>No</th>
                    <th>Pelapor</th>
                    <th>Laporan</th>
                    <th>Ruangan</th>
                    <th>Category</th>
                    <th>Prioritas</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            </thead>

            <tbody>
                {reports.map((report, index) => (
                    <tr key={report.id_report} className='border border-gray-300'>
                        <td>{(currentPage - 1) * limit + (index + 1)}</td>
                        <td>{report.user?.nama}</td>
                        <td>{report?.judul}</td>
                        <td>{report.room?.nama_ruang || "-"}</td>
                        <td>{report.category?.nama_kategori}</td>
                        <td>
                            <select 
                            value={report.prioritas} 
                            onChange={(e) => onPriorityChange(report.id_report, e.target.value)}
                            className='bg-gray-200 px-2 py-1 rounded'
                            >
                                <option value="tinggi">High</option>
                                <option value="sedang">Medium</option>
                                <option value="rendah">Low</option>
                            </select>
                        </td>

                        <td>
                            <select 
                            value={report.status} 
                            onChange={(e) => onStatusChange(report.id_report, e.target.value)}
                            className='bg-gray-200 px-2 py-1 rounded'
                            >
                                <option value="menunggu">Waiting</option>
                                <option value="diproses">Processing</option>
                                <option value="selesai">Finished</option>
                                <option value="ditolak">Canceled</option>
                            </select>
                        </td>

                        <td>
                            <button
                            className='bg-[#f59e0b] text-white cursor-pointer px-3 py-1 rounded'
                            onClick={() => onDetail(report.id_report)}
                            >
                                View
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ReportTable