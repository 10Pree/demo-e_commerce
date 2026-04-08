"use client"
import { useState } from "react"
export default function Page() {
    const data = [
        { id: 1, username: "admin", text: "Login successfully", time: "2025-01-01 09:10:15" },
        { id: 2, username: "user1", text: "View dashboard", time: "2025-01-01 09:12:22" },
        { id: 3, username: "admin", text: "Update user role: user2 → admin", time: "2025-01-01 09:15:47" },
        { id: 4, username: "user2", text: "Login failed - wrong password", time: "2025-01-01 09:20:03" },
        { id: 5, username: "user2", text: "Login successfully", time: "2025-01-01 09:21:10" },
        { id: 6, username: "user1", text: "Edit profile", time: "2025-01-01 09:23:31" },
        { id: 7, username: "admin", text: "Delete user: user3", time: "2025-01-01 09:28:54" },
        { id: 8, username: "user2", text: "Upload document", time: "2025-01-01 09:35:11" },
        { id: 9, username: "system", text: "Auto backup completed", time: "2025-01-01 09:40:00" },
        { id: 10, username: "user1", text: "Logout", time: "2025-01-01 09:45:23" },
    ];



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
        <div className="w-full h-full">
            <h1 className="text-3xl font-bold my-4">LogProduct</h1>
            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                            {currentItem.map((l) => (
                                <tr key={l.id} className="bg-white border-b text-[#111827] border-gray-200 hover:bg-[#111827] hover:text-white ">
                                    <th scope="row" className="px-3 py-4 font-medium text-white hover:text-[#111827] whitespace-nowrap ">
                                        {l.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {l.username}
                                    </td>
                                    <td className="px-6 py-4">
                                        {l.text}
                                    </td>
                                    <td className="px-6 py-4">
                                        {l.time}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex flex-row justify-center items-center gap-2 p-3">
                        <button onClick={handlePrev} disabled={currentPage === 1} className="px-3 py-2 mt-3 rounded-2xl bg-[#1E3A8A] text-white">กลับ</button>
                        <span className="text-[#111827] tracking-widest">{currentPage}...{totalPages}</span>
                        <button onClick={handleNext} disabled={currentPage === totalPages} className="px-3 py-2 mt-3 rounded-2xl bg-[#1E3A8A] text-white">ถัดไป</button>
                    </div>
                </div>

            </div>
        </div>
    )
}