"use client"
import Image from "next/image"
import axios from "axios"
import Swal from "sweetalert2"
import { use, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PackagePlus, Trash, X } from 'lucide-react';

export default function Page({ params }) {
    const router = useRouter()

    return (
        <div className="w-full h-full flex flex-col gap-3">
            <div className="flex items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#111827]">รายการสั่งซื้อ</h1>
                    <p className="text-sm text-gray-500 mt-1">รวมแสดงรายการสั่งซื้อทั้งหมด</p>
                </div>
            </div>
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col gap-10 w-full h-fit bg-[#F3F4F6] border-gray-500 rounded-2xl shadow-md p-4">
                    <div className="flex flex-col gap-4">
                        <h2 className=" font-bold">รายละเอียด</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex gap-2">
                                <label>ชื่อ</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" disabled />
                            </div>
                            <div className="flex gap-2">
                                <label>อีเมล</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" disabled />
                            </div>
                            <div className="flex gap-2">
                                <label>เบอร์โทร</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" disabled />
                            </div>
                            <div className="flex gap-2">
                                <label>ที่อยู่</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" disabled />
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
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" disabled />
                            </div>
                            <div className="flex gap-2">
                                <label>Payment Status</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" disabled />
                            </div>
                            <div className="flex gap-2">
                                <label>Paid</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" disabled />
                            </div>
                            <div className="flex gap-2">
                                <label>Expires Date</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" disabled />
                            </div>
                            <div className="flex gap-2">
                                <label>External Reference</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" disabled />
                            </div>
                            <div className="flex gap-2">
                                <label>Payer Reference</label>
                                <input className="bg-gray-200 border-gray-700 rounded-[8px] p-1 w-1/2" type="text" disabled />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end items-center">
                        <div className="flex items-center gap-2">
                            <span>ราคารวม</span>
                            <div className="border rounded-[8px] px-2 py-1">
                                100000
                            </div>
                            <span>บาท</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <h1 className="font-bold">รายการ</h1>
                </div>
                <div className="flex flex-col gap-10 w-full h-fit bg-[#F3F4F6] border-gray-500 rounded-2xl shadow-md p-4">
                    <div className="flex justify-start items-center">
                        <div className="flex items-center gap-2">
                            <span>จำนวน</span>
                            <div className="border rounded-[8px] px-2 py-1">
                                1
                            </div>
                            <span>รายการ</span>
                        </div>
                    </div>
                    <div  className="h-[400px] overflow-y-scroll">
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
                            <tr>
                                <td className="px-6 py-4">
                                    1
                                </td>
                                <td className="px-6 py-4">
                                    sku
                                </td>
                                <td className="px-6 py-4">
                                    ชื่อสินค้า
                                </td>
                                <td className="px-6 py-4">
                                    ราคา
                                </td>
                                <td className="px-6 py-4">
                                    จํานวน
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">
                                    1
                                </td>
                                <td className="px-6 py-4">
                                    sku
                                </td>
                                <td className="px-6 py-4">
                                    ชื่อสินค้า
                                </td>
                                <td className="px-6 py-4">
                                    ราคา
                                </td>
                                <td className="px-6 py-4">
                                    จํานวน
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">
                                    1
                                </td>
                                <td className="px-6 py-4">
                                    sku
                                </td>
                                <td className="px-6 py-4">
                                    ชื่อสินค้า
                                </td>
                                <td className="px-6 py-4">
                                    ราคา
                                </td>
                                <td className="px-6 py-4">
                                    จํานวน
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">
                                    1
                                </td>
                                <td className="px-6 py-4">
                                    sku
                                </td>
                                <td className="px-6 py-4">
                                    ชื่อสินค้า
                                </td>
                                <td className="px-6 py-4">
                                    ราคา
                                </td>
                                <td className="px-6 py-4">
                                    จํานวน
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">
                                    1
                                </td>
                                <td className="px-6 py-4">
                                    sku
                                </td>
                                <td className="px-6 py-4">
                                    ชื่อสินค้า
                                </td>
                                <td className="px-6 py-4">
                                    ราคา
                                </td>
                                <td className="px-6 py-4">
                                    จํานวน
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">
                                    1
                                </td>
                                <td className="px-6 py-4">
                                    sku
                                </td>
                                <td className="px-6 py-4">
                                    ชื่อสินค้า
                                </td>
                                <td className="px-6 py-4">
                                    ราคา
                                </td>
                                <td className="px-6 py-4">
                                    จํานวน
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">
                                    1
                                </td>
                                <td className="px-6 py-4">
                                    sku
                                </td>
                                <td className="px-6 py-4">
                                    ชื่อสินค้า
                                </td>
                                <td className="px-6 py-4">
                                    ราคา
                                </td>
                                <td className="px-6 py-4">
                                    จํานวน
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">
                                    1
                                </td>
                                <td className="px-6 py-4">
                                    sku
                                </td>
                                <td className="px-6 py-4">
                                    ชื่อสินค้า
                                </td>
                                <td className="px-6 py-4">
                                    ราคา
                                </td>
                                <td className="px-6 py-4">
                                    จํานวน
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">
                                    1
                                </td>
                                <td className="px-6 py-4">
                                    sku
                                </td>
                                <td className="px-6 py-4">
                                    ชื่อสินค้า
                                </td>
                                <td className="px-6 py-4">
                                    ราคา
                                </td>
                                <td className="px-6 py-4">
                                    จํานวน
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    )
}