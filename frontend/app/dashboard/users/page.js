"use client"
import { useState } from "react"
export default function Page() {
    const data = [
        { id: 1, username: "user1", email: "user1@gmail.com", role: "admin" },
        { id: 2, username: "user2", email: "user2@gmail.com", role: "user" },
        { id: 3, username: "user3", email: "user3@gmail.com", role: "user" },
        { id: 4, username: "user4", email: "user4@gmail.com", role: "editor" },
        { id: 5, username: "user5", email: "user5@gmail.com", role: "user" },
        { id: 6, username: "user6", email: "user6@gmail.com", role: "admin" },
        { id: 7, username: "user7", email: "user7@gmail.com", role: "user" },
        { id: 8, username: "user8", email: "user8@gmail.com", role: "editor" },
        { id: 9, username: "user9", email: "user9@gmail.com", role: "user" },
        { id: 10, username: "user10", email: "user10@gmail.com", role: "user" },
        { id: 11, username: "user11", email: "user11@gmail.com", role: "admin" },
        { id: 12, username: "user12", email: "user12@gmail.com", role: "editor" },
        { id: 13, username: "user13", email: "user13@gmail.com", role: "user" },
        { id: 14, username: "user14", email: "user14@gmail.com", role: "user" },
        { id: 15, username: "user15", email: "user15@gmail.com", role: "admin" },
        { id: 16, username: "user16", email: "user16@gmail.com", role: "editor" },
        { id: 17, username: "user17", email: "user17@gmail.com", role: "user" },
        { id: 18, username: "user18", email: "user18@gmail.com", role: "user" },
        { id: 19, username: "user19", email: "user19@gmail.com", role: "user" },
        { id: 20, username: "user20", email: "user20@gmail.com", role: "editor" },
        { id: 21, username: "user21", email: "user21@gmail.com", role: "admin" },
        { id: 22, username: "user22", email: "user22@gmail.com", role: "user" },
        { id: 23, username: "user23", email: "user23@gmail.com", role: "user" },
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
            <h1 className="text-3xl font-bold my-4">ผู้ใช้งาน</h1>
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
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItem.map((u) => (
                                <tr key={u.id} className="bg-white border-b text-[#111827] border-gray-200 hover:bg-[#111827] hover:text-white ">
                                    <th scope="row" className="px-3 py-4 font-medium hover:text-[#111827] whitespace-nowrap ">
                                        {u.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {u.username}
                                    </td>
                                    <td className="px-6 py-4">
                                        {u.email}
                                    </td>
                                    <td className="px-3 py-4">
                                        <span className="p-2 bg-green-400 rounded-2xl border-green-800">{u.role}</span>
                                    </td>
                                    <td className="py-4 text-center flex justify-center items-center gap-4">
                                        <a href="#" className=" px-6 py-2 font-medium text-white bg-blue-600 rounded-2xl hover:underline">Edit</a>
                                        <a href="#" className=" px-6 py-2 font-medium text-red-600  rounded-2xl hover:underline hover:bg-red-600 hover:text-white">Delete</a>
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