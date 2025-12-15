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
            <div className=" flex flex-col justify-center items-center gap-5">
                <div className="max-w-[1236px] h-[84px] bg-white hover:bg-[#1E3A8A] shadow-md rounded-2xl transition delay-75 ease-in flex justify-between items-center gap-6 px-7 border border-gray-200">
                    <div className="flex justify-center items-center gap-1 ">
                        <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                        <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                    </div>
                    <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                    <Image src={"/icons/icons8-delete-90.svg"} width={35} height={35} alt="image" />
                </div>
                                <div className="max-w-[1236px] h-[84px] bg-white hover:bg-[#1E3A8A] shadow-md rounded-2xl transition delay-75 ease-in flex justify-between items-center gap-6 px-7 border border-gray-200">
                    <div className="flex justify-center items-center gap-1 ">
                        <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                        <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                    </div>
                    <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                    <Image src={"/icons/icons8-delete-90.svg"} width={35} height={35} alt="image" />
                </div>
                                                <div className="max-w-[1236px] h-[84px] bg-white hover:bg-[#1E3A8A] shadow-md rounded-2xl transition delay-75 ease-in flex justify-between items-center gap-6 px-7 border border-gray-200">
                    <div className="flex justify-center items-center gap-1 ">
                        <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                        <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                    </div>
                    <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                    <Image src={"/icons/icons8-delete-90.svg"} width={35} height={35} alt="image" />
                </div>
                                                <div className="max-w-[1236px] h-[84px] bg-white hover:bg-[#1E3A8A] shadow-md rounded-2xl transition delay-75 ease-in flex justify-between items-center gap-6 px-7 border border-gray-200">
                    <div className="flex justify-center items-center gap-1 ">
                        <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                        <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                    </div>
                    <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                    <Image src={"/icons/icons8-delete-90.svg"} width={35} height={35} alt="image" />
                </div>
                                                <div className="max-w-[1236px] h-[84px] bg-white hover:bg-[#1E3A8A] shadow-md rounded-2xl transition delay-75 ease-in flex justify-between items-center gap-6 px-7 border border-gray-200">
                    <div className="flex justify-center items-center gap-1 ">
                        <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                        <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                    </div>
                    <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                    <Image src={"/icons/icons8-delete-90.svg"} width={35} height={35} alt="image" />
                </div>
                                                <div className="max-w-[1236px] h-[84px] bg-white hover:bg-[#1E3A8A] shadow-md rounded-2xl transition delay-75 ease-in flex justify-between items-center gap-6 px-7 border border-gray-200">
                    <div className="flex justify-center items-center gap-1 ">
                        <Image src={"/images/iphone-card-40-17pro.png"} width={50} height={50} alt="image" />
                        <h2 className="truncate w-[100px] md:w-[400px] text-[12px] md:text-[16px]">Apple iPhone 16 128GB Teal</h2>
                    </div>
                    <span className="text-[12px] md:text-[16px]">26,900  บาท</span>
                    <Image src={"/icons/icons8-delete-90.svg"} width={35} height={35} alt="image" />
                </div>
            </div>
        </div>
    )
}