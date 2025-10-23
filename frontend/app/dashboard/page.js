import Header from "@/components/dashboard/header";
import SideBar from "@/components/dashboard/sidebar";
import Image from "next/image";
export default function Page() {
  return (
    <div className="w-screen h-screen  flex flex-col">
      <Header />
      <div className="flex w-full h-full">
        <SideBar />
        <div className="w-full h-full flex justify-center items-center p-10">
          <div className="w-full h-full">
            <div className="flex gap-14 justify-center items-center">
              <div className="w-[314px] h-[183px] bg-[#1E3A8A] flex justify-center items-center gap-20 rounded-3xl">
                <Image
                  className="pb-25 "
                  src={"/icons/icons8-search.svg"}
                  width={50}
                  height={50}
                  alt="icon"
                />
                <div className=" flex flex-col gap-5">
                  <h1>รายได้วันนี้</h1>
                  <h1>9999+</h1>
                </div>
              </div>
              <div className="w-[314px] h-[183px] bg-[#1E3A8A] flex justify-center items-center gap-20 rounded-3xl">
                <Image
                  className="pb-25 "
                  src={"/icons/icons8-search.svg"}
                  width={50}
                  height={50}
                  alt="icon"
                />
                <div className=" flex flex-col gap-5">
                  <h1>รายได้วันนี้</h1>
                  <h1>9999+</h1>
                </div>
              </div>
              <div className="w-[314px] h-[183px] bg-[#1E3A8A] flex justify-center items-center gap-20 rounded-3xl">
                <Image
                  className="pb-25 "
                  src={"/icons/icons8-search.svg"}
                  width={50}
                  height={50}
                  alt="icon"
                />
                <div className=" flex flex-col gap-5">
                  <h1>รายได้วันนี้</h1>
                  <h1>9999+</h1>
                </div>
              </div>
            </div>

            <div className="w-full h-4/5 bg-gray-200 ">
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
