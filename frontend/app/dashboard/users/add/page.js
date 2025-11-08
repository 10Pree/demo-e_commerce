"use client"

import Image from "next/image"
import { useState } from "react"
export default function Page() {
    const [data, setdata] = useState({
        username: "",
        password: "",
        email: "",
        phone: 0,
        address: "",
        role: ""
    })
    const [urlImagePreview, seturlImagePreview] = useState(null)

    const handleUpload = (e) => {
        const image = e.target.files[0]
        if(image) {
            const urlImage = URL.createObjectURL(image)
            seturlImagePreview(urlImage)
        }
    }

    const handleChange = (e) => {
        const { name, value} = e.target
        setdata(prve => ({...prve, [name]: value}))
        console.log(data)
    }

    return (
        <form>
            <h1 className="text-3xl font-bold my-4">เพิ่มผู้ใช้งาน</h1>
            <div className="w-full h-full flex-row justify-center items-center gap-4 md:flex md:w-full">
                <div className="w-full h-1/2 bg-white rounded-2xl shadow-2xl p-4 md:w-1/2">
                    <div>
                        <h1 className="text-[16px] font-bold">ชื่อ</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="text" name="username" onChange={handleChange}  />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">รหัสผ่าน</h1>
                        <button className="bg-white border-[1px] rounded-[8px] p-1 w-1/2 flex justify-center items-center hover:bg-[#1E3A8A] hover:text-white"><svg className=" fill-current" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 26 26">
                            <path d="M 16 0 C 13.789063 0 11.878906 0.917969 10.6875 2.40625 C 9.496094 3.894531 9 5.824219 9 7.90625 L 9 9 L 12 9 L 12 7.90625 C 12 6.328125 12.390625 5.085938 13.03125 4.28125 C 13.671875 3.476563 14.542969 3 16 3 C 17.460938 3 18.328125 3.449219 18.96875 4.25 C 19.609375 5.050781 20 6.308594 20 7.90625 L 20 9 L 23 9 L 23 7.90625 C 23 5.8125 22.472656 3.863281 21.28125 2.375 C 20.089844 0.886719 18.207031 0 16 0 Z M 9 10 C 7.34375 10 6 11.34375 6 13 L 6 23 C 6 24.65625 7.34375 26 9 26 L 23 26 C 24.65625 26 26 24.65625 26 23 L 26 13 C 26 11.34375 24.65625 10 23 10 Z M 16 15 C 17.105469 15 18 15.894531 18 17 C 18 17.738281 17.597656 18.371094 17 18.71875 L 17 21 C 17 21.550781 16.550781 22 16 22 C 15.449219 22 15 21.550781 15 21 L 15 18.71875 C 14.402344 18.371094 14 17.738281 14 17 C 14 15.894531 14.894531 15 16 15 Z"></path>
                        </svg></button>
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">อีเมล</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="email"  name="email" onChange={handleChange} />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">เบอร์โทร</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="tel"  name="phone" onChange={handleChange} />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">ที่อยู่</h1>
                        <textarea className="bg-white border-[1px] rounded-[8px] p-1 w-full "  name="address" onChange={handleChange} />
                    </div>
                </div>
                <div className="flex justify-center items-center m-8 md:m-0">
                    <div className="w-fit h-fit bg-[#F3F4F6]  rounded-2xl shadow-2xl p-4 flex flex-col justify-center gap-2">
                        <h1 className="text-[16px] font-bold">หน้าที่</h1>
                        <div className="flex gap-2">
                            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                <input type="radio" name="role" value={"admin"} onChange={handleChange}  className=" peer hidden"/>
                                <span className="p-1 border rounded-[8px] shadow-xl bg-white cursor-pointer hover:bg-[#1E3A8A] hover:text-white peer-checked:bg-[#1E3A8A] peer-checked:text-white">admin</span>
                            </label>
                            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                <input type="radio" name="role" value={"user"} onChange={handleChange}  className=" peer hidden" />
                                <span className="p-1 border rounded-[8px] shadow-xl bg-white cursor-pointer hover:bg-[#1E3A8A] hover:text-white peer-checked:bg-[#1E3A8A] peer-checked:text-white">user</span>
                            </label>
                        </div>
                        <h1 className="text-[16px] font-bold">อัพโหลด</h1>
                        <div className="w-fit h-fit bg-[#1E3A8A] rounded-[8px] flex justify-center items-center p-3">
                            <label className="cursor-pointer shadow-2xl h-full w-full">
                                <input onChange={handleUpload} multiple className="hidden" type="file" accept="image/*"/><Image src={"/icons/icons8-upload-48.png"} alt="icon upload" width={20} height={20} />
                            </label>
                        </div>
                        <div>
                            <span>รูป</span>
                            <div className="w-[300px] h-[300px] flex justify-center items-center gap-2 overflow-x-scroll">
                                {
                                    urlImagePreview ? <Image className="w-1/2 h-1/2 object-cover" src={urlImagePreview} alt="image user" width={300} height={300} /> : <div className="w-1/2 h-1/2 border-[1px] rounded-2xl flex justify-center items-center ">ไม่ได้อัพรูป</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-end"><button className="bg-[#1E3A8A] px-4 py-2 rounded-2xl text-white">บันทึก</button></div>
        </form>
    )
}