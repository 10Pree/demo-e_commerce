"use client"
import { useState } from "react"
import Image from "next/image"


export default function Page() {
    const [urlImagePreview, seturlImagePreview] = useState([])

    const handleUpload = (e) => {
        const files = Array.from(e.target.files)
        const prevViewUrl = files.map(file => URL.createObjectURL(file))

        seturlImagePreview(prev => [...prev, ...prevViewUrl])
    }
    const dataType = [
        { id: 1, name: "Smartphone" },
        { id: 2, name: "ACCESSORIES SMARTPHONE" },
        { id: 3, name: "SMART WATCH" },
        { id: 4, name: "SMART LIFE & IOT" },
        { id: 5, name: "NOTEBOOK" },
        { id: 6, name: "ACCESSORIES NOTEBOOK" },
        { id: 7, name: "HEADSET" },
        { id: 8, name: "MICROPHONE" },
        { id: 9, name: "MICROPHONE111" },
    ]
    return (
        <div>
            <h1 className="text-3xl font-bold my-4">เพิ่มสินค้า</h1>
            <div className="w-full h-full flex-row justify-center items-center gap-4 md:flex md:w-full">
                <div className="w-full h-1/2 bg-[#F3F4F6] rounded-2xl shadow-2xl p-4 md:w-1/2">
                    <div>
                        <h1 className="text-[16px] font-bold">ชื่อ</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="text" />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">ราคา</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="number" />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">ประเภท</h1>
                        <select className="bg-white border-[1px] rounded-[8px] p-1">
                            <option>--เลือกประเภท--</option>
                            {dataType.map(t => (
                                <option key={t.id}>{t.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">จำนวน</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="number" />
                    </div>
                </div>
                <div className="flex justify-center items-center m-8 md:m-0">
                    <div className="w-fit h-fit bg-[#F3F4F6]  rounded-2xl shadow-2xl p-4 flex flex-col justify-center gap-2">
                        <h1 className="text-[16px] font-bold">อัพโหลด</h1>
                        <div className="w-fit h-fit bg-[#1E3A8A] rounded-[8px] flex justify-center items-center p-3">
                            <label className="cursor-pointer shadow-2xl h-full w-full">
                                <input onChange={handleUpload} multiple className="hidden" type="file" accept="image/*" /><Image src={"/icons/icons8-upload-48.png"} alt="icon upload" width={20} height={20} />
                            </label>
                        </div>
                        <span>รูป</span>
                        <div className="w-[300px] h-[300px] flex justify-center items-center gap-2 overflow-x-scroll">
                            {
                                urlImagePreview.length > 0 ? urlImagePreview.map((src, index) => <Image className="w-1/2 h-1/2 object-cover" unoptimized key={index} src={src} alt="icon upload" width={300} height={300} />) : <div className="w-1/2 h-1/2 border-[1px] rounded-2xl flex justify-center items-center ">ไม่ได้อัพรูป</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-end"><button className="bg-[#1E3A8A] px-4 py-2 rounded-2xl text-white">บันทึก</button></div>
        </div>
    )
}