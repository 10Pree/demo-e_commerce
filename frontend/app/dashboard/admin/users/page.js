"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"
import { DataTable } from "@/components/dashboard/Table"
import { Pagination } from "@/components/dashboard/pagination";

export default function Page() {
    const [dataUsers, setDataUsers] = useState([])
    const [dataCustomers, setDataCustomers] = useState([])
    const [handleSwicthData, setHandleSwicthData] = useState(false)

    const getuser = async () => {
        try {
            const res = await axios.get("http://localhost:8000/users", { withCredentials: true})
            // console.log(res.data)
            setDataUsers(res.data.data)
        } catch (err) {
            console.error("Error: ", err)
        }
    }
    const getCustomers = async() => {
        try{
            const res = await axios.get('http://localhost:8000/customers', { withCredentials: true})
            setDataCustomers(res.data.data)
        }catch(err){
            console.error("Error: ", err)
        }
    }

    useEffect(() => {
        getuser()
        getCustomers()
    }, [])

    return (
        <div className="w-full h-full">
            <h1 className="text-3xl font-bold my-4">ผู้ใช้งาน</h1>
            <div>
                <div className=" flex gap-5 my-4">
                    <Link href="/dashboard/admin/users/add" className="p-2 bg-[#1E3A8A] hover:bg-[#102150] font-bold text-white rounded-2xl">เพิ่มผู้ใช้งาน</Link>
                    <div className="flex justify-center items-center gap-1 ">
                        <div onClick={(e) => setHandleSwicthData(false)} className={ handleSwicthData ? 'h-100% p-2 bg-[#1E3A8A] font-bold text-white rounded-l-2xl hover:bg-[#102150] focus:bg-[#102150] cursor-pointer' : 'h-100% p-2 bg-[#102150] font-bold text-white rounded-l-2xl hover:bg-[#102150] focus:bg-[#102150] cursor-pointer'}>
                            Users
                        </div>
                        <div onClick={(e) => setHandleSwicthData(true)} className={ handleSwicthData ? 'h-100% p-2 bg-[#102150] font-bold text-white rounded-r-2xl hover:bg-[#102150] focus:bg-[#102150] cursor-pointer' : 'h-100% p-2 bg-[#1E3A8A] font-bold text-white rounded-r-2xl hover:bg-[#102150] focus:bg-[#102150] cursor-pointer'}>
                            Customers
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
                            <DataTable data={handleSwicthData ? dataCustomers : dataUsers}/>
                        </tbody>
                    </table>
                    <Pagination data={handleSwicthData ? dataCustomers : dataUsers} />
                </div>
            </div>
        </div>
    )
}