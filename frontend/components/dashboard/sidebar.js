import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

export default function SideBar({ open }) {
    const menus = [
        { id: 1, href: '/dashboard/main', label: "หน้าหลัก" },
        { id: 2, href: '/dashboard/overview', label: "Dashboard" },
        { id: 3, href: '/dashboard/users', label: "ผู้ใช้งาน" },
        { id: 4, href: '/dashboard/logs', label: "Log" },
    ]
    const [logOpen, setLogOpen] = useState(false)
    const handleLog = () => {
        setLogOpen(prev => !prev)
    }
    return (
        <div className={`bg-[#1E3A8A] flex-shrink-0 w-[59%] md:w-[200px] h-full lg:block  ${open ? "block" : "hidden"}`}>
            <nav className="w-full h-full">
                <div className="flex justify-center items-center">
                    <Image src="/images/logo.png" alt="logo" width={75} height={75} />
                </div>
                <div className=" flex flex-col gap-3 pl-10 pt-10">
                    <Link className="text-white hover:text-[#2563EB] w-fit rounded-2xl" href="/dashboard/main">หน้าหลัก</Link>
                    <Link className="text-white hover:text-[#2563EB] w-fit rounded-2xl" href="/dashboard/products">สินค้า</Link>
                    <Link className="text-white hover:text-[#2563EB] w-fit rounded-2xl" href="/dashboard/users">ผู้ใช้งาน</Link>
                    <div>
                        <button onClick={handleLog} className="text-white w-fit hover:text-[#2563EB] rounded-2xl text-start">Logs <span className="text-[13px]">{logOpen ? "▼" : "▲"}</span></button>
                        {
                            logOpen && (
                                <div className="flex flex-col ml-3 mt-2 gap-2 animate-fadeIn">
                                    <Link className="text-white hover:text-[#2563EB] w-fit rounded-2xl" href="/dashboard/logs/users">ผู้ใช้งาน</Link>
                                    <Link className="text-white hover:text-[#2563EB] w-fit rounded-2xl" href="/dashboard/logs/products">สินค้า</Link>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="w-full pl-10 mt-[100%]">
                    <Link className="cursor-pointer " href="/">
                        <Image src={"/icons/icons8-logout-50.png"} width={20} height={20} alt="icon" />
                    </Link>
                </div>
            </nav>
        </div>
    )
}