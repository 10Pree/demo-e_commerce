import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
export function DataTableOrders({ data, onRefresh }) {

    // const deleteOrders = async (id, name) => {
    //     try {
    //         const confirmDelete = await Swal.fire({
    //             icon: 'warning',
    //             title: `ลบ สินค้า ${name} หรือมั้ย`,
    //             showConfirmButton: true,
    //             showCancelButton: true
    //         })

    //         if (confirmDelete.isConfirmed) {
    //             await axios.delete(`http://localhost:8000/product/${id}`, { withCredentials: true })
    //             await Swal.fire({
    //                 icon: 'success',
    //                 title: "ลบสินค้าแล้ว",
    //                 timer: 2000,
    //                 showConfirmButton: false
    //             })
    //             onRefresh()
    //         }
    //     } catch (err) {
    //         console.log("Message:", err)
    //     }
    // }

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
                            ลำดับ
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ชื่อ
                        </th>
                        <th scope="col" className="px-6 py-3">
                            ราคารวม
                        </th>
                        <th scope="col" className="px-6 py-3">
                            จํานวนรายการ
                        </th>
                        <th scope="col" className="px-6 py-3">
                            สถานะ
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            จัดการ
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItem.map((O, index) => (
                        <tr key={O.id} className="bg-white border-b text-[#111827] border-gray-200 hover:bg-[#111827] hover:text-white ">
                            <th scope="row" className="px-3 py-4 font-medium whitespace-nowrap ">
                                {startIdex + index + 1}
                            </th>
                            <td className="px-6 py-4">
                                {O.customer_name}
                            </td>
                            <td className="px-6 py-4">
                                {O.total}
                            </td>
                            <td className="px-6 py-4">
                                {O.item_conut}
                            </td>
                            <td className="px-6 py-4">
                                {O.status}
                            </td>
                            <td className="py-4 text-center flex justify-center items-center gap-4">
                                <Link href={`/dashboard/admin/products/edit/${O.id}`} className=" px-6 py-2 font-medium text-white bg-blue-600 rounded-2xl hover:underline">Edit</Link>
                                <button className=" px-6 py-2 font-medium text-red-600  rounded-2xl hover:underline hover:bg-red-600 hover:text-white">Delete</button>
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