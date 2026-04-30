import { useState } from "react"

export function Pagination({ data }) {

    // จำนวนหน้าทั้งหมด
    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 10
    const totalPages = Math.ceil(data.length / itemPerPage)

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }
    return (
        <div className="flex flex-row justify-center items-center gap-2 p-3">
            <button onClick={handlePrev} disabled={currentPage === 1} className="px-3 py-2 mt-3 rounded-2xl bg-[#1E3A8A] text-white">กลับ</button>
            <span className="text-[#111827] tracking-widest">{currentPage}...{totalPages}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages} className="px-3 py-2 mt-3 rounded-2xl bg-[#1E3A8A] text-white">ถัดไป</button>
        </div>
    )
}