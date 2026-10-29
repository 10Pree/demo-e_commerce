"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import { DataTableOrders } from "@/components/dashboard/Table_Orders"



export default function Page() {
        const [orders, setOrders] = useState([])
        const [search, setSearch] = useState("")
        const [category, setCategory] = useState("")
        const [showCategory, setShowCategory] = useState([])

        console.log(orders)

        const getListOrders = async() => {
            try{
                const rows = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/list`, { withCredentials: true})
                setOrders(rows.data.data)
            }catch(error){
                console.log("Message Error: ", error)
            }
        }


        useEffect(() => {
            getListOrders()
        }, [])

    return (
        <div>
            {/* Header */}
            <div className="flex items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#111827]">ตารางรายการสั่งซื้อ</h1>
                    <p className="text-sm text-gray-500 mt-1">ตารางรวมแสดงรายการสั่งซื้อทั้งหมด</p>
                </div>
            </div>
            <div>
                <div className="flex flex-col md:flex-row justify-between gap-2 my-3">
                    <div className="flex flex-col md:flex-row gap-2">
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="bg-gray-200 border-1 border-[#1E3A8A] rounded-2xl p-2" />
                        <select onChange={(e)=> setCategory(e.target.value)} className=" border border-[#1E3A8A] rounded-2xl p-2">
                            {showCategory.map((c)=> (
                                <option key={c.id} value={c.id} >{c.name}</option>
                            ))}
                            <option  value={""} >-</option>
                        </select>
                    </div>
                    <Link href="/dashboard/admin/products/add" className="p-2 bg-[#1E3A8A] font-bold text-white rounded-2xl">เพิ่มสินค้า</Link>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <DataTableOrders data={orders}  />
                </div>
            </div>
        </div>
    )
}