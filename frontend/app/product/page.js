"use client"
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {

  const [category, setCategory] = useState("")
  const [search, setSearch] = useState("")
  const [apiProducts, setapiProducts] = useState([])
  useEffect(() => {
    const getDataProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/search", {
          params: {
            search: search,
            category: category
          }
        })
        setapiProducts(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    const timeOut = setTimeout(() => {
      getDataProducts()
    }, 500)

    return () => clearTimeout(timeOut)
  }, [search, category])
  return (
    <>
      <div className=" flex flex-col justify-center items-center my-4">
        <div className="flex flex-col justify-center items-center">
          <div className="w-[280px] md:w-[480px] h-[38px] bg-[#F3F4F6] rounded-[8px] relative">
            <input value={search} onChange={(e) => setSearch(e.target.value)} className=" absolute w-full h-full pl-10 focus:" type="text" />
            <Image className="absolute top-2 left-2 invert" src={"/icons/icons8-search-60.svg"} width={25} height={25} alt="icon" />
          </div>
          <div className="w-[280px] md:w-[480px] h-[38px] flex gap-2 mt-2">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-[50%] h-[38px] bg-[#F3F4F6] rounded-[8px]">
              <option value="">เลือก</option>
              <option value="1">Smartphone</option>
              <option value="2">ACCESSORIES SMARTPHONE</option>
              <option value="3">SMART WATCH</option>
              <option value="4">SMART LIFE & IOT</option>
              <option value="5">NOTEBOOK</option>
              <option value="6">ACCESSORIES NOTEBOOK</option>
              <option value="7">HEADSET</option>
              <option value="8">MICROPHONE</option>
            </select>
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-12 mb-[80px] md:mb-0 py-4">
          <div className="w-full md:w-fit grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 mx-2 md:mx-0">
            {apiProducts.length > 0 && (
              apiProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="w-full h-[300px] md:w-[230px] md:h-[300px] shadow-2xl rounded-xl bg-white cursor-pointer border border-gray-300 group ">
                  <div className=" relative bg-[#F3F4F6] h-36 w-full flex justify-center items-center rounded-t-xl group-hover:bg-gray-200 duration-300 ease-in">
                    <Image className="object-contain" src={"/images/iphone-card-40-17pro.png"}  alt="image product" fill />
                  </div>
                  <div className="p-3 flex flex-col gap-1 text-[#111827]">
                    <span className="font-bold line-clamp-1">{p.p_name}</span>
                    <p className=" font-light text-gray-500 w-full h-full line-clamp-2 md:line-clamp-3">{p.p_details}</p>
                    <div className="font-bold text-2xl text-end text-[#1E3A8A]">{p.p_price}฿</div>
                  </div>
                </Link>
              ))
            )
            }
            {apiProducts.length === 0 && (
              <div className="w-screen h-screen flex justify-center items-center">
                <div className="flex flex-col justify-center items-center opacity-50">
                  <Image src="/images/logo.png" alt="logo" width={100} height={100} />
                  <span className="text-2xl font-bold text-[#111827]">ไม่มีสินค้าอยู่</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}