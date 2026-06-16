"use client"
import Image from "next/image"
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

  const cards = [
    {
      id: 1,
      label: "รายได้วันนี้",
      value: "+9,999",
      icon: "/icons/icons8-search-90.svg",
      change: "+12.4%",
    },
    {
      id: 2,
      label: "จำนวนออเดอร์",
      value: "+9,999",
      icon: "/icons/icons8-search-90.svg",
      change: "+8.1%",
    },
    {
      id: 3,
      label: "สินค้าทั้งหมด",
      value: "+9,999",
      icon: "/icons/icons8-search-90.svg",
      change: "9 หมวดหมู่",
    },
  ]

  const chartTitles = {
    1: "รายได้รายวัน",
    2: "จำนวนออเดอร์รายวัน",
    3: "สินค้าแต่ละหมวดหมู่",
  }

  return (
    <main className="w-full h-full p-6 md:p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#111827]">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">ภาพรวมธุรกิจประจำสัปดาห์</p>
        </div>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-xl">
          สัปดาห์นี้
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => setShowGraph(card.id)}
            className={`flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-200 shadow-sm
              ${showGraph === card.id
                ? "bg-[#1E3A8A] text-white shadow-lg scale-[1.02]"
                : "bg-white border border-gray-200 text-[#111827] hover:border-[#1E3A8A] hover:shadow-md"
              }`}
          >
            {/* Icon Box */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
              ${showGraph === card.id ? "bg-white/20" : "bg-[#EEF2FF]"}`}
            >
              <Image
                src={card.icon}
                width={24}
                height={24}
                alt="icon"
                className={showGraph === card.id ? "brightness-0 invert" : ""}
              />
            </div>

            {/* Text */}
            <div>
              <p className={`text-sm font-normal ${showGraph === card.id ? "text-blue-200" : "text-gray-500"}`}>
                {card.label}
              </p>
              <p className="text-2xl font-bold mt-0.5">{card.value}</p>
              <p className={`text-xs mt-1 ${showGraph === card.id ? "text-blue-200" : "text-green-600"}`}>
                ↑ {card.change}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

        {/* Chart Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-[#111827]">
            {chartTitles[showGraph]}
          </h2>

          {/* Tabs */}
          <div className="flex gap-2">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => setShowGraph(card.id)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-150
                  ${showGraph === card.id
                    ? "bg-[#1E3A8A] text-white border-[#1E3A8A]"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#1E3A8A] hover:text-[#1E3A8A]"
                  }`}
              >
                {card.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="w-full overflow-x-scroll md:overflow-auto h-[340px]">
          {showGraph === 1 && <Graph1 data={revenueData} />}
          {showGraph === 2 && (
            <div className="w-[900px] md:w-full h-full">
              <Graph2 data={orderData} />
            </div>
          )}
          {showGraph === 3 && (
            <div className="w-[900px] md:w-full h-full">
              <Graph3 data={productData} />
            </div>
          )}
        </div>
      </div>

    </main>
  );
}
