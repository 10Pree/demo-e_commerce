
import Header from "@/components/header";
import SwiperContainer from "@/components/Swiper";
import Image from 'next/image'

export default function Page() {
  return (
    <div className=" w-screen h-screen">
      <Header />
      <div className="p-8">
        <SwiperContainer />
      </div>
      <div className="w-full h-full ">
        <h1 className="text-2xl font-bold">สินค้ายอดนิยม</h1>
        <div className=" flex justify-center items-center">
          <div className=" grid grid-cols-3 gap-5">
            <div className="w-56 h-72 shadow-2xl rounded-2xl bg-white">
              <div className="bg-[#F3F4F6] h-36 w-full flex justify-center items-center">
                <Image className="w-[50%]" src={'/images/iphone-card-40-17pro.png'} width={50} height={50} alt="image product" />
              </div>
              <div className="p-3 flex flex-col gap-1 text-[#111827]">
                <span className=" font-bold">IPHONE 17 Pro</span>
                <div className="w-full overflow-hidden">
                  <p className=" font-light w-full h-16 overflow-y-scroll">ชิป A19 Pro พร้อม GPU แบบ 6-core ระบายความร้อนด้วยไอระเหย เพื่อความเร็วสุดขั้ว</p>
                </div>
                <div className="font-bold text-2xl text-end">199$</div>
              </div>
            </div>
            <div className="w-56 h-72 shadow-2xl rounded-2xl bg-white">
              <div className="bg-[#F3F4F6] h-36 w-full flex justify-center items-center">
                <Image className="w-[50%]" src={'/images/iphone-card-40-17pro.png'} width={50} height={50} alt="image product" />
              </div>
              <div className="p-3 flex flex-col gap-1 text-[#111827]">
                <span className=" font-bold">IPHONE 17 Pro</span>
                <div className="w-full overflow-hidden">
                  <p className=" font-light w-full h-16 overflow-y-scroll">ชิป A19 Pro พร้อม GPU แบบ 6-core ระบายความร้อนด้วยไอระเหย เพื่อความเร็วสุดขั้ว</p>
                </div>
                <div className="font-bold text-2xl text-end">199$</div>
              </div>
            </div>
            <div className="w-56 h-72 shadow-2xl rounded-2xl bg-white">
              <div className="bg-[#F3F4F6] h-36 w-full flex justify-center items-center">
                <Image className="w-[50%]" src={'/images/iphone-card-40-17pro.png'} width={50} height={50} alt="image product" />
              </div>
              <div className="p-3 flex flex-col gap-1 text-[#111827]">
                <span className=" font-bold">IPHONE 17 Pro</span>
                <div className="w-full overflow-hidden">
                  <p className=" font-light w-full h-16 overflow-y-scroll">ชิป A19 Pro พร้อม GPU แบบ 6-core ระบายความร้อนด้วยไอระเหย เพื่อความเร็วสุดขั้ว</p>
                </div>
                <div className="font-bold text-2xl text-end">199$</div>
              </div>
            </div>
            <div className="w-56 h-72 shadow-2xl rounded-2xl bg-white">
              <div className="bg-[#F3F4F6] h-36 w-full flex justify-center items-center">
                <Image className="w-[50%]" src={'/images/iphone-card-40-17pro.png'} width={50} height={50} alt="image product" />
              </div>
              <div className="p-3 flex flex-col gap-1 text-[#111827]">
                <span className=" font-bold">IPHONE 17 Pro</span>
                <div className="w-full overflow-hidden">
                  <p className=" font-light w-full h-16 overflow-y-scroll">ชิป A19 Pro พร้อม GPU แบบ 6-core ระบายความร้อนด้วยไอระเหย เพื่อความเร็วสุดขั้ว</p>
                </div>
                <div className="font-bold text-2xl text-end">199$</div>
              </div>
            </div>
            <div className="w-56 h-72 shadow-2xl rounded-2xl bg-white">
              <div className="bg-[#F3F4F6] h-36 w-full flex justify-center items-center">
                <Image className="w-[50%]" src={'/images/iphone-card-40-17pro.png'} width={50} height={50} alt="image product" />
              </div>
              <div className="p-3 flex flex-col gap-1 text-[#111827]">
                <span className=" font-bold">IPHONE 17 Pro</span>
                <div className="w-full overflow-hidden">
                  <p className=" font-light w-full h-16 overflow-y-scroll">ชิป A19 Pro พร้อม GPU แบบ 6-core ระบายความร้อนด้วยไอระเหย เพื่อความเร็วสุดขั้ว</p>
                </div>
                <div className="font-bold text-2xl text-end">199$</div>
              </div>
            </div>
            <div className="w-56 h-72 shadow-2xl rounded-2xl bg-white">
              <div className="bg-[#F3F4F6] h-36 w-full flex justify-center items-center">
                <Image className="w-[50%]" src={'/images/iphone-card-40-17pro.png'} width={50} height={50} alt="image product" />
              </div>
              <div className="p-3 flex flex-col gap-1 text-[#111827]">
                <span className=" font-bold">IPHONE 17 Pro</span>
                <div className="w-full overflow-hidden">
                  <p className=" font-light w-full h-16 overflow-y-scroll">ชิป A19 Pro พร้อม GPU แบบ 6-core ระบายความร้อนด้วยไอระเหย เพื่อความเร็วสุดขั้ว</p>
                </div>
                <div className="font-bold text-2xl text-end">199$</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
