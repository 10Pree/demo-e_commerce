import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <main className="w-full h-full mb-20 ">
            <div className="flex justify-start items-start gap-2 ml-2 mt-2 md:ml-48 md:mt-12 mb-4">
                <Link href={"/"} className="bg-[#1E3A8A] w-[25px] h-[25px] rounded-[8px] flex justify-center items-center">
                    <Image src={"/icons/icons8-back-w-52.png"} width={19} height={19} alt="icon" />
                </Link>
                <span className=" font-bold text-[#111827]">กลับ</span>
            </div>
            <div className=" flex justify-center items-center">
                <div className="w-[323px] h-[480px] md:w-[646px] md:h-[720px] flex flex-col justify-center items-center bg-white shadow-xl/20 rounded-2xl border border-gray-400">
                    <div className="w-[80px] h-[80px] md:w-[111px] md:h-[111px] bg-[#1E3A8A] flex justify-center items-center rounded-full mt-[-64px]">
                        <Image src={"/icons/icons8-customer-96.png"} width={96} height={96} alt="icon" />
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <div>
                            <span className="text-[16px] md:text-[20px font-bold mb-4 text-[#111827]">ข้อมมูลส่วนตัว</span>
                            <div className="bg-white shadow-xl border border-gray-400 rounded-[12px] w-[280px] h-[90px] md:w-[500px] md:h-[117px] text-[#929292] pl-4 pt-1">
                                <span className="flex justify-end"><Link href={"/"} className="text-[#FACC15] text-[12px] md:text-[16px] mr-4">แก้ไข</Link></span>
                                <p className="text-[12px] md:text-[16px] w-full line-clamp-2 ">ชื่อ:................................................................................</p>
                                <p className="text-[12px] md:text-[16px] w-full line-clamp-2 ">ชื่อ:................................................................................</p>
                                <p className="text-[12px] md:text-[16px] w-full line-clamp-2 ">ชื่อ:................................................................................</p>
                            </div>
                        </div>
                        <div>
                            <span className="text-[16px] md:text-[20px] font-bold text-[#111827]">ที่อยู่</span>
                            <div className="bg-white shadow-xl border border-gray-400 rounded-[12px] w-[280px] h-[90px] md:w-[500px] md:h-[117px] text-[#929292] pl-4 pt-1">
                                <span className="flex justify-end"><Link href={"/"} className="text-[#FACC15] text-[12px] md:text-[16px] mr-4">แก้ไข</Link></span>
                                <p className="text-[12px] md:text-[16px] w-full line-clamp-2 ">ชื่อ:................................................................................</p>
                                <p className="text-[12px] md:text-[16px] w-full line-clamp-2 ">ชื่อ:................................................................................</p>
                                <p className="text-[12px] md:text-[16px] w-full line-clamp-2 ">ชื่อ:................................................................................</p>
                            </div>
                        </div>
                        <div className="w-[250px] md:w-[500px] flex justify-start">
                            <Link href={"/"} className="bg-white shadow-xl border border-gray-400 rounded-[12px] w-[233px] h-[35px] md:h-[53px] text-[15px] md:text-[20px] font-bold flex justify-center items-center text-[#111827]">
                                ดูประวัติคำสั่งซื้อของฉัน
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}