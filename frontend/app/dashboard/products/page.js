"use client"
import Link from "next/link"
import { useState } from "react"

export default function Page() {
    const data = [
        { id: 1, p_name: "Mouse1", p_price: 191, p_stock: 21 },
        { id: 2, p_name: "Mouse2", p_price: 192, p_stock: 22 },
        { id: 3, p_name: "Mouse3", p_price: 193, p_stock: 23 },
        { id: 4, p_name: "Mouse4", p_price: 194, p_stock: 24 },
        { id: 5, p_name: "Mouse5", p_price: 195, p_stock: 25 },
        { id: 6, p_name: "Mouse6", p_price: 196, p_stock: 26 },
        { id: 7, p_name: "Mouse7", p_price: 197, p_stock: 27 },
        { id: 8, p_name: "Mouse8", p_price: 198, p_stock: 28 },
        { id: 9, p_name: "Mouse9", p_price: 199, p_stock: 29 },
        { id: 10, p_name: "Mouse10", p_price: 200, p_stock: 30 },
        { id: 11, p_name: "Mouse11", p_price: 201, p_stock: 31 },
        { id: 12, p_name: "Mouse12", p_price: 202, p_stock: 32 },
        { id: 13, p_name: "Mouse13", p_price: 203, p_stock: 33 },
        { id: 14, p_name: "Mouse14", p_price: 204, p_stock: 34 },
    ]

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
        <div>
            <h1 className="text-3xl font-bold my-4">สินค้า</h1>
            <div>
                <div className=" text-end my-4">
                    <Link href="/dashboard/products/add" className="p-2 bg-[#1E3A8A] font-bold text-white rounded-2xl">เพิ่มสินค้า</Link>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs uppercase bg-gray-400 text-[#111827]">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Stock
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItem.map((p) => (
                                <tr key={p.id} className="bg-white border-b text-[#111827] border-gray-200 hover:bg-[#111827] hover:text-white ">
                                    <th scope="row" className="px-3 py-4 font-medium whitespace-nowrap ">
                                        {p.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {p.p_name}
                                    </td>
                                    <td className="px-3 py-4">
                                        ${p.p_price}
                                    </td>
                                    <td className="px-3 py-4">
                                        {p.p_stock}
                                    </td>
                                    <td className="py-4 text-center flex justify-center items-center gap-4">
                                        <a href="/dashboard/products/edit" className=" px-6 py-2 font-medium text-white bg-blue-600 rounded-2xl hover:underline">Edit</a>
                                        <a href="#" className=" px-6 py-2 font-medium text-red-600  rounded-2xl hover:underline hover:bg-red-600 hover:text-white">Delete</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                    <div className="flex flex-row justify-center items-center gap-2 p-3">
                        <button onClick={handlePrev} disabled={currentPage === 1} className="px-3 py-2 mt-3 rounded-2xl bg-[#1E3A8A] text-white">กลับ</button>
                        <span className="text-[#111827] tracking-widest">{currentPage}...{totalPages}</span>
                        <button onClick={handleNext} disabled={currentPage === totalPages} className="px-3 py-2 mt-3 rounded-2xl bg-[#1E3A8A] text-white">ถัดไป</button>
                    </div>

            </div>
        </div>
    )
}