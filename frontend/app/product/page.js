"use client"
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const productData = [
    {
      id: 1,
      name: "IPHONE 17 Pro",
      price: 1999,
      detaile: "ชิป A19 Pro พร้อม GPU แบบ 6-core ระบายความร้อนด้วยไอระเหย เพื่อความเร็วสุดขั้ว",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 2,
      name: "Galaxy Z Nova Fold",
      price: 1799,
      detaile: "หน้าจอพับไร้รอย พร้อม AI Flex Mode ช่วยทำงานและถ่ายภาพได้อย่างเหนือระดับ",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 3,
      name: "Pixel X Fusion",
      price: 1499,
      detaile: "กล้อง AI Fusion 108MP ประมวลผลทันทีในชิป Tensor X3 รุ่นใหม่",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 4,
      name: "Xiaomi CyberPhone 12",
      price: 1299,
      detaile: "โครงสร้างไทเทเนียม น้ำหนักเบา พร้อมระบบระบายความร้อนรุ่น CyberCore",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 5,
      name: "ASUS ROG Phone 9X",
      price: 1699,
      detaile: "ชิป Snapdragon 9 Elite Gen พร้อมระบบ AirBoost แบบคู่สำหรับเกมเมอร์",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 6,
      name: "Nothing Phone 3 Pro",
      price: 1099,
      detaile: "ดีไซน์ใสพร้อมไฟ Glyph รุ่นใหม่ โต้ตอบกับการแจ้งเตือนได้แบบเรียลไทม์",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 7,
      name: "Apple Vision Mini",
      price: 2499,
      detaile: "แว่น AR น้ำหนักเบา พร้อมจอ micro-OLED คู่ สำหรับประสบการณ์ผสมโลกจริง",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 8,
      name: "Galaxy Buds Quantum",
      price: 299,
      detaile: "หูฟังระบบ Quantum Bass พร้อมตัดเสียง AI Adaptive Noise ลดเสียงรอบข้างแบบอัจฉริยะ",
      urlImage: "/images/iphone-card-40-17pro.png"
    },

    {
      id: 9,
      name: "iPad Ultra M3",
      price: 1499,
      detaile: "จอ 14 นิ้ว OLED ProMotion พร้อม Apple Pencil Pro",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 10,
      name: "MacBook Air Slim 17",
      price: 2299,
      detaile: "ชิป M3 Ultra ประสิทธิภาพสูงสุด พร้อมดีไซน์บางเฉียบ",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 11,
      name: "ASUS ZenBook AI",
      price: 1899,
      detaile: "โน้ตบุ๊กระบบ AI ทำงานอัตโนมัติ ใช้พลังงานต่ำ",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 12,
      name: "PlayStation 6",
      price: 899,
      detaile: "กราฟิกขั้นเทพ พร้อมเทคโนโลยี AI Upscale 16K",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 13,
      name: "Xbox Omega",
      price: 849,
      detaile: "รองรับเกมความละเอียดสูง และ Game AI Cloud Sync",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 14,
      name: "Nintendo Switch Neo",
      price: 599,
      detaile: "Hybrid Console จอใหญ่ขึ้น เล่นได้ทั้งทีวีและพกพา",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 15,
      name: "Meta Quest Air",
      price: 1299,
      detaile: "VR แบบไร้สาย พร้อมระบบสัมผัสเสมือนจริง 4D",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 16,
      name: "Sony Cinema Alpha",
      price: 3499,
      detaile: "กล้องโปร 8K + AI Focus + ระบบกันสั่น 9 แกน",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 17,
      name: "DJI Drone X9",
      price: 1799,
      detaile: "โดรน AI Tracking ถ่ายได้ 8K พร้อมกันสั่นขั้นเทพ",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 18,
      name: "GoPro Hero MAXX",
      price: 699,
      detaile: "กล้องแอคชัน SuperWide + AI Color Boost",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 19,
      name: "Logitech MX Pro",
      price: 199,
      detaile: "เมาส์โปรทำงาน+เกม เซ็นเซอร์ AI Precision",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 20,
      name: "Razer BlackWidow Neo",
      price: 249,
      detaile: "คีย์บอร์ดไฟ RGB พร้อม AI Typing Stabilizer",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 21,
      name: "Alienware XRTX Display",
      price: 1599,
      detaile: "จอ 49 นิ้ว OLED 240Hz พร้อม G-SYNC Ultimate",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 22,
      name: "LG UltraBright OLED",
      price: 1899,
      detaile: "จอ HDR Extreme 4000 nit เหมาะงานครีเอเตอร์",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 23,
      name: "MSI Titan GPU Dock",
      price: 999,
      detaile: "GPU External Dock รองรับ RTX-5090",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 24,
      name: "Samsung Smart Monitor Mini",
      price: 399,
      detaile: "Smart Monitor 27 นิ้ว รองรับ Streaming + SmartOS",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 25,
      name: "Smart Keyboard Air",
      price: 199,
      detaile: "คีย์บอร์ดไร้สายบางเฉียบ Ultra-Thin",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 26,
      name: "Magic Trackpad Max",
      price: 249,
      detaile: "Trackpad Multi-Touch ขนาดใหญ่ขึ้น 35%",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 27,
      name: "Apple AirTag Pro",
      price: 149,
      detaile: "ติดตามที่แม่นยำขึ้น + แบตใช้ได้ 2 ปี",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 28,
      name: "Belkin Fast Charger 80W",
      price: 89,
      detaile: "ชาร์จไวคู่ รองรับ 2 พอร์ต ทั้ง USB-C และ USB-A",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 29,
      name: "Anker PowerBank Titan",
      price: 199,
      detaile: "PowerBank 40,000mAh พร้อมชาร์จเร็ว 180W",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
    {
      id: 30,
      name: "ROG Gaming Headset X",
      price: 349,
      detaile: "หูฟังเกม 7.1 Surround + AI mic ตัดเสียงรบกวน",
      urlImage: "/images/iphone-card-40-17pro.png"
    },
  ]
  const [apiProducts, setapiProducts] = useState([])

  const getDataProducts = async() => {
    try{
      const res = await axios.get("http://localhost:8000/products")
      console.log(res.data.data)
      setapiProducts(res.data.data)
    }catch(error){
      console.log(error)
    }
  } 
  useEffect(() => {
    getDataProducts()
  }, [])
  return (
    <>
      <div className=" flex flex-col justify-center items-center my-4">
        <div className="flex flex-col justify-center items-center">
          <div className="w-[280px] md:w-[480px] h-[38px] bg-[#F3F4F6] rounded-[8px] relative">
            <input className=" absolute w-full h-full pl-10 focus:" type="text" />
            <Image className="absolute top-2 left-2 invert" src={"/icons/icons8-search-60.svg"} width={25} height={25} alt="icon" />
          </div>
          <div className="w-[280px] md:w-[480px] h-[38px] flex gap-2 mt-2">
            <select className="w-[50%] h-[38px] bg-[#F3F4F6] rounded-[8px]">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            <select className="w-[50%] h-[38px] bg-[#F3F4F6] rounded-[8px]">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-12 bg-amber-400">
          <div className="w-full md:w-fit grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 mx-2 md:mx-0">
            {
              apiProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="w-full h-[300px] md:w-[230px] md:h-[300px] shadow-2xl rounded-xl bg-white cursor-pointer border border-gray-300 group ">
                  <div className=" relative bg-[#F3F4F6] h-36 w-full flex justify-center items-center rounded-t-xl group-hover:bg-gray-200 duration-300 ease-in">
                    <Image className="object-contain" src={"/images/iphone-card-40-17pro.png"} fill alt="image product" />
                  </div>
                  <div className="p-3 flex flex-col gap-1 text-[#111827]">
                    <span className="font-bold line-clamp-1">{p.p_name}</span>
                    <p className=" font-light text-gray-500 w-full h-full line-clamp-2 md:line-clamp-3">{p.p_details}</p>
                    <div className="font-bold text-2xl text-end text-[#1E3A8A]">{p.p_price}฿</div>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}