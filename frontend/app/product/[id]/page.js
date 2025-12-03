import Image from "next/image"

export default function Page({ params }) {

    return (
        <div className="w-full min-h-screen">
            <div className="flex flex-col gap-24 justify-center items-center my-4 md:my-24 px-4">
                <div className="flex flex-col md:flex-row gap-9 px-8">
                    <div>
                        <Image src={"/images/iphone-card-40-17pro.png"} width={500} height={600} alt="image product" />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-bold">IPHONE 17 Pro</h1>
                        <div className="flex gap-2">
                            <span className="text-3xl font-bold">1999</span>
                            <span className=" text-gray-400 line-through  mt-4">999</span>
                        </div>
                        <span className="text-[1rem] font-bold">ความจุ</span>
                        <div className="flex flex-wrap gap-4">
                            <label className="cursor-pointer flex">
                                <input className="hidden peer" type="radio" value={256} name="valence" />
                                <span className="w-[90px] h-[30px] text-[20px] bg-[#F3F4F6]  rounded-[8px] font-bold text-center text-[#111827] peer-checked:bg-[#1E3A8A] peer-checked:text-white">256GB</span>
                            </label>

                            <label className="cursor-pointer flex">
                                <input className="hidden peer" type="radio" value={512} name="valence" />
                                <span className="w-[90px] h-[30px] text-[20px] bg-[#F3F4F6]  rounded-[8px] font-bold text-center text-[#111827] peer-checked:bg-[#1E3A8A] peer-checked:text-white">512GB</span>
                            </label>
                        </div>
                        <span className="text-[1rem] font-bold">สี</span>
                        <div className="flex flex-wrap gap-4">

                            <label className="w-[100px] h-[30px] flex cursor-pointer">
                                <input className=" hidden peer" type="radio" name="color" />
                                <span className="w-[100px] h-[30px] bg-[#F3F4F6] rounded-[8px] text-[20px] font-bold text-center peer-checked:bg-[#1E3A8A] peer-checked:text-white">Black</span>
                            </label>


                            <label className="w-[100px] h-[30px] flex cursor-pointer">
                                <input className=" hidden peer" type="radio" name="color" />
                                <span className="w-[100px] h-[30px] bg-[#F3F4F6] rounded-[8px] text-[20px] font-bold text-center peer-checked:bg-[#1E3A8A] peer-checked:text-white">White</span>
                            </label>


                            <label className="w-[100px] h-[30px] flex cursor-pointer">
                                <input className=" hidden peer" type="radio" name="color" />
                                <span className="w-[100px] h-[30px] bg-[#F3F4F6] rounded-[8px] text-[20px] font-bold text-center peer-checked:bg-[#1E3A8A] peer-checked:text-white">Mist Blue</span>
                            </label>


                            <label className="w-[100px] h-[30px] flex cursor-pointer">
                                <input className=" hidden peer" type="radio" name="color" />
                                <span className="w-[100px] h-[30px] bg-[#F3F4F6] rounded-[8px] text-[20px] font-bold text-center peer-checked:bg-[#1E3A8A] peer-checked:text-white">Lavender</span>
                            </label>

                            <label className="w-[100px] h-[30px] flex cursor-pointer">
                                <input className=" hidden peer" type="radio" name="color" />
                                <span className="w-[100px] h-[30px] bg-[#F3F4F6] rounded-[8px] text-[20px] font-bold text-center peer-checked:bg-[#1E3A8A] peer-checked:text-white">Sage</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="w-full mr-0 flex justify-center gap-4 md:mr-96 md:justify-end">
                    <button className="w-48 h-14 bg-[#F3F4F6] border border-[#111827] rounded-[8px] font-bold hover:bg-[#1E3A8A] hover:text-white duration-150 ease-in">เพิ่มไปยังรถเข็น</button>
                    <button className="w-48 h-14 bg-[#1E3A8A] rounded-[8px] text-white font-bold ">ซื้อ</button>
                </div>
                <div className="flex flex-col justify-between w-full md:w-1/2 md:flex-row p-8 md:p-0 gap-8 md:gap-0">
                    <h2 className="font-bold">รายละเอียด</h2>
                    <p className="w-full md:w-1/2 flex flex-wrap">iPhone 17 ประทับใจยิ่งกว่า ทนทานยิ่งขึ้น ด้วยจอภาพ ProMotion ขนาด 6.3 นิ้ว Ceramic Shield กล้องหลัง 48MP ทั้งหมด กล้องหน้า Center Stage ชิป A19 และอีกมากมาย iPhone 17 มาใน 5 สีสันสุดสวยและด้านหน้าแบบ Ceramic Shield 2 ที่ทนการขีดข่วนได้ดีขึ้น 3 เท่า
                        จอภาพขนาด 6.3 นิ้ว
                        กล้องหน้า 18MP Center Stage
                        กล้องหลังระบบคู่ Fusion 48MP
                        รองรับ Wi-Fi 7, 5G และ Bluetooth 6 </p>
                </div>
            </div>
        </div>
    )
}