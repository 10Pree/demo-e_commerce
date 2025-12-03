import Image from "next/image";

export default function Page() {
    return(
        <main className="w-full h-screen">
            <div className=" flex justify-start items-center gap-2 ml-48 mt-12">
                <div className="bg-[#1E3A8A] w-[25px] h-[25px] rounded-[8px] flex justify-center items-center">
                    <Image src={"/icons/icons8-back-w-52.png"} width={19} height={19} alt="icon" />
                </div>
                <span  className=" font-bold">กลับ</span>
            </div>
            <div>
                <div>

                </div>
            </div>
        </main>
    )
}