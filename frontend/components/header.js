"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [text, settext] = useState("")
  const router = useRouter()

  const searchToinput = () => {
    if(!text) return
    router.push(`/product/?keyword=${text}`)
  }
  return (
    <div>
      <nav className="flex justify-around items-center px-3">
        <div className="w-full flex flex-col md:flex-row justify-around items-center gap-2 md:gap-14 px-3 bg-amber-300">
          <div>
            <Image src="/images/logo.png" alt="logo" width={80} height={80} />
          </div>
          <div className="flex gap-4">
            <div className="bg-[#D9D9D9] rounded-[0.5rem] w-[100%] md:w-96 h-9 flex items-center">
              <div className="absolute">
                <Image
                  className="mx-3"
                  src="/icons/icons8-search.svg"
                  alt="icon-search"
                  width={20}
                  height={20}
                  priority
                />
              </div>
              <input className="w-full h-full pl-10" type="text" onChange={(e) => settext(e.target.value)} onKeyDown={(e) => e.key === "Enter" && searchToinput()} />
            </div>
            <button onClick={searchToinput} className="w-16 bg-[#1E3A8A] rounded-[8px] font-bold text-white hover:bg-white hover:text-[#1E3A8A] hover:border-1">ค้นหา</button>
          </div>
          <div className=" md:block hidden">
            <div className="flex gap-8">
              <div className="flex gap-2">
                <span className=" cursor-pointer hover:bg-[#]">Sing up</span>
                <span>/</span>
                <span className=" cursor-pointer">Login</span>
              </div>
              <Link href="/basket"><Image src="/icons/icons8-shopping-cart-48.png" alt="logo" width={20} height={20} /></Link>
            </div>
          </div>
        </div>
        <div className=" block md:hidden">
          <div className="w-full h-[70px] bg-[#1E3A8A] fixed bottom-0 left-0 right-0 flex gap-13 items-center justify-center">
            <Link className="flex flex-col justify-center items-center" href={"/"}>
              <Image src={"/icons/icons8-home-96.png"} width={35} height={35} alt="icon" />
              <span className="text-white font-bold">หน้าหลัก</span>
            </Link>
            <Link className="flex flex-col justify-center items-center" href={"/product"}>
              <Image src={"/icons/icons8-shopping-bag-w-96.png"} width={35} height={35} alt="icon" />
              <span className="text-white font-bold">สินค้า</span>
            </Link>
            <Link className="flex flex-col justify-center items-center" href={"/basket"}>
              <Image src={"/icons/icons8-shopping-cart-96.png"} width={40} height={40} alt="icon" />
              <span className="text-white font-bold">ตะกร้า</span>
            </Link>
            <Link className="flex flex-col justify-center items-center" href={"/profile"}>
              <Image src={"/icons/icons8-customer-96.png"} width={35} height={35} alt="icon" />
              <span className="text-white font-bold">บัญชี</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
