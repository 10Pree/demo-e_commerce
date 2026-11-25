"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/public/context/theme-context";
import { ApexOptions } from "apexcharts";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import CardHeader from "./card-header";
import { monthKeys, monthlySalesData } from "./data";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const baht = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const conut = new Intl.NumberFormat("th-TH")

export default function WeeklySalesChart() {
  const { theme } = useTheme();
  const [showGraph, setShowGraph] = useState(1);
  const [dailyRevenue, setDailyRevenue] = useState([]);
  const [dailyOrders, setDailyOrders] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [summary, setSummary] = useState({
    total_orders: 0,
    total_products: 0,
    paid_orders: 0,
    pending_orders: 0,
    total_revenue: 0,
  });

  // const chartTitles: Record<ChartId, string> = {
  //   1: "รายได้รายวัน",
  //   2: "จำนวนออเดอร์รายวัน",
  //   3: "สินค้าแต่ละหมวดหมู่",
  // };

const MONTHS_TH: Record<string, string> = {
  Jan: "ม.ค.",
  Feb: "ก.พ.",
  Mar: "มี.ค.",
  Apr: "เม.ย.",
  May: "พ.ค.",
  Jun: "มิ.ย.",
  Jul: "ก.ค.",
  Aug: "ส.ค.",
  Sep: "ก.ย.",
  Oct: "ต.ค.",
  Nov: "พ.ย.",
  Dec: "ธ.ค.",
};

  const DAY_NAMES = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

  const dayName = (value: string) => {
  const d = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(...(value.split("-").map(Number) as [number, number, number]).map((n, i) => (i === 1 ? n - 1 : n)) as [number, number, number])
    : new Date(value);
  return DAY_NAMES[d.getDay()];
};

  const charts = useMemo(() => {
    if(showGraph === 1) {
      return {
        name: "รายได้",
        // labels: dailyRevenue.map((r) => dayName(r.date)),
        labels: monthKeys.map((key) => MONTHS_TH[key]),
        // values: dailyRevenue.map((r) => r.revenue),
        values: dailyRevenue.map((r) => r.revenue),
        short: (v:number) => (v >= 1000 ? `฿${(v / 1000).toFixed(1)}k` : baht.format(v)),
        format: (v : number) => baht.format(v)
      }
    }

    if(showGraph === 2) {
      return {
        name: "จำนวนออเดอร์",
        labels: monthKeys.map((key) => MONTHS_TH[key]),
        values: dailyOrders.map((r) => r.paid_orders),
        short: (v:number) => (v >= 1000 ? `฿${(v / 1000).toFixed(1)}k` : baht.format(v)),
        format: (v : number) => baht.format(v)
      }
    }
  }, [showGraph, dailyRevenue, dailyOrders, categoryData])

  const values = dailyRevenue.map((d) => Number(d.revenue) || 0);
  const maxValue = Math.max(0, ...values);

  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 200,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "38%",
        borderRadius: 8,
        borderRadiusApplication: "around",
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val : number) => (val > 0 ? charts.short(val) : ""),
      offsetY: -20,
      style: {
        fontSize: "12px",
        fontFamily: "Outfit, sans-serif",
        fontWeight: 400,
        colors: [theme === "dark" ? "#94A3B8" : "#364153"],
      },
      dropShadow: {
        enabled: false,
      },
    },
    stroke: {
      show: false,
    },
    xaxis: {
      categories: charts.labels,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: theme === "dark" ? "#94A3B8" : "#364153",
          fontFamily: "Outfit, sans-serif",
        },
      },
    },
    legend: {
      show: false,
    },
    yaxis: {
      max: maxValue > 0 ? Math.ceil(maxValue * 1.25) : 100,
      min: 0,
      tickAmount: 4,
      labels: {
        show: false,
      },
    },
    grid: {
      borderColor: theme === "dark" ? "#1E2640" : "#F3F4F6",
      strokeDashArray: 0,
      padding: {
        left: -10,
        right: 0,
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: "#7592FF",
            opacity: 1,
          },
          {
            offset: 100,
            color: "#465FFF",
            opacity: 1,
          },
        ],
      },
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => baht.format(val),
      },
    },
  };
  const series = [
    {
      name: "Weekly Sales",
      data: [...monthlySalesData],
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const [summary, daily] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/summary`),
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/daily`),
      ]);
      setSummary(summary.data.data[0]);
      setDailyRevenue(daily.data.dataPayments || []);
      setDailyOrders(daily.data.dataOrders || []);
      setCategoryData(daily.data.dataCategoriesProduct || []);
    };
    getData();
  }, []);

  const cards = [
    {
      id: 1,
      label: "รายได้วันนี้",
      value: summary?.total_revenue ?? 0,
      icon: "/icons/icons8-search-90.svg",
      // change: "+12.4%",
    },
    {
      id: 2,
      label: "จำนวนออเดอร์",
      value: summary?.total_orders ?? 0,
      icon: "/icons/icons8-search-90.svg",
      // change: "+8.1%",
    },
    {
      id: 3,
      label: "สินค้าทั้งหมด",
      value: summary?.total_products ?? 0,
      icon: "/icons/icons8-search-90.svg",
      change: "9 หมวดหมู่",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-5 sm:px-6 sm:pt-6 sm:pb-5 dark:border-gray-800 dark:bg-white/3">
      {/* <CardHeader /> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => setShowGraph(card.id)}
            className={`flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-200 shadow-sm
              ${
                showGraph === card.id
                  ? "bg-[#1E3A8A] text-white shadow-lg scale-[1.02]"
                  : "bg-white border border-gray-200 text-[#111827] hover:border-[#1E3A8A] hover:shadow-md"
              }`}
          >
            {/* Icon Box */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
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
              <p
                className={`text-sm font-normal ${showGraph === card.id ? "text-blue-200" : "text-gray-500"}`}
              >
                {card.label}
              </p>
              <p className="text-2xl font-bold mt-0.5">{card.value}</p>
              {/* <p
                className={`text-xs mt-1 ${showGraph === card.id ? "text-blue-200" : "text-green-600"}`}
              >
                ↑ {card.change}
              </p> */}
            </div>
          </button>
        ))}
      </div>
      <ScrollArea className="max-w-full">
        <div className="min-w-162.5 xl:min-w-full">
          <ReactApexChart
            key={showGraph}
            options={options}
            series={[{ name: charts.name ,data: charts.values }]}
            type="bar"
            height={200}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
