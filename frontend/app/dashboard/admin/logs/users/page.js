"use client"
import axios from "axios";
import { useEffect, useState } from "react"
import { DataTableLogUsers } from "@/components/dashboard/Table_LogUsers";
export default function Page() {
    const [logUser, setLogUser] = useState([])

    const getLog = async() => {
        try{
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/log/users`, { withCredentials: true})
            setLogUser(res.data.data)
        }catch(err){
            console.log("Message:", err)
        }
    }

    useEffect(() => {
        getLog()
    },[])
    // console.log(logUser)


    return (
        <div className="w-full h-full">
                              {/* Header */}
      <div className="flex items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#111827]">ตารางแสดงประวัติผู้ใช้งาน</h1>
          <p className="text-sm text-gray-500 mt-1">ตารางรวมแสดงประวัติผู้ใช้งานทั้งหมด</p>
        </div>
      </div>
            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <DataTableLogUsers data={logUser}/>
                </div>
            </div>
        </div>
    )
}