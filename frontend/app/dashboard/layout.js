"use client";
import { useState } from "react";
import SideBar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";


export default function DashboardLayout({ children }) {
      const  [openSidebar, setOpenSidebar] = useState(false)

  const handleToggle = () => {
    setOpenSidebar(prev => !prev)
    // console.log(openSidebar)
  }
    return (
        <div className=" w-screen h-screen flex overflow-hidden">
            <SideBar open={openSidebar}/>
            <div className="flex flex-col flex-1 h-full ">
                <Header onToggleMenu={handleToggle} />
                <main className="flex-1  p-5 bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
}



