import Link from "next/link"
import Image from "next/image"

export default function SideBar({ open }) {
    const menus = [
        { id: 1, href: '/', label: "หน้าหลัก" },
        { id: 2, href: '/', label: "Dashboard" },
        { id: 3, href: '/', label: "ผู้ใช้งาน" },
        { id: 4, href: '/', label: "Log" },
    ]

    return (
        <div className={`bg-[#1E3A8A] flex-shrink-0 w-[59%] md:w-[200px] h-full lg:block  ${open ? "block": "hidden"}`}>
            <nav className="w-full h-full">
                        <div className="flex justify-center items-center">
                          <Image src="/images/logo.png" alt="logo" width={75} height={75} />
                        </div>
                <div className=" flex flex-col gap-3 pl-10 pt-10">
                    {menus.map((m) => {
                        return (
                            <div className="" key={m.id}>
                                <Link className=" text-white" href={m.href}>{m.label}</Link>
                            </div>
                        )
                    })}
                </div>
                <div className="w-full pl-10 mt-20">
                                    <Link className="cursor-pointer " href={"/"}>
                    <Image src={"/icons/icons8-logout-50.png"} width={20} height={20} alt="Logo" />
                </Link>
                </div>
            </nav>
        </div>
    )
}