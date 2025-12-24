import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <div className="w-full h-[1200px] md:h-screen">
            <div className="flex flex-col gap-4">
                <div className="flex justify-start items-start gap-2 ml-2 mt-2 md:ml-48 md:mt-12 mb-4">
                    <Link href={"/"} className="bg-[#1E3A8A] w-[25px] h-[25px] rounded-[8px] flex justify-center items-center">
                        <Image src={"/icons/icons8-back-w-52.png"} width={19} height={19} alt="icon" />
                    </Link>
                    <span className=" font-bold text-[#111827]">กลับ</span>
                </div>
                <div className="h-[559px] w-full flex flex-col md:flex-row justify-normal md:justify-center items-center gap-12 p-2 md:0 shrink-0">
                    <div className="w-full md:w-[559px] flex flex-col gap-4 shrink-0">
                        <div className="w-full h-[234px] bg-white shadow-[0px_7px_8px_2px_rgba(0,_0,_0,_0.1)] border border-gray-300 rounded-2xl flex flex-col items-center gap-2 p-4">
                            <div className="w-full flex justify-end">
                                <Image src={"/icons/icons8-plus-96.png"} width={19} height={19} alt="icon" />
                            </div>
                            <div className="w-full flex justify-start">
                                <h1 className="font-bold">ตัวเลือกการจัดส่ง</h1>
                            </div>
                            <div className=" group w-full h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center px-2 rounded-[8px]">
                                <h3 className=" group-hover:text-white font-bold">ที่อยู่ที่ 1</h3>
                                <Image src={"/icons/icons8-delete-90.svg"} width={19} height={19} alt="icon" />
                            </div>
                            <div className=" group w-full h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center px-2 rounded-[8px]">
                                <h3 className=" group-hover:text-white font-bold">ที่อยู่ที่ 1</h3>
                                <Image src={"/icons/icons8-delete-90.svg"} width={19} height={19} alt="icon" />
                            </div>
                        </div>
                        <div className="w-full h-[234px] bg-white shadow-[0px_7px_8px_2px_rgba(0,_0,_0,_0.1)] border border-gray-300 rounded-2xl flex flex-col items-center gap-2 p-4">
                            <div className="w-full flex justify-end">
                                <Image src={"/icons/icons8-plus-96.png"} width={19} height={19} alt="icon" />
                            </div>
                            <div className="w-full flex justify-start">
                                <h1 className="font-bold">ช่องทางการชำละเงิน</h1>
                            </div>
                            <div className=" group w-full h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)] flex justify-between items-center px-2 rounded-[8px]">
                                <h3 className=" group-hover:text-white font-bold">QR</h3>
                                <Image src={"/icons/icons8-delete-90.svg"} width={19} height={19} alt="icon" />
                            </div>
                            <div className=" group w-full h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)] flex justify-between items-center px-2 rounded-[8px]">
                                <h3 className=" group-hover:text-white font-bold">ปลายทาง</h3>
                                <Image src={"/icons/icons8-delete-90.svg"} width={19} height={19} alt="icon" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[559px] h-[484px] bg-white shadow-[0px_7px_8px_2px_rgba(0,_0,_0,_0.1)] border border-gray-300 rounded-2xl overflow-hidden p-4 flex flex-col gap-4 shrink-0">
                        <div className="flex items-start">
                            <h3 className="font-bold">สินค้า</h3>
                        </div>
                        <div className="w-full h-[80%] flex flex-col items-center gap-4 overflow-y-scroll p-2">
                            <div className=" group w-full h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                                <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                                <h3 className=" group-hover:text-white font-bold">1 X</h3>
                            </div>
                            <div className=" group w-full h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                                <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                                <h3 className=" group-hover:text-white font-bold">1 X</h3>
                            </div>
                            <div className=" group w-full h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                                <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                                <h3 className=" group-hover:text-white font-bold">1 X</h3>
                            </div>
                            <div className=" group w-full h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                                <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                                <h3 className=" group-hover:text-white font-bold">1 X</h3>
                            </div>
                            <div className=" group w-full h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                                <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                                <h3 className=" group-hover:text-white font-bold">1 X</h3>
                            </div>
                            <div className=" group w-full h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                                <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                                <h3 className=" group-hover:text-white font-bold">1 X</h3>
                            </div>
                            <div className=" group w-full h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                                <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                                <h3 className=" group-hover:text-white font-bold">1 X</h3>
                            </div>
                            <div className=" group w-full h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                                <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                                <h3 className=" group-hover:text-white font-bold">1 X</h3>
                            </div>
                            <div className=" group w-full h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                                <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                                <h3 className=" group-hover:text-white font-bold">1 X</h3>
                            </div>
                            <div className=" group w-full h-[55px] bg-white hover:bg-[#1E3A8A] shadow-[0px_1px_0px_2px_rgba(0,_0,_0,_0.1)]  border-gray-300 flex justify-between items-center shrink-0 px-2 rounded-[8px]">
                                <Image src={"/images/iphone-card-40-17pro.png"} width={40} height={40} alt="icon" />
                                <span className=" group-hover:text-white font-bold">26,900  บาท</span>
                                <h3 className=" group-hover:text-white font-bold">1 X</h3>
                            </div>
                        </div>
                        <div className="flex justify-end items-center gap-4">
                            <span className=" font-bold">รวมทั้งหมด</span>
                            <span className=" font-bold text-white rounded-[8px] p-2 bg-[#111827]">120,000</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full mb-4 hidden justify-center md:justify-end md:flex">
                <button className="px-8 py-2 bg-[#F97316] rounded-[8px] font-bold text-[#111827] hover:bg-[#1E3A8A] hover:text-white md:mr-96 shadow-[0px_7px_8px_2px_rgba(0,_0,_0,_0.1)]">
                    ชำระ
                </button>
            </div>
            <div className="w-full h-[70px] flex justify-between items-center md:justify-end bg-[#1E3A8A] fixed bottom-0 px-2  md:hidden">
                <div className="flex justify-end items-center gap-4">
                    <span className=" font-bold text-white">รวมทั้งหมด</span>
                    <span className=" font-bold text-[#111827] rounded-[8px] p-2 bg-white">120,000</span>
                </div>
                <button className="px-8 py-2 bg-[#F97316] rounded-[8px] font-bold text-[#111827] hover:bg-[#1E3A8A] hover:text-white md:mr-96">
                    ชำระ
                </button>
            </div>

            {/* popup add address */}
            <div className="w-screen h-screen bg-black/50 fixed inset-0 flex justify-center items-center">
                <div className="w-[1045px] h-[614px] bg-[#D9D9D9] p-4 rounded-2xl">
                    <h3 className=" font-bold">ที่อยู่ในการจัดส่ง</h3>
                    <from className="flex justify-center items-center">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col">
                                <label className=" font-bold">
                                    ชื่อ  นามสกุล
                                </label>
                                <input className="w-[352px] h-[45px] bg-white rounded-[8px] p-2" name="username" />
                            </div>
                            <div className="flex flex-col">
                                <label className=" font-bold">
                                    หมายเลขโทรศัพท์
                                </label>
                                <input className="w-[352px] h-[45px] bg-white rounded-[8px] p-2" name="phone" />
                            </div>
                            <div className="flex flex-col">
                                <label className=" font-bold">
                                    บ้านเลขที่ / ซอย / หมู่ / ถนน
                                </label>
                                <input className="w-[352px] h-[45px] bg-white rounded-[8px] p-2" name="address" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col">
                                <label className=" font-bold">
                                    จังหวัด
                                </label>
                                <input className="w-[352px] h-[45px] bg-white rounded-[8px] p-2" name="county" />
                            </div>
                            <div className="flex flex-col">
                                <label className=" font-bold">
                                    อำเภอ
                                </label>
                                <input className="w-[352px] h-[45px] bg-white rounded-[8px] p-2" name="canton1" />
                            </div>
                            <div className="flex flex-col">
                                <label className=" font-bold">
                                    ตำบล
                                </label>
                                <input className="w-[352px] h-[45px] bg-white rounded-[8px] p-2" name="canton2" />
                            </div>
                                                        <div className="flex flex-col">
                                <label className=" font-bold">
                                    รหัสไปรษณีย์น
                                </label>
                                <input className="w-[352px] h-[45px] bg-white rounded-[8px] p-2" name="post" />
                            </div>
                        </div>
                    </from>
                </div>
            </div>
        </div>
    )
}