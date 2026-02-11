import React from 'react'
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function Pagination({currentPage, totalPages, setPage}) {
    return (
        <div className='flex justify-center items-center gap-3 mt-4'>
            <button 
            disabled={currentPage === 1}
            className='px-4 py-2 cursor-pointer text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed'
            onClick={() => setPage(currentPage - 1)}>
                <MdNavigateBefore size={28}/>
            </button>

            <span>
                Page {currentPage} of {totalPages}
            </span>

            <button 
            disabled={currentPage === totalPages}
            className='px-4 py-2 cursor-pointer text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed'
            onClick={() => setPage(currentPage + 1)}>
                <MdNavigateNext size={28}/>
            </button>
        </div>
    )
}

export default Pagination