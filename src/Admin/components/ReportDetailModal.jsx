import React from 'react'
import ReportDetailContent from './report/ReportDetailContent'
import { motion } from 'framer-motion';

function ReportDetailModal({report, token, userId, onClose, onRefresh}) {
    if(!report) return null;

    return (
        <div className='fixed inset-0 bg-black/40 flex justify-center items-center z-50'>
            <motion.div 
            initial={{scale : 0.8}}
            animate={{scale : 1}}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-255 max-h-[90vh] overflow-y-auto rounded-lg p-6">
                <ReportDetailContent
                report={report}
                token={token}
                userId={userId}
                onRefresh={onRefresh}
                />

                <button 
                onClick={onClose}
                className="mt-6 bg-gray-600 text-white px-4 py-2 rounded">
                    Close
                </button>
            </motion.div>
        </div>
    )
}

export default ReportDetailModal