"use client";
import { useState } from "react";
import SideBar from "@/components/dashboard/sidebarAdmin";
import Header from "@/components/dashboard/header";
import { ThemeProvider } from "@/public/context/theme-context";



export default function DashboardLayout({ children }) {
    const [openSidebar, setOpenSidebar] = useState(false)

    const handleToggle = () => {
        setOpenSidebar(prev => !prev)
    }
    return (
        <div className="w-screen h-screen flex overflow-hidden">
            <SideBar open={openSidebar} />
            <div className="flex flex-col w-full h-full">
                <Header onToggleMenu={handleToggle} />
                <ThemeProvider>
                    <div className="flex-1 p-5 overflow-x-auto bg-[#ffffff]">
                        {children}
                    </div>
                </ThemeProvider>
            </div>
        </div>
    );
}



