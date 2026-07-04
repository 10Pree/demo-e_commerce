"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"
import { DataTable } from "@/components/dashboard/Table"
import { DataTableCustomers } from "@/components/dashboard/Table_Customers"
import { Pagination } from "@/components/dashboard/pagination";

export default function Page() {
    const [dataUsers, setDataUsers] = useState([])
    const [dataCustomers, setDataCustomers] = useState([])
    const [handleSwicthData, setHandleSwicthData] = useState(false)
    const [search, setSearch] = useState("")


    const getCustomers = async () => {
        try {
            const res = await axios.get('http://localhost:8000/customers', { withCredentials: true })
            setDataCustomers(res.data.data)
        } catch (err) {
            console.error("Error: ", err)
        }
    }
    const getUsers = async() => {
        try{
            const res = await axios.get('http://localhost:8000/search/user', {withCredentials: true, params: {name: search}} )
            setDataUsers(res.data.data)
        }catch(error){
            console.error("Error: ", err)
        }
    }

    useEffect(() => {
        getCustomers()
    }, [])

    useEffect(() => {
        const timeOut = setTimeout(() => {
            getUsers()
        }, 500);
        return () => clearTimeout(timeOut)
    },[search])
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
                    <div>
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="bg-gray-200 border-1 border-[#1E3A8A] rounded-2xl p-2" />
                        {handleSwicthData ? <Link href="/dashboard/admin/users/add" className="p-2 bg-gray-400 font-bold text-white rounded-2xl pointer-events-none opacity-50 cursor-not-allowed">เพิ่มผู้ใช้งาน</Link> :
                            <Link href="/dashboard/admin/users/add" className="p-2 bg-[#1E3A8A] hover:bg-[#102150] font-bold text-white rounded-2xl">เพิ่มผู้ใช้งาน</Link>
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
                            {
                                handleSwicthData ? <DataTableCustomers data={dataCustomers} onRefresh={getCustomers} /> : <DataTable data={dataUsers} onRefresh={getUsers} />
                            }
                        </tbody>
                    </table>
                    <Pagination data={handleSwicthData ? dataCustomers : dataUsers} />
                </div>
            </div>
        </div>
    )
}