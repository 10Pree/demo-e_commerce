import Link from "next/link"

export default function SideBar() {
    const menus = [
        { id:1, href: '/', label: "หน้าหลัก"},
        { id:2, href: '/', label: "Dashboard"},
        { id:3, href: '/', label: "ผู้ใช้งาน"},
        { id:4, href: '/', label: "log"},
    ]
    return(
        <div className=" w-screen h-screen">
            <nav className="bg-[#1E3A8A] w-[283px] h-full">
                {menus.map((m) => {
                    return(
                        <div key={m.id}>
                            <Link href={m.href}>{m.label}</Link>
                        </div>
                    )
                })}
            </nav>
        </div>
    )
}