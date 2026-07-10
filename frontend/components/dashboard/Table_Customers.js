import { useState } from "react"
import Link from "next/link"
import Swal from "sweetalert2"
import axios from "axios"

export function DataTableCustomers({ data, onRefresh }) {
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


    const deleteUser = async (id) => {
        try {
            const confirmDelete = Swal.fire({
                icon: 'success',
                title: 'ลบผู้ใช้งานแล้ว',
                timer: 2000,
                showConfirmButton: true,
                showCancelButton: true
            })

            if ((await confirmDelete).isConfirmed) {
                const res = await axios.delete(`http://localhost:8000/customer/${id}`, {
                    withCredentials: true
                }
                )
                onRefresh()
            }
        } catch (err) {
            console.error("Error: ", err)
        }
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
                    {currentItem.map((c, index) => (
                        <tr key={c.id} className="bg-white border-b text-[#111827] border-gray-200 hover:bg-[#111827] hover:text-white ">
                            <th scope="row" className="px-3 py-4 font-medium hover:text-[#111827] whitespace-nowrap ">
                                {startIdex + index + 1}
                            </th>
                            <td className="px-6 py-4">
                                {c.username}
                            </td>
                            <td className="px-6 py-4">
                                {c.email}
                            </td>
                            <td className="px-3 py-4">
                                <span className="p-2 bg-green-400 rounded-2xl border-green-800">{c.roles_name || `Customer`} </span>
                            </td>
                            <td className="py-4 text-center flex justify-center items-center gap-4">
                                <Link href={`/dashboard/admin/users/edit/customer/${c.id}`} className=" px-6 py-2 font-medium text-white bg-blue-600 rounded-2xl hover:underline">Edit</Link>
                                <button onClick={() => deleteUser(c.id)} className=" px-6 py-2 font-medium text-red-600  rounded-2xl hover:underline hover:bg-red-600 hover:text-white">Delete</button>
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
        </>
    )
}