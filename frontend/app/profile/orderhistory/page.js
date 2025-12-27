"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const [opanFrom, setOpanFrom] = useState("all")

    console.log(opanFrom)
    return (
        <div className="w-full h-screen">
            <div className="flex justify-start items-start gap-2 ml-2 mt-2 md:ml-48 md:mt-12 mb-4">
                <Link href={"/"} className="bg-[#1E3A8A] w-[25px] h-[25px] rounded-[8px] flex justify-center items-center">
                    <Image src={"/icons/icons8-back-w-52.png"} width={19} height={19} alt="icon" />
                </Link>
                <span className=" font-bold text-[#111827]">กลับ</span>
            </div>
            <main className="flex flex-col justify-center items-center gap-4 p-2 md:p-0">
                <div className=" border-2 w-full h-[88px] md:w-[1040px] md:h-[88px] mx-2 md:mx-0 rounded-2xl flex justify-center items-center gap-[20px] md:gap-[100px] shadow-md">
                    <button onClick={() => setOpanFrom("all")} className="text-[12px] md:text-[16px] hover:bg-[#111827] focus:bg-[#111827] hover:text-white focus:text-white w-[150px] h-[70px] font-bold flex justify-center items-center rounded-[8px] transition delay-20 ease-in cursor-pointer">ทั้งหมด</button>
                    <button onClick={() => setOpanFrom("pay")} className="text-[12px] md:text-[16px] hover:bg-[#111827] focus:bg-[#111827] hover:text-white focus:text-white w-[150px] h-[70px] font-bold flex justify-center items-center rounded-[8px] transition delay-20 ease-in">ที่ต้องชำละ</button>
                    <button onClick={() => setOpanFrom("ship")} className="text-[12px] md:text-[16px] hover:bg-[#111827] focus:bg-[#111827] hover:text-white focus:text-white w-[150px] h-[70px] font-bold flex justify-center items-center rounded-[8px] transition delay-20 ease-in">ที่ต้องจัดส่ง</button>
                    <button onClick={() => setOpanFrom("success")} className="text-[12px] md:text-[16px] hover:bg-[#111827] focus:bg-[#111827] hover:text-white focus:text-white w-[150px] h-[70px] font-bold flex justify-center items-center rounded-[8px] transition delay-20 ease-in">สำเร็จแล้ว</button>
                </div>
                {opanFrom === "all" && (
                    <div className="border-2 w-full h-[400px] md:w-[1040px] md:h-[400px] rounded-2xl flex flex-col items-center gap-4 shadow-md px-2 py-8 md:px-0 overflow-y-scroll">
                        <div className="w-full h-[87px] md:w-[1000px] md:h-[97px] border-2 rounded-[8px] flex justify-between items-center px-1 md:px-8 shadow-md shrink-0">
                            <div className="flex justify-center items-center gap-1 ">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />   
                                <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                            </div>
                            <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                            <span className="text-[#EF4444] text-center text-[12px] md:text-[16px]">ที่ต้องรอการชำละ</span>
                        </div>
                        <div className="w-full h-[87px] md:w-[1000px] md:h-[97px] border-2 rounded-[8px] flex justify-between items-center px-1 md:px-8 shadow-md shrink-0">
                            <div className="flex justify-center items-center gap-1">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                                <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                            </div>
                            <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                            <span className="text-[#F97316] text-center text-[12px] md:text-[16px]">ที่ต้องจัดส่ง</span>
                        </div>
                        <div className="w-full h-[87px] md:w-[1000px] md:h-[97px] border-2 rounded-[8px] flex justify-between items-center px-1 md:px-8 shadow-md shrink-0">
                            <div className="flex justify-center items-center gap-1">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                                <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                            </div>
                            <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                            <span className="text-[#10B981] text-center text-[12px] md:text-[16px]">สำเร็จแล้ว</span>
                        </div>
                        <div className="w-full h-[87px] md:w-[1000px] md:h-[97px] border-2 rounded-[8px] flex justify-between items-center px-1 md:px-8 shadow-md shrink-0">
                            <div className="flex justify-center items-center gap-1">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                                <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                            </div>
                            <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                            <span className="text-[#EF4444] text-center text-[12px] md:text-[16px]">ที่ต้องรอการชำละ</span>
                        </div>
                        <div className="w-full h-[87px] md:w-[1000px] md:h-[97px] border-2 rounded-[8px] flex justify-between items-center px-1 md:px-8 shadow-md shrink-0">
                            <div className="flex justify-center items-center gap-1">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                                <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                            </div>
                            <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                            <span className="text-[#F97316] text-center text-[12px] md:text-[16px]">ที่ต้องจัดส่ง</span>
                        </div>
                        <div className="w-full h-[87px] md:w-[1000px] md:h-[97px] border-2 rounded-[8px] flex justify-between items-center px-1 md:px-8 shadow-md shrink-0">
                            <div className="flex justify-center items-center gap-1">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                                <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                            </div>
                            <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                            <span className="text-[#10B981] text-center text-[12px] md:text-[16px]">สำเร็จแล้ว</span>
                        </div>
                    </div>
                )}
                {opanFrom === "pay" && (
                    <div className="border-2 w-full h-[400px] md:w-[1040px] md:h-[400px] rounded-2xl flex flex-col items-center gap-4 shadow-md px-2 py-8 md:px-0 overflow-y-scroll">
                        <div className="w-full h-[87px] md:w-[1000px] md:h-[97px] border-2 rounded-[8px] flex justify-between items-center px-1 md:px-8 shadow-md shrink-0">
                            <div className="flex justify-center items-center gap-1 ">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                                <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                            </div>
                            <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                            <span className="text-[#EF4444] text-center text-[12px] md:text-[16px]">ที่ต้องรอการชำละ</span>
                        </div>
                        <div className="w-full h-[87px] md:w-[1000px] md:h-[97px] border-2 rounded-[8px] flex justify-between items-center px-1 md:px-8 shadow-md shrink-0">
                            <div className="flex justify-center items-center gap-1">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                                <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                            </div>
                            <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                            <span className="text-[#EF4444] text-center text-[12px] md:text-[16px]">ที่ต้องรอการชำละ</span>
                        </div>
                    </div>
                )}
                {opanFrom === "ship" && (
                    <div className="border-2 w-full h-[400px] md:w-[1040px] md:h-[400px] rounded-2xl flex flex-col items-center gap-4 shadow-md px-2 py-8 md:px-0 overflow-y-scroll">
                        <div className="w-full h-[87px] md:w-[1000px] md:h-[97px] border-2 rounded-[8px] flex justify-between items-center px-1 md:px-8 shadow-md shrink-0">
                            <div className="flex justify-center items-center gap-1">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                                <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                            </div>
                            <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                            <span className="text-[#F97316] text-center text-[12px] md:text-[16px]">ที่ต้องจัดส่ง</span>
                        </div>
                        <div className="w-full h-[87px] md:w-[1000px] md:h-[97px] border-2 rounded-[8px] flex justify-between items-center px-1 md:px-8 shadow-md shrink-0">
                            <div className="flex justify-center items-center gap-1">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                                <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                            </div>
                            <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                            <span className="text-[#F97316] text-center text-[12px] md:text-[16px]">ที่ต้องจัดส่ง</span>
                        </div>
                    </div>
                )}
                {opanFrom === "success" && (
                    <div className="border-2 w-full h-[400px] md:w-[1040px] md:h-[400px] rounded-2xl flex flex-col items-center gap-4 shadow-md px-2 py-8 md:px-0 overflow-y-scroll">
                        <div className="w-full h-[87px] md:w-[1000px] md:h-[97px] border-2 rounded-[8px] flex justify-between items-center px-1 md:px-8 shadow-md shrink-0">
                            <div className="flex justify-center items-center gap-1">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                                <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                            </div>
                            <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                            <span className="text-[#10B981] text-center text-[12px] md:text-[16px]">สำเร็จแล้ว</span>
                        </div>
                        <div className="w-full h-[87px] md:w-[1000px] md:h-[97px] border-2 rounded-[8px] flex justify-between items-center px-1 md:px-8 shadow-md shrink-0">
                            <div className="flex justify-center items-center gap-1">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                                <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                            </div>
                            <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                            <span className="text-[#10B981] text-center text-[12px] md:text-[16px]">สำเร็จแล้ว</span>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}