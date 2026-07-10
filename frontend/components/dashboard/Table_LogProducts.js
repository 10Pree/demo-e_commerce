import { useState } from "react"

export function DataTableLogProducts({ data }) {


    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 10

    //จำวนเริ่มต้นและ จบ การแสดง ข้อมูล
    const startIdex = (currentPage - 1) * itemPerPage
    const endIndex = startIdex + itemPerPage
    const currentItem = data.slice(startIdex, endIndex)

    // จำนวนหน้าทั้งหมด
    const totalPages = Math.ceil(data.length / itemPerPage)

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    return (
        <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs uppercase bg-gray-400 text-[#111827]">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Text
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Time
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItem.map((l, index) => (
                            <tr key={l.id} className="bg-white border-b text-[#111827] border-gray-200 hover:bg-[#111827] hover:text-white ">
                                <th scope="row" className="px-3 py-4 font-medium  hover:text-[#111827] whitespace-nowrap ">
                                    {startIdex + index + 1}
                                </th>
                                <td className="px-6 py-4">
                                    {l.users_id}
                                </td>
                                <td className="px-6 py-4">
                                    {l.text}
                                </td>
                                <td className="px-6 py-4">
                                    {l.created_at}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="flex flex-row justify-center items-center gap-2 p-3">
                <button onClick={handlePrev} disabled={currentPage === 1} className="px-3 py-2 mt-3 rounded-2xl bg-[#1E3A8A] text-white">กลับ</button>
                <span className="text-[#111827] tracking-widest">{currentPage}...{totalPages}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages} className="px-3 py-2 mt-3 rounded-2xl bg-[#1E3A8A] text-white">ถัดไป</button>
            </div>
        </>
    )
}