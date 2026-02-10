import React from 'react'

function StatusCard({label, value, icon : Icon, color}) {
    return (
        <div className='flex justify-between items-center py-2'>
            <div className="flex items-center gap-3">
                <Icon size={24} className={color} />
                <span className='font-medium'>{label}</span>
            </div>
            <span className='font-medium'>{value}</span>
        </div>
    )
}

export default StatusCard