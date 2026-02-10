import React from 'react'

function DashboardCard({title, value, icon : Icon, color}) {
    return (
        <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-lg flex justify-between items-center transition'>
            <div>
                <h2 className={`text-lg font-semibold ${color}`}>{title}</h2>
                <h4 className={`text-xl font-bold text-center ${color}`}>{value}</h4>
            </div>
            <Icon size={40} className={color} />
        </div>
    );
}

export default DashboardCard