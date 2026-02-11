import React from 'react'
import { motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa6'
import { RiDeleteBin6Line } from "react-icons/ri";

function ResorceCard({title, type,data, displayKey, onAdd, onDelete}) {
    return (
        <div className='bg-white rounded-lg shadow p-4 flex flex-col h-80'>
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg">{title}</h2>

                <button 
                onClick={() => onAdd(type)}
                className="bg-[#f59e0b] text-white p-2 cursor-pointer rounded-lg">
                    <FaPlus />
                </button>
            </div>

            {/* Scroll */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                {data.map((item) => (
                    <motion.div 
                    key={item.id}
                    initial={{opacity : 0, y : 5}}
                    animate={{opacity : 1, y : 0}}
                    className="bg-gray-100 px-3 py-2 rounded-l-lg flex justify-between items-center">
                        <span>{item[displayKey]}</span>

                        <button 
                        onClick={() => onDelete(type,item)}
                        className="text-red-500 cursor-pointer">
                            <RiDeleteBin6Line size={20}/>
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default ResorceCard