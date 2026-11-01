"use client"
import Image from "next/image"
import axios from "axios"
import Swal from "sweetalert2"
import { use, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Page({ params }) {
    const router = useRouter()
    const [order, setOrder] = useState([])
    const { id } = use(params)

    const getOrder = async () => {
        try {
            const rows = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/detail/${id}`, { withCredentials: true })
            setOrder(rows.data.data)
        } catch (error) {
            console.log("Message Error: ", error)
        }
    }

    useEffect(() => {
        getOrder()
    }, [])
    return (
        <div className="w-full h-full flex flex-col gap-3">
            <div className="flex items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#111827]">รายการสั่งซื้อ</h1>
                    <p className="text-sm text-gray-500 mt-1">รวมแสดงรายการสั่งซื้อทั้งหมด</p>
                </div>
            </div>
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col gap-10 w-full h-fit bg-[#F3F4F6] border-gray-500 rounded-2xl shadow-md p-6">
                    <div className="flex flex-col gap-4">
                        <h2 className=" font-bold">รายละเอียด</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <label>ชื่อ</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" value={order.customer_name || ""} disabled />
                            </div>
                            <div className="flex items-center gap-2 ">
                                <label>อีเมล</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" value={order.email || ""} disabled />
                            </div>
                            <div className="flex items-center gap-2">
                                <label>เบอร์โทร</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" value={order.phone || ""} disabled />
                            </div>
                            <div className="flex items-center gap-2">
                                <label>ที่อยู่</label>
                                <textarea className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" value={order.address || ""} disabled />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <span className="border-b-[1px] w-[98%]"></span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className=" font-bold">สถานะ</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex gap-2">
                                <label>Payment Method</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" value={order.payment_method || "null"} disabled />
                            </div>
                            <div className="flex gap-2">
                                <label>Payment Status</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" value={order.payment_status || "null"} disabled />
                            </div>
                            <div className="flex gap-2">
                                <label>Paid</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" value={order.paid_at || "null"} disabled />
                            </div>
                            <div className="flex gap-2">
                                <label>Expires Date</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" value={order.expires_at || "null"} disabled />
                            </div>
                            <div className="flex gap-2">
                                <label>External Reference</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" value={order.external_ref || "null"} disabled />
                            </div>
                            <div className="flex gap-2">
                                <label>Payer Reference</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" value={order.payer_ref || "null"} disabled />
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex justify-end items-center">
                        <div className="flex items-center gap-2">
                            <span>ราคารวม</span>
                            <div className="border rounded-[8px] px-2 py-1">
                                {order.amount || "0"}
                            </div>
                            <span>บาท</span>
                        </div>
                    </div> */}
                </div>
                <div className="flex justify-center items-center">
                    <h1 className="font-bold">รายการ</h1>
                </div>
                <div className="flex flex-col gap-10 w-full h-fit bg-[#F3F4F6] border-gray-500 rounded-2xl shadow-md p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span>จำนวน</span>
                            <div className="border rounded-[8px] px-2 py-1">
                                {order?.items?.length ?? "0"}
                            </div>
                            <span>รายการ</span>
                        </div>
                                                <div className="flex items-center gap-2">
                            <span>ราคารวม</span>
                            <div className="border rounded-[8px] px-2 py-1">
                                {order.amount || "0"}
                            </div>
                            <span>บาท</span>
                        </div>
                    </div>
                    <div className="h-[400px] overflow-y-scroll">
                        <table className="w-full h-fit text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs uppercase  text-[#111827]">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ลำดับ
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        รหัสสินค้า
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ชื่อสินค้า
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ราคา
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        จํานวน
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order?.items?.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.sku}
                                            </td>
                                            <td className="px-6 py-4">
                                                { item.product_name}
                                            </td>
                                            <td className="px-6 py-4">
                                                { item.price }
                                            </td>
                                            <td className="px-6 py-4">
                                                { item.qty }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}