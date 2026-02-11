import React from 'react'
import { FaRegFilePdf } from "react-icons/fa6";

function ReportFilter({status, priority, setStatus, setPriority, onExport}) {
    return (
        <div className='bg-[#ffffff] p-5 rounded-lg shadow flex justify-between items-center'>
            <div className="flex gap-4">

                <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className="px-3 py-2 cursor-pointer rounded-md bg-gray-100">
                    <option value="" >All Status</option>
                    <option value="menunggu">Waiting</option>
                    <option value="diproses">Processing</option>
                    <option value="selesai">Finished</option>
                    <option value="ditolak">Canceled</option>
                </select>

                <select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value)}
                className="px-3 py-2 cursor-pointer rounded-md bg-gray-100">
                    <option value="" >All Priority</option>
                    <option value="tinggi">High</option>
                    <option value="sedang">Medium</option>
                    <option value="rendah">Low</option>
                </select>
            </div>

            <button 
            onClick={onExport}
            className="flex items-center gap-2 bg-[#f59e0b] cursor-pointer text-white hover:bg-[#cc8914] px-4 py-2 rounded-md">
                <FaRegFilePdf/>
                Export PDF
            </button>
        </div>
    )
}

export default ReportFilter