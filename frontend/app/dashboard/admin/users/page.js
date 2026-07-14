"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"
import { DataTableUsers } from "@/components/dashboard/Table_User"
import { DataTableCustomers } from "@/components/dashboard/Table_Customers"

export default function Page() {
    const [dataUsers, setDataUsers] = useState([])
    const [dataCustomers, setDataCustomers] = useState([])
    const [handleSwicthData, setHandleSwicthData] = useState(false)
    const [searchUsers, setSearchUsers] = useState("")
    const [searchCustomers, setSearchCustomers] = useState("")


    const getCustomers = async () => {
        try {
            const res = await axios.get('http://localhost:8000/search/customer', { withCredentials: true, params: { name: searchCustomers } })
            setDataCustomers(res.data.data)
        } catch (err) {
            console.error("Error: ", err)
        }
    }
    const getUsers = async () => {
        try {
            const res = await axios.get('http://localhost:8000/search/user', { withCredentials: true, params: { name: searchUsers } })
            setDataUsers(res.data.data)
        } catch (err) {
            console.error("Error: ", err)
        }
    }

    useEffect(() => {
        getCustomers()
    }, [])

    useEffect(() => {
        const timeOut = setTimeout(() => {
            getUsers()
            getCustomers()
        }, 500);
        return () => clearTimeout(timeOut)
    }, [searchUsers, searchCustomers])
    return (
        <div className="w-full h-full">
            {/* Header */}
            <div className="flex items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#111827]">ตารางผู้ใช้งาน</h1>
                    <p className="text-sm text-gray-500 mt-1">ตารางรวมผู้ใช้งาน และ ผู้ใช้บริการทั้งหมด</p>
                </div>
            </div>
            <div>
                <div className="flex justify-between my-4">
                    <div className="flex gap-2">
                        {
                            !handleSwicthData ?
                                <input type="text" value={searchUsers} onChange={(e) => setSearchUsers(e.target.value)} className="bg-gray-200 border-1 border-[#1E3A8A] rounded-2xl p-2" />
                                : <input type="text" value={searchCustomers} onChange={(e) => setSearchCustomers(e.target.value)} className="bg-gray-200 border-1 border-[#1E3A8A] rounded-2xl p-2" />
                        }
                        {handleSwicthData ?
                            <Link href="/dashboard/admin/users/add" className="p-2 bg-gray-400 font-bold text-white rounded-2xl pointer-events-none opacity-50 cursor-not-allowed">เพิ่มผู้ใช้งาน</Link>
                            : <Link href="/dashboard/admin/users/add" className="p-2 bg-[#1E3A8A] hover:bg-[#102150] font-bold text-white rounded-2xl">เพิ่มผู้ใช้งาน</Link>
                        }
                    </div>
                    <div className="flex gap-1">
                        <div onClick={(e) => setHandleSwicthData(false)} className={handleSwicthData ? 'h-100% p-2 bg-[#1E3A8A] font-bold text-white rounded-l-2xl hover:bg-[#102150] focus:bg-[#102150] cursor-pointer' : 'h-100% p-2 bg-[#102150] font-bold text-white rounded-l-2xl hover:bg-[#102150] focus:bg-[#102150] cursor-pointer'}>
                            ผู้ใช้งาน
                        </div>
                        <div onClick={(e) => setHandleSwicthData(true)} className={handleSwicthData ? 'h-100% p-2 bg-[#102150] font-bold text-white rounded-r-2xl hover:bg-[#102150] focus:bg-[#102150] cursor-pointer' : 'h-100% p-2 bg-[#1E3A8A] font-bold text-white rounded-r-2xl hover:bg-[#102150] focus:bg-[#102150] cursor-pointer'}>
                            ลูกค้า
                        </div>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {
                        handleSwicthData ? <DataTableCustomers data={dataCustomers} onRefresh={getCustomers} /> : <DataTableUsers data={dataUsers} onRefresh={getUsers} />
                    }
                </div>
            </div>
        </div>
    )
}