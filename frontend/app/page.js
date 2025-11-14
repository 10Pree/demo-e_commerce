
import Header from "@/components/header";
import SwiperContainer from "@/components/Swiper";
import Image from 'next/image'

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
    }
  ];

  return (
    <div className=" w-full min-h-screen bg-[#F3F4F6]">
      <Header />
      <section className=" my-8">
        <SwiperContainer />
      </section>
      <section className=" my-8">
        <div className="flex my-8 mx-0 md:mx-32 justify-center md:justify-start">
          <h1 className="text-2xl text-[#111827] font-bold">สินค้ายอดนิยม</h1>
          <Image width="40" height="40" src={"/icons/icons8-trending-96-c111827.png"} alt="icon" />
        </div>
        <div className=" flex justify-center items-center">
          <div className=" grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-12 mx-2 md:mx-0">
            {
              productData.map((p) => (
                <div key={p.id} className="w-full h-[300px] md:w-[230px] md:h-[300px] shadow-2xl rounded-xl bg-white cursor-pointer border border-gray-300 group ">
                  <div className=" relative bg-[#F3F4F6] h-36 w-full flex justify-center items-center rounded-t-xl group-hover:bg-gray-200 transition-colors">
                    <Image className="object-contain" src={p.urlImage} fill alt="image product" />
                  </div>
                  <div className="p-3 flex flex-col gap-1 text-[#111827]">
                    <span className="font-bold line-clamp-1">{p.name}</span>
                    <p className=" font-light text-gray-500 w-full h-full line-clamp-2 md:line-clamp-3">{p.detaile}</p>
                    <div className="font-bold text-2xl text-end text-[#1E3A8A]">{p.price}฿</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
      <section className="w-full py-6 px-4 bg-[#1E3A8A] my-8 flex justify-start items-center md:justify-center gap-8 overflow-x-auto">
        <div className="min-w-[243px] h-[265px] bg-[#FACC15] rounded-2xl flex flex-col justify-center items-center gap-2 mr-16">
          <div className="relative w-[166px] h-[133px] bg-[#D9D9D9]">
            <Image className="object-contain" src={"/images/a.png"} fill alt="image" />
          </div>
          <div className="flex flex-col leading-1.5">
            <span className="text-2xl font-bold text-[#F97316]">99฿</span>
            <span className="text-end text-white line-through">199฿</span>
          </div>
          <button className="w-[100px] h-[30px] bg-[#F97316] text-white rounded-[8px] cursor-pointer mt-2">ซื้อ</button>
        </div>
        <div className="min-w-[230px] h-[300px] md:w-[230px] md:h-[300px] shadow-2xl rounded-xl bg-white cursor-pointer border border-gray-300 group  ">
          <div className=" relative bg-[#F3F4F6] h-36 w-full flex justify-center items-center rounded-t-xl group-hover:bg-gray-200 transition-colors">
            <Image className="object-contain" src={"/images/iphone-card-40-17pro.png"} fill alt="image product" />
          </div>
          <div className="p-3 flex flex-col gap-1 text-[#111827]">
            <span className="font-bold line-clamp-1">IPHONE 17 Pro</span>
            <p className=" font-light text-gray-500 w-full h-full line-clamp-2 md:line-clamp-3">ชิป A19 Pro พร้อม GPU แบบ 6-core ระบายความร้อนด้วยไอระเหย เพื่อความเร็วสุดขั้ว</p>
            <div className="font-bold text-2xl text-end text-[#1E3A8A]">1999฿</div>
          </div>
        </div>
        <div className="min-w-[230px] h-[300px] md:w-[230px] md:h-[300px] shadow-2xl rounded-xl bg-white cursor-pointer border border-gray-300 group ">
          <div className=" relative bg-[#F3F4F6] h-36 w-full flex justify-center items-center rounded-t-xl group-hover:bg-gray-200 transition-colors">
            <Image className="object-contain" src={"/images/iphone-card-40-17pro.png"} fill alt="image product" />
          </div>
          <div className="p-3 flex flex-col gap-1 text-[#111827]">
            <span className="font-bold line-clamp-1">IPHONE 17 Pro</span>
            <p className=" font-light text-gray-500 w-full h-full line-clamp-2 md:line-clamp-3">ชิป A19 Pro พร้อม GPU แบบ 6-core ระบายความร้อนด้วยไอระเหย เพื่อความเร็วสุดขั้ว</p>
            <div className="font-bold text-2xl text-end text-[#1E3A8A]">1999฿</div>
          </div>
        </div>
        <div className="min-w-[230px] h-[300px] md:w-[230px] md:h-[300px] shadow-2xl rounded-xl bg-white cursor-pointer border border-gray-300 group ">
          <div className=" relative bg-[#F3F4F6] h-36 w-full flex justify-center items-center rounded-t-xl group-hover:bg-gray-200 transition-colors">
            <Image className="object-contain" src={"/images/iphone-card-40-17pro.png"} fill alt="image product" />
          </div>
          <div className="p-3 flex flex-col gap-1 text-[#111827]">
            <span className="font-bold line-clamp-1">IPHONE 17 Pro</span>
            <p className=" font-light text-gray-500 w-full h-full line-clamp-2 md:line-clamp-3">ชิป A19 Pro พร้อม GPU แบบ 6-core ระบายความร้อนด้วยไอระเหย เพื่อความเร็วสุดขั้ว</p>
            <div className="font-bold text-2xl text-end text-[#1E3A8A]">1999฿</div>
          </div>
        </div>
        <div className="min-w-[230px] h-[300px] md:w-[230px] md:h-[300px] shadow-2xl rounded-xl bg-white cursor-pointer border border-gray-300 group ">
          <div className=" relative bg-[#F3F4F6] h-36 w-full flex justify-center items-center rounded-t-xl group-hover:bg-gray-200 transition-colors">
            <Image className="object-contain" src={"/images/iphone-card-40-17pro.png"} fill alt="image product" />
          </div>
          <div className="p-3 flex flex-col gap-1 text-[#111827]">
            <span className="font-bold line-clamp-1">IPHONE 17 Pro</span>
            <p className=" font-light text-gray-500 w-full h-full line-clamp-2 md:line-clamp-3">ชิป A19 Pro พร้อม GPU แบบ 6-core ระบายความร้อนด้วยไอระเหย เพื่อความเร็วสุดขั้ว</p>
            <div className="font-bold text-2xl text-end text-[#1E3A8A]">1999฿</div>
          </div>
        </div>
      </section>
      <section className="h-[500px] flex flex-col justify-center items-center gap-8 md:flex-row">
        <div className="  flex flex-col justify-center items-center bg-[#F3F4F6] w-[450px] h-[260px] shadow-lg border border-gray-300 rounded-[8px]">
          <Image className="mt-8" src={"/images/apple_logo.png"} width={200} height={200} alt="image" />
          <Image className=" mt-10" src={"/images/b2a01456b47f9c24a30087980101be2c.png"} width={350} height={150} alt="image" />
        </div>
        <div className="  flex flex-col justify-center items-center bg-[#F3F4F6] w-[450px] h-[260px] shadow-lg border border-gray-300 rounded-[8px]">
          <Image className="mt-18" src={"/images/sony_logo.png"} width={180} height={200} alt="image" />
          <Image className=" mt-18" src={"/images/sony_bg.png"} width={350} height={150} alt="image" />
        </div>
        <div className="  flex flex-col justify-center items-center bg-[#F3F4F6] w-[450px] h-[260px] shadow-lg border border-gray-300 rounded-[8px]">
          <Image className="mt-8" src={"/images/Samsung.png"} width={200} height={200} alt="image" />
          <Image className=" mt-4" src={"/images/samsung_bg.png"} width={350} height={150} alt="image" />
        </div>
      </section>
      <footer className="h-[500px] bg-[#1E3A8A]">

      </footer>
    </div>
  );
}
