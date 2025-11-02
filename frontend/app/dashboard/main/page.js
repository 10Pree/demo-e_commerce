"use client";
import Image from "next/image";
import { Graph1, Graph2, Graph3 } from "@/public/js/recharts";
import { useState } from "react";

export default function Page() {

  const [showGraph, setShowGraph] = useState(1)

  const revenueData = [
    { name: "จันทร์", income: 12500 },
    { name: "อังคาร", income: 15200 },
    { name: "พุธ", income: 9800 },
    { name: "พฤหัส", income: 20000 },
    { name: "ศุกร์", income: 17500 },
    { name: "เสาร์", income: 21000 },
    { name: "อาทิตย์", income: 14000 },
  ];

  const orderData = [
    { name: "จันทร์", orders: 45 },
    { name: "อังคาร", orders: 60 },
    { name: "พุธ", orders: 38 },
    { name: "พฤหัส", orders: 80 },
    { name: "ศุกร์", orders: 72 },
    { name: "เสาร์", orders: 95 },
    { name: "อาทิตย์", orders: 50 },
  ];

  const productData = [
    { category: "Smartphone", stock: 320 },
    { category: "ACCESSORIES SMARTPHONE", stock: 450 },
    { category: "SMART WATCH", stock: 180 },
    { category: "SMART LIFE & IOT", stock: 390 },
    { category: "NOTEBOOK", stock: 220 },
    { category: "ACCESSORIES NOTEBOOK", stock: 220 },
    { category: "HEADSET", stock: 220 },
    { category: "MICROPHONE", stock: 220 },
    { category: "MICROPHONE111", stock: 220 },
  ];


  return (
    <main className="w-full h-full flex justify-center items-center p-10">
      <div className="w-full h-full">
        <div className="flex gap-7 justify-center items-center flex-col  md:flex-row md:gap-14">
          <button onClick={() => setShowGraph(1)} className="w-[314px] h-[183px] bg-[#1E3A8A] flex justify-center items-center gap-15 rounded-3xl">
            <Image
              className="pb-15"
              src={"/icons/icons8-search-90.svg"}
              width={55}
              height={55}
              alt="icon"
            />
            <div className=" flex flex-col gap-5">
              <h1 className=" text-3xl font-normal text-white">รายได้วันนี้</h1>
              <h1 className=" text-3xl font-bold text-white tracking-wide">+9999</h1>
            </div>
          </button>
          <button onClick={() => setShowGraph(2)} className="w-[314px] h-[183px] bg-[#1E3A8A] flex justify-center items-center gap-15 rounded-3xl">
            <Image
              className="pb-15"
              src={"/icons/icons8-search-90.svg"}
              width={55}
              height={55}
              alt="icon"
            />
            <div className=" flex flex-col gap-5">
              <h1 className=" text-3xl font-normal text-white">จำนวนออเดอร์</h1>
              <h1 className=" text-3xl font-bold text-white tracking-wide">+9999</h1>
            </div>
          </button>
          <button onClick={() => setShowGraph(3)} className="w-[314px] h-[183px] bg-[#1E3A8A] flex justify-center items-center gap-15 rounded-3xl">
            <Image
              className="pb-15"
              src={"/icons/icons8-search-90.svg"}
              width={55}
              height={55}
              alt="icon"
            />
            <div className=" flex flex-col gap-5">
              <h1 className=" text-3xl font-normal text-white">จำนวนสินค้าทั้งหมด</h1>
              <h1 className=" text-3xl font-bold text-white tracking-wide">+9999</h1>
            </div>
          </button>
        </div>
        <h1 className="my-5 text-3xl font-bold">Dashboard</h1>
        <div className="w-[100%] h-[80%] bg-white rounded-xl shadow p-4">
          {showGraph === 1 ? <Graph1 data={revenueData} /> : <div className="text-center hidden">ไม่มีกราฟ</div>}
          {showGraph === 2 ? <Graph2 data={orderData} /> : <div className="text-center hidden">ไม่มีกราฟ</div>}
          {showGraph === 3 ? <Graph3 data={productData} /> : <div className="text-center hidden">ไม่มีกราฟ</div>}
        </div>
      </div>
    </main>
  );
}
