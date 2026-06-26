"use client"
import Image from "next/image"
import { Graph1, Graph2, Graph3 } from "@/public/js/recharts";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {

  const [showGraph, setShowGraph] = useState(1)
  const [dailyRevenue, setDailyRevenue] = useState([])
  const [dailyOrders, setDailyOrders] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [summary, setSummary] = useState({
    total_orders: 0,
    total_products: 0,
    paid_orders: 0,
    pending_orders: 0,
    total_revenue: 0
  })

  useEffect(() => {
    const getData = async () => {
      const [summary, daily] = await Promise.all([axios.get(`${process.env.NEXT_PUBLIC_URL}/order/summary`), axios.get(`${process.env.NEXT_PUBLIC_URL}/order/daily`)])
      const dayNames = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์']
      setSummary(summary.data.data[0])
      
        setDailyRevenue(daily.data.dataPayments.map(item => ({
            ...item,
            name: dayNames[new Date(item.date).getDay()] 
        })))
      setDailyOrders(daily.data.dataOrders.map(item => ({
        ...item,
        name: dayNames[new Date(item.date).getDay()]
      })))
      setCategoryData(daily.data.dataCategoriesProduct)
    }
    getData()
  }, [])

  const cards = [
    {
      id: 1,
      label: "รายได้วันนี้",
      value: summary?.total_revenue ?? 0,
      icon: "/icons/icons8-search-90.svg",
      change: "+12.4%",
    },
    {
      id: 2,
      label: "จำนวนออเดอร์",
      value: summary?.total_orders ?? 0,
      icon: "/icons/icons8-search-90.svg",
      change: "+8.1%",
    },
    {
      id: 3,
      label: "สินค้าทั้งหมด",
      value: summary?.total_products ?? 0,
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
          {showGraph === 1 && <Graph1 data={dailyRevenue} />}
          {showGraph === 2 && (
            <div className="w-[900px] md:w-full h-full">
              <Graph2 data={dailyOrders} />
            </div>
          )}
          {showGraph === 3 && (
            <div className="w-[900px] md:w-full h-full">
              <Graph3 data={categoryData} />
            </div>
          )}
        </div>
      </div>

    </main>
  );
}
