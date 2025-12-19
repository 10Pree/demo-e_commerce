import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <div className="w-full h-screen">
            <div className="flex justify-start items-start gap-2 ml-2 mt-2 md:ml-48 md:mt-12 mb-4">
                <Link href={"/"} className="bg-[#1E3A8A] w-[25px] h-[25px] rounded-[8px] flex justify-center items-center">
                    <Image src={"/icons/icons8-back-w-52.png"} width={19} height={19} alt="icon" />
                </Link>
                <span className=" font-bold text-[#111827]">กลับ</span>
            </div>
            <div className="h-[559px] flex justify-center items-center gap-12">
                <div className="flex flex-col gap-4">
                    <div className="w-[559px] h-[234px] bg-white shadow-[0px_7px_8px_2px_rgba(0,_0,_0,_0.1)] border border-gray-300 rounded-2xl flex flex-col items-center gap-2 p-4">
                        <div className="w-full flex justify-end">
                            <Image src={"/icons/icons8-plus-96.png"} width={19} height={19} alt="icon" />
                        </div>
                        <div className="w-full flex justify-start">
                            <h1 className="font-bold">ตัวเลือกการจัดส่ง</h1>
                        </div>
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center px-2 rounded-[8px]">
                            <h3 className=" group-hover:text-white font-bold">ที่อยู่ที่ 1</h3>
                            <Image src={"/icons/icons8-delete-90.svg"} width={19} height={19} alt="icon" />
                        </div>
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center px-2 rounded-[8px]">
                            <h3 className=" group-hover:text-white font-bold">ที่อยู่ที่ 1</h3>
                            <Image src={"/icons/icons8-delete-90.svg"} width={19} height={19} alt="icon" />
                        </div>
                    </div>
                    <div className="w-[559px] h-[234px] bg-white shadow-[0px_7px_8px_2px_rgba(0,_0,_0,_0.1)] border border-gray-300 rounded-2xl flex flex-col items-center gap-2 p-4">
                        <div className="w-full flex justify-end">
                            <Image src={"/icons/icons8-plus-96.png"} width={19} height={19} alt="icon" />
                        </div>
                        <div className="w-full flex justify-start">
                            <h1 className="font-bold">ช่องทางการชำละเงิน</h1>
                        </div>
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)] flex justify-between items-center px-2 rounded-[8px]">
                            <h3 className=" group-hover:text-white font-bold">QR</h3>
                            <Image src={"/icons/icons8-delete-90.svg"} width={19} height={19} alt="icon" />
                        </div>
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)] flex justify-between items-center px-2 rounded-[8px]">
                            <h3 className=" group-hover:text-white font-bold">ปลายทาง</h3>
                            <Image src={"/icons/icons8-delete-90.svg"} width={19} height={19} alt="icon" />
                        </div>
                    </div>
                </div>
                <div className="w-[559px] h-[484px] bg-white shadow-[0px_7px_8px_2px_rgba(0,_0,_0,_0.1)] border border-gray-300 rounded-2xl overflow-hidden p-4">
                    <div className="flex items-start mb-4">
                        <h3 className="font-bold">สินค้า</h3>
                    </div>
                    <div className=" h-[90%] flex flex-col items-center gap-4 overflow-y-scroll py-2">
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                            <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                            <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                            <h3 className=" group-hover:text-white font-bold">1 X</h3>
                        </div>
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                            <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                            <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                            <h3 className=" group-hover:text-white font-bold">2 X</h3>
                        </div>
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                            <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                            <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                            <h3 className=" group-hover:text-white font-bold">3 X</h3>
                        </div>
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                            <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                            <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                            <h3 className=" group-hover:text-white font-bold">4 X</h3>
                        </div>
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                            <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                            <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                            <h3 className=" group-hover:text-white font-bold">5 X</h3>
                        </div>
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                            <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                            <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                            <h3 className=" group-hover:text-white font-bold">6 X</h3>
                        </div>
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                            <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                            <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                            <h3 className=" group-hover:text-white font-bold">7 X</h3>
                        </div>
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                            <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                            <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                            <h3 className=" group-hover:text-white font-bold">8 X</h3>
                        </div>
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                            <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                            <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                            <h3 className=" group-hover:text-white font-bold">9 X</h3>
                        </div>
                                                <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                            <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                            <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                            <h3 className=" group-hover:text-white font-bold">10 X</h3>
                        </div>
                                                <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                            <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                            <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                            <h3 className=" group-hover:text-white font-bold">11 X</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}