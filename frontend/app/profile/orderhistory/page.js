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
            <main className="flex flex-col justify-center items-center">
                <div className=" border-2 w-[1040px] h-[88px] rounded-2xl flex justify-center items-center gap-[100px]">
                    <Link href={"/"} className=" hover:bg-[#111827] hover:text-white w-[150px] h-[70px] font-bold flex justify-center items-center rounded-[8px] transition delay-150 ease-in">ทั้งหมด</Link>
                    <Link href={"/"} className=" hover:bg-[#111827] hover:text-white w-[150px] h-[70px] font-bold flex justify-center items-center rounded-[8px] transition delay-150 ease-in">ที่ต้องชำละ</Link>
                    <Link href={"/"} className=" hover:bg-[#111827] hover:text-white w-[150px] h-[70px] font-bold flex justify-center items-center rounded-[8px] transition delay-150 ease-in">ที่ต้องจัดส่ง</Link>
                    <Link href={"/"} className=" hover:bg-[#111827] hover:text-white w-[150px] h-[70px] font-bold flex justify-center items-center rounded-[8px] transition delay-150 ease-in">สำเร็จแล้ว</Link>
                </div>
                <div>
                    <div>
                        <div>
                            <Image src={"/public/images/ChatGPT Image 27 ก.ย. 2568 15_59_55.png"} width={50} height={50} alt="image" />
                            <h2>Apple iPhone 16 128GB Teal</h2>
                        </div>
                        <span>26,900  บาท</span>
                        <span>ที่ต้องรอการชำละ</span>
                    </div>
                </div>
            </main>
        </div>
    )
}