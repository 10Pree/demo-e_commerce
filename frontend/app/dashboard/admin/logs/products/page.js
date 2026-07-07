"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { DataTableLogProducts } from "@/components/dashboard/Table_LogProducts"
import { Pagination } from "@/components/dashboard/pagination"

export default function Page() {

    const [dataLog, setDataLog] = useState([])

    const getLogProducts = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/log/products`)
            setDataLog(res.data.data)
        } catch (err) {
            console.log("Message Error:", err)
        }
    }

    useEffect(() => {
        getLogProducts()
    }, [])

    return (
        <div className="w-full h-full">
            {/* Header */}
            <div className="flex items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#111827]">ตารางแสดงประวัติสินค้า</h1>
                    <p className="text-sm text-gray-500 mt-1">ตารางรวมแสดงประวัติสินค้าทั้งหมด</p>
                </div>
            </div>
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
                            <DataTableLogProducts data={dataLog}/>
                        </tbody>
                    </table>
                    <Pagination data={d}/>
                </div>

            </div>
        </div>
    )
}