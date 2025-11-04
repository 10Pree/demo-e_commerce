"use client";
import { useState } from "react";
import SideBar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";


export default function DashboardLayout({ children }) {
      const  [openSidebar, setOpenSidebar] = useState(false)

  const handleToggle = () => {
    setOpenSidebar(prev => !prev)
  }
    return (
        <div className="w-screen h-screen flex">
            <SideBar open={openSidebar}/>
            <div className="flex flex-col w-full h-full">
                <Header onToggleMenu={handleToggle} />
                <main className="flex-1 p-5 overflow-x-auto bg-[#F3F4F6]">
                    {children}
                </main>
            </div>
        </div>
    );
}



