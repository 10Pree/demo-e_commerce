"use client"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Pagination } from "@/components/dashboard/pagination"
import { DataTableProducts } from "@/components/dashboard/Table_Products"

export default function Page() {
    const [product, setProduct] = useState([])
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")

    const getProducts = async () => {
        try {
            const res = await axios.get("http://localhost:8000/search", { withCredentials: true, params: { search: search, category: category} })
            setProduct(res.data.data)
        } catch (error) {
            console.log("Message Errer: ", error)
        }
    }
    useEffect(() => {
        const timeOut = setTimeout(() => {
            getProducts()
        }, 500)
        return () => clearTimeout(timeOut)
    }, [search, category])

    return (
        <div>
            {/* Header */}
            <div className="flex items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#111827]">ตารางสินค้า</h1>
                    <p className="text-sm text-gray-500 mt-1">ตารางรวมสินค้าทั้งหมด</p>
                </div>
            </div>
            <div>
                <div className=" text-end my-4 flex justify-between">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="bg-gray-200 border-2 border-[#1E3A8A] rounded-2xl p-2" />
                    <Link href="/dashboard/admin/products/add" className="p-2 bg-[#1E3A8A] font-bold text-white rounded-2xl">เพิ่มสินค้า</Link>
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
                            <DataTableProducts data={product} onRefresh={getProducts} />
                        </tbody>
                    </table>
                </div>
                <Pagination data={product} />
            </div>
        </div>
    )
}