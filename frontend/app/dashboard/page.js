"use client";

import Header from "@/components/dashboard/header";
import SideBar from "@/components/dashboard/sidebar";
import Image from "next/image";
import { useState } from "react";
export default function Page() {
  const  [openSidebar, setOpenSidebar] = useState(false)

  const handleToggle = () => {
    setOpenSidebar(prev => !prev)
    // console.log(openSidebar)
  }
  return (
    <div className="w-screen h-screen flex">
        <SideBar open={openSidebar} />
      <div className="flex flex-col w-full h-full">
      <Header onToggleMenu={handleToggle}/>
        <main className="w-full h-full flex justify-center items-center p-10">
          <div className="w-full h-full">
            <div className="flex gap-7 justify-center items-center flex-col  md:flex-row md:gap-14">
              <div className="w-[314px] h-[183px] bg-[#1E3A8A] flex justify-center items-center gap-20 rounded-3xl">
                <Image
                  className="pb-25 "
                  src={"/icons/icons8-search.svg"}
                  width={50}
                  height={50}
                  alt="icon"
                />
                <div className=" flex flex-col gap-5">
                  <h1>รายได้วันนี้</h1>
                  <h1>9999+</h1>
                </div>
              </div>
              <div className="w-[314px] h-[183px] bg-[#1E3A8A] flex justify-center items-center gap-20 rounded-3xl">
                <Image
                  className="pb-25 "
                  src={"/icons/icons8-search.svg"}
                  width={50}
                  height={50}
                  alt="icon"
                />
                <div className=" flex flex-col gap-5">
                  <h1>รายได้วันนี้</h1>
                  <h1>9999+</h1>
                </div>
              </div>
              <div className="w-[314px] h-[183px] bg-[#1E3A8A] flex justify-center items-center gap-20 rounded-3xl">
                <Image
                  className="pb-25 "
                  src={"/icons/icons8-search.svg"}
                  width={50}
                  height={50}
                  alt="icon"
                />
                <div className=" flex flex-col gap-5">
                  <h1>รายได้วันนี้</h1>
                  <h1>9999+</h1>
                </div>
              </div>
            </div>

            <div className="w-full h-4/5 bg-gray-200 ">
                
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
