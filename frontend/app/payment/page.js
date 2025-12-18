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
            <div className="h-[559px] bg-amber-300">
                <div className="flex flex-col gap-4">
                    <div className="w-[559px] h-[234px] bg-[#D9D9D9] rounded-2xl flex flex-col items-center gap-2 p-4">
                        <div className="w-full flex justify-end">
                            <Image src={"/icons/icons8-plus-96.png"} width={19} height={19} alt="icon" />
                        </div>
                        <div className="w-full flex justify-start">
                            <h1 className="font-bold">ตัวเลือกการจัดส่ง</h1>
                        </div>
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] flex justify-between items-center px-2 rounded-[8px]">
                            <span className=" group-hover:text-white font-bold">ที่อยู่ที่ 1</span>
                            <Image src={"/icons/icons8-delete-90.svg"} width={19} height={19} alt="icon" />
                        </div>
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] flex justify-between items-center px-2 rounded-[8px]">
                            <span className=" group-hover:text-white font-bold">ที่อยู่ที่ 1</span>
                            <Image src={"/icons/icons8-delete-90.svg"} width={19} height={19} alt="icon" />
                        </div>
                    </div>
                    <div className="w-[559px] h-[234px] bg-[#D9D9D9] rounded-2xl flex flex-col items-center gap-2 p-4">
                        <div className="w-full flex justify-end">
                            <Image src={"/icons/icons8-plus-96.png"} width={19} height={19} alt="icon" />
                        </div>
                        <div className="w-full flex justify-start">
                            <h1 className="font-bold">ตัวเลือกการจัดส่ง</h1>
                        </div>
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] flex justify-between items-center px-2 rounded-[8px]">
                            <span className=" group-hover:text-white font-bold">ที่อยู่ที่ 1</span>
                            <Image src={"/icons/icons8-delete-90.svg"} width={19} height={19} alt="icon" />
                        </div>
                        <div className=" group w-[492px] h-[55px] bg-white hover:bg-[#1E3A8A] flex justify-between items-center px-2 rounded-[8px]">
                            <span className=" group-hover:text-white font-bold">ที่อยู่ที่ 1</span>
                            <Image src={"/icons/icons8-delete-90.svg"} width={19} height={19} alt="icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}