import React from 'react'

function ReportDetailModal({data, onClose}) {
    if(!data) return null;
    return (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
            <div className="bg-[#ffffff] p-6 rounded-lg w-[500px]">
                <h2 className="text-xl font-bold mb-4">{data.judul}</h2>

                <img 
                src={data.foto} 
                alt="foto fasilitas rusak" 
                className='w-full h-48 object-cover mb-4'
                />

                <p>{data.deskripsi}</p>

                <button 
                onClick={onClose}
                className="mt-4 bg-gray-800 text-white px-4 py-2 rounded">
                    Close
                </button>
            </div>
        </div>
    )
}

export default ReportDetailModal