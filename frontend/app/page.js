
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
    <div className=" w-full min-h-screen">
      <Header />
      <section>
        <SwiperContainer />
      </section>
      <section className="w-full h-full">
        <div className="flex my-8 mx-0 md:mx-32 justify-center md:justify-start">
          <h1 className="text-2xl text-[#111827] font-bold">สินค้ายอดนิยม</h1>
          <Image width="40" height="40" src={"/icons/icons8-trending-96-c111827.png"} alt="icon"/>
        </div>
        <div className=" flex justify-center items-center">
          <div className=" grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-12 mx-2 md:mx-0">
            {
              productData.map((p) => (
                <div key={p.id} className="w-full h-[300px] md:w-[230px] md:h-[300px] shadow-2xl rounded-xl bg-white cursor-pointer border border-gray-300 group ">
                  <div className="bg-[#F3F4F6] h-36 w-full flex justify-center items-center rounded-t-xl group-hover:bg-gray-200 transition-colors">
                    <Image className="w-[50%]" src={p.urlImage} width={50} height={50} alt="image product" />
                  </div>
                  <div className="p-3 flex flex-col gap-1 text-[#111827]">
                    <span className="font-bold line-clamp-1">{p.name}</span>

                      <p className=" font-light text-gray-500 w-full h-full line-clamp-2 md:line-clamp-3">{p.detaile}</p>
        
                    <div className="font-bold text-2xl text-end text-[#1E3A8A]">{p.price}$</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
}
