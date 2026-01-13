"use client"
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
    const [loginData,setLoginData ] = useState({
            email: "",
            password: ""
        })

console.log(loginData)

    const handleLogin = async() => {
        try{
            const res = await axios.post("http://localhost:8000/login", loginData)
            alert("Login Successful!!")
        }catch(error){
            console.log("Message Error: ", error)
        }
    }

    return(
        <div className="w-full h-screen flex justify-center items-center p-4 md:p-0">
            <div className="w-full md:w-[477px] h-[500px] bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col items-center gap-4 p-4 md:p-0">
                <Image src={"/images/logo.png"} width={130} height={130} alt="logo"/>
                <div className="w-full md:w-[389px] flex flex-col gap-4">
                    <input onChange={(e)=> setLoginData({...loginData, email: e.target.value})} className="w-full h-[60px] p-2 border-2 border-[#1E3A8A] rounded-[8px] font-bold" type="email" placeholder="user@gmail.com"/>
                    <input onChange={(e)=> setLoginData({...loginData, password: e.target.value})} className="w-full h-[60px] p-2 border-2 border-[#1E3A8A] rounded-[8px] font-bold" type="password" placeholder="รหัสผ่าน"/>
                </div>
                <button onClick={handleLogin} className="w-full md:w-[389px] h-[60px] p-2 bg-[#1E3A8A] rounded-[8px] font-bold text-white mt-8 cursor-pointer hover:bg-white hover:border-2 hover:border-[#1E3A8A] hover:text-[#1E3A8A]">เข้าสู่ระบบ</button>
            </div>
        </div>
    )
}