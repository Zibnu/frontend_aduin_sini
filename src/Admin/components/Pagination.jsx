import React from 'react'
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function Pagination({currentPage, totalPages, setPage}) {
    return (
        <div className='flex justify-end items-center gap-3 mt-4'>
            <button 
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}>
                <MdNavigateBefore size={28}/>
            </button>

            <span>
                Page {currentPage} of {totalPages}
            </span>

            <button 
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}>
                <MdNavigateNext size={28}/>
            </button>
        </div>
    )
}

export default Pagination