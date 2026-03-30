"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { useParams } from "next/navigation"
import FromEdit from "@/components/dashboard/popup/fromEdit"

export default function Page() {
    const params = useParams()
    const [showPopupAdd, setShowPopupAdd] = useState(false)
    const [urlImagePreview, setUrlImagePreview] = useState(false)
    const userId = params.id
    const [isPassword, setIsPassword] = useState({password: ""})
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: 0,
        address: "",
        images: []
    })

    const update = async(e) => {
        e.preventDefault();
        try{
            const fromData = new FormData()
            fromData.append('username', data.username)
            fromData.append('email', data.email)
            fromData.append('phone', data.phone)
            fromData.append('address', data.address)
            
            if(data.images && data.images[0]){
                fromData.append('images', data.images[0])
            }
            const res = await axios.put(`http://localhost:8000/user/${userId}`, fromData, { withCredentials: true , headers: {"Content-Type" : "multipart/form-data"}})
            // console.log("Success:", res.data);
            alert(`อัพเดต ID ${userId} แล้ว`)
        }catch(err){
            console.log("Massage Error: ", err)
        }
    }
    const updatePassword = async() => {
        try{
            const res = await axios.put(`http://localhost:8000/user/password/${userId}`, isPassword, {withCredentials: true})
            alert(`อัพเดต รหัสผ่าน ID ${userId} แล้ว`)
        }catch(err){
            console.log("Massage Error: ", err)
        }
    }

    const getData = async () => {
        try{
            const res = await axios.get(`http://localhost:8000/user/${userId}`)
            const {id, username, password, email, phone, address, image_url} = res.data.data[0]
            setData({username, password, email, phone, address})
            setUrlImagePreview(image_url === null ? (`http://localhost:8000/uploads/users/image.png`) : (`http://localhost:8000${image_url}`))
            // console.log("image", image_url)

            console.log("data: ",res.data.data[0].id)
        }catch(err){
            console.log("Massage Error: ", err)
        }
    }
    const handleUpload = (e) => {
        const file = Array.from(e.target.files)
        if(file.length > 0){
            const previewUrl = URL.createObjectURL(file[0])
            setUrlImagePreview(previewUrl)
            setData({...data, images: file})
            // console.log(urlImagePreview)
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }
    const handleClosePopup = () => {
        setShowPopupAdd(false)
    }
    console.log(urlImagePreview)
    console.log("data: ",isPassword)
    useEffect(()=>{
        if(userId){
            getData()
        }
    },[userId])
    return (
        <form onSubmit={update}>
            {
                showPopupAdd && <FromEdit onClose={handleClosePopup}  handleChangePassword={handleChange} data={isPassword} setdata={setIsPassword} updatePassword={updatePassword}/>
            } 
            <h1 className="text-3xl font-bold my-4">เพิ่มผู้ใช้งาน</h1>
            <div className="w-full h-full flex-row justify-center items-center gap-4 md:flex md:w-full">
                <div className="w-full h-1/2 bg-white rounded-2xl shadow-2xl p-4 md:w-1/2">
                    <div>
                        <h1 className="text-[16px] font-bold">ชื่อ</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="text" name="username" onChange={handleChange} value={data.username || ""}  placeholder="username1234" />
                    </div>
                     {
                        data.password ? (<div>
                            <h1 className="text-[16px] font-bold">รหัสผ่าน</h1>
                            <div onClick={() => setShowPopupAdd(true)} className="bg-green-400 text-white border-[1px] rounded-[8px] p-1 w-1/2 flex justify-center items-center hover:bg-[#1E3A8A] hover:text-white"><svg className=" fill-current" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 26 26">
                                <path d="M 16 0 C 13.789063 0 11.878906 0.917969 10.6875 2.40625 C 9.496094 3.894531 9 5.824219 9 7.90625 L 9 9 L 12 9 L 12 7.90625 C 12 6.328125 12.390625 5.085938 13.03125 4.28125 C 13.671875 3.476563 14.542969 3 16 3 C 17.460938 3 18.328125 3.449219 18.96875 4.25 C 19.609375 5.050781 20 6.308594 20 7.90625 L 20 9 L 23 9 L 23 7.90625 C 23 5.8125 22.472656 3.863281 21.28125 2.375 C 20.089844 0.886719 18.207031 0 16 0 Z M 9 10 C 7.34375 10 6 11.34375 6 13 L 6 23 C 6 24.65625 7.34375 26 9 26 L 23 26 C 24.65625 26 26 24.65625 26 23 L 26 13 C 26 11.34375 24.65625 10 23 10 Z M 16 15 C 17.105469 15 18 15.894531 18 17 C 18 17.738281 17.597656 18.371094 17 18.71875 L 17 21 C 17 21.550781 16.550781 22 16 22 C 15.449219 22 15 21.550781 15 21 L 15 18.71875 C 14.402344 18.371094 14 17.738281 14 17 C 14 15.894531 14.894531 15 16 15 Z"></path>
                            </svg></div>
                        </div>) : (<div>
                            <h1 className="text-[16px] font-bold">รหัสผ่าน</h1>
                            <div onClick={() => setShowPopupAdd(true)} className="bg-white border-[1px] rounded-[8px] p-1 w-1/2 flex justify-center items-center hover:bg-[#1E3A8A] hover:text-white"><svg className=" fill-current" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 26 26">
                                <path d="M 16 0 C 13.789063 0 11.878906 0.917969 10.6875 2.40625 C 9.496094 3.894531 9 5.824219 9 7.90625 L 9 9 L 12 9 L 12 7.90625 C 12 6.328125 12.390625 5.085938 13.03125 4.28125 C 13.671875 3.476563 14.542969 3 16 3 C 17.460938 3 18.328125 3.449219 18.96875 4.25 C 19.609375 5.050781 20 6.308594 20 7.90625 L 20 9 L 23 9 L 23 7.90625 C 23 5.8125 22.472656 3.863281 21.28125 2.375 C 20.089844 0.886719 18.207031 0 16 0 Z M 9 10 C 7.34375 10 6 11.34375 6 13 L 6 23 C 6 24.65625 7.34375 26 9 26 L 23 26 C 24.65625 26 26 24.65625 26 23 L 26 13 C 26 11.34375 24.65625 10 23 10 Z M 16 15 C 17.105469 15 18 15.894531 18 17 C 18 17.738281 17.597656 18.371094 17 18.71875 L 17 21 C 17 21.550781 16.550781 22 16 22 C 15.449219 22 15 21.550781 15 21 L 15 18.71875 C 14.402344 18.371094 14 17.738281 14 17 C 14 15.894531 14.894531 15 16 15 Z"></path>
                            </svg></div>
                        </div>)
                    } 
                    <div>
                        <h1 className="text-[16px] font-bold">อีเมล</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="email" name="email" onChange={handleChange} value={data.email || ""}  placeholder="user@Gmail.com" />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">เบอร์โทร</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="number" name="phone" onChange={handleChange} value={data.phone || ""}  placeholder="012-314-5678" />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">ที่อยู่</h1>
                        <textarea className="bg-white border-[1px] rounded-[8px] p-1 w-full " name="address" onChange={handleChange} value={data.address || ""}  placeholder="44/2001 Thai....." />
                    </div>
                </div>
                <div className="flex justify-center items-center m-8 md:m-0">
                    <div className="w-fit h-fit bg-[#F3F4F6]  rounded-2xl shadow-2xl p-4 flex flex-col justify-center gap-2">
                        <h1 className="text-[16px] font-bold">หน้าที่</h1>
                        <div className="flex gap-2">
                            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                <input type="radio" name="role" value={"admin"} className=" peer hidden" />
                                <span className="p-1 border rounded-[8px] shadow-xl bg-white cursor-pointer hover:bg-[#1E3A8A] hover:text-white peer-checked:bg-[#1E3A8A] peer-checked:text-white">admin</span>
                            </label>
                            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                <input type="radio" name="role" value={"user"} className=" peer hidden" />
                                <span className="p-1 border rounded-[8px] shadow-xl bg-white cursor-pointer hover:bg-[#1E3A8A] hover:text-white peer-checked:bg-[#1E3A8A] peer-checked:text-white">user</span>
                            </label>
                        </div>
                        <h1 className="text-[16px] font-bold">อัพโหลด</h1>
                        <div className="w-fit h-fit bg-[#1E3A8A] rounded-[8px] flex justify-center items-center p-3">
                            <label htmlFor="file-upload" className="cursor-pointer shadow-2xl h-full w-full">
                                <input id="file-upload" onChange={handleUpload} multiple className="hidden" type="file" accept="image/*" /><Image src={"/icons/icons8-upload-48.png"} alt="icon upload" width={20} height={20} />
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
            <div className="text-end"><button type="submit" className="bg-[#1E3A8A] px-4 py-2 rounded-2xl text-white">บันทึก</button></div>
        </form>
    )
}