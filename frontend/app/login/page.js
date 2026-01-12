import Image from "next/image";

export default function Page() {
    return(
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[477px] h-[500px] bg-white border border-gray-100 rounded-2xl shadow-lg flex flex-col items-center gap-4">
                <Image src={"/images/logo.png"} width={130} height={130} alt="logo"/>
                <div className="w-[389px] flex flex-col gap-4">
                    <input className="w-full h-[60px] p-2 border-2 border-[#1E3A8A] rounded-[8px] font-bold" type="email" placeholder="user@gmail.com"/>
                    <input className="w-full h-[60px] p-2 border-2 border-[#1E3A8A] rounded-[8px] font-bold" type="password" placeholder="รหัสผ่าน"/>
                </div>
                <button className="w-[389px] h-[60px] p-2 bg-[#1E3A8A] rounded-[8px] font-bold text-white mt-8 cursor-pointer hover:bg-white hover:border-2 hover:border-[#1E3A8A] hover:text-[#1E3A8A]">เข้าสู่ระบบ</button>
            </div>
        </div>
    )
}