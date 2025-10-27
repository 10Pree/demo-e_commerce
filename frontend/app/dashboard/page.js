import Image from "next/image";

export default function Page() {
  return (
        <main className="w-full h-full flex justify-center items-center p-10">
          <div className="w-full h-full">
            <div className="flex gap-7 justify-center items-center flex-col  md:flex-row md:gap-14">
              <div className="w-[314px] h-[183px] bg-[#1E3A8A] flex justify-center items-center gap-15 rounded-3xl">
                <Image
                  className="pb-15"
                  src={"/icons/icons8-search-90.svg"}
                  width={55}
                  height={55}
                  alt="icon"
                />
                <div className=" flex flex-col gap-5">
                  <h1 className=" text-3xl font-normal text-white">รายได้วันนี้</h1>
                  <h1 className=" text-3xl font-bold text-white tracking-wide">+9999</h1>
                </div>
              </div>
                            <div className="w-[314px] h-[183px] bg-[#1E3A8A] flex justify-center items-center gap-15 rounded-3xl">
                <Image
                  className="pb-15"
                  src={"/icons/icons8-search-90.svg"}
                  width={55}
                  height={55}
                  alt="icon"
                />
                <div className=" flex flex-col gap-5">
                  <h1 className=" text-3xl font-normal text-white">รายได้วันนี้</h1>
                  <h1 className=" text-3xl font-bold text-white tracking-wide">+9999</h1>
                </div>
              </div>
                            <div className="w-[314px] h-[183px] bg-[#1E3A8A] flex justify-center items-center gap-15 rounded-3xl">
                <Image
                  className="pb-15"
                  src={"/icons/icons8-search-90.svg"}
                  width={55}
                  height={55}
                  alt="icon"
                />
                <div className=" flex flex-col gap-5">
                  <h1 className=" text-3xl font-normal text-white">รายได้วันนี้</h1>
                  <h1 className=" text-3xl font-bold text-white tracking-wide">+9999</h1>
                </div>
              </div>
            </div>
            <h1 className="my-5 text-3xl font-bold">Dashboard</h1>
            <div className="w-full h-full bg-gray-200">
                
            </div>
          </div>
        </main>
  );
}
