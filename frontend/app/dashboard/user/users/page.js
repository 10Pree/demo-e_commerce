"use client"
import axios from "axios";
import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";
import Link from "next/link";
import { useEffect, useState } from "react"
export default function Page() {
    const [data, setData] = useState([])
    const getuser = async () => {
        try{
            const res = await axios.get("http://localhost:8000/users", { withCredentials: true})
            // console.log(res.data)
            setData(res.data.data)
        }catch (err){
            console.error("Error: ", err)
        }
    }

    const deleteUser = async (id) => {
        try{
            console.log(id)
            const res = await axios.delete(`http://localhost:8000/user/${id}`, {
                withCredentials: true
            }
            )
            alert("ลบแล้ว")
            getuser()
        }catch(err){
        console.error("Error: ", err)
        }
    }
    
    useEffect(()=>{
        getuser()
    },[])


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
                <div className=" text-end my-4">
                    <Link href="/dashboard/users/add" className="p-2 bg-[#1E3A8A] font-bold text-white rounded-2xl">เพิ่มผู้ใช้งาน</Link>
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
                                        <span className="p-2 bg-green-400 rounded-2xl border-green-800">{u.roles_name}</span>
                                    </td>
                                    <td className="py-4 text-center flex justify-center items-center gap-4">
                                        <Link href={`/dashboard/user/users/edit/${u.id}`} className=" px-6 py-2 font-medium text-white bg-blue-600 rounded-2xl hover:underline">Edit</Link>
                                        <button onClick={() => deleteUser(u.id)} className=" px-6 py-2 font-medium text-red-600  rounded-2xl hover:underline hover:bg-red-600 hover:text-white">Delete</button>
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