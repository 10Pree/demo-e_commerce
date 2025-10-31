"use client";
import Image from "next/image";
import Graph1 from "@/public/js/recharts";

export default function Page() {

const data = [
    {
        name: 'Page A',
        uv: 400,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 300,
        pv: 4567,
        amt: 2400,
    },
    {
        name: 'Page C',
        uv: 320,
        pv: 1398,
        amt: 2400,
    },
    {
        name: 'Page D',
        uv: 200,
        pv: 9800,
        amt: 2400,
    },
    {
        name: 'Page E',
        uv: 278,
        pv: 3908,
        amt: 2400,
    },
    {
        name: 'Page F',
        uv: 189,
        pv: 4800,
        amt: 2400,
    },
];


  return (
    <main className="w-full h-full flex justify-center items-center p-10">
      <div className="w-full h-full">
        <div className="flex gap-7 justify-center items-center flex-col  md:flex-row md:gap-14">
          <div className="w-[314px] h-[183px] bg-[#1E3A8A] flex justify-center items-center gap-15 rounded-3xl">
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
          </div>
          <div className="w-[314px] h-[183px] bg-[#1E3A8A] flex justify-center items-center gap-15 rounded-3xl">
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
          </div>
          <div className="w-[314px] h-[183px] bg-[#1E3A8A] flex justify-center items-center gap-15 rounded-3xl">
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
          </div>
        </div>
        <h1 className="my-5 text-3xl font-bold">Dashboard</h1>
        <div className="w-[100%] h-[80%]  bg-white rounded-xl shadow p-4">
          <Graph1 data={data}/>
        </div>
      </div>
    </main>
  );
}
