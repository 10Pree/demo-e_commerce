import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <nav className=" flex justify-around items-center px-3">
        <div>
          <Image src="/images/logo.png" alt="logo" width={80} height={80} />
        </div>
        <div className="bg-[#D9D9D9] rounded-[0.5rem] w-96 h-9 flex items-center">
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
          <input className="w-full h-full pl-10" type="text" />
        </div>
        <div className=" md:block hidden">
          <div className="flex gap-8">
            <div className="flex gap-2">
              <span className=" cursor-pointer hover:bg-[#]">Sing up</span>
              <span>/</span>
              <span className=" cursor-pointer">Login</span>
            </div>
            <Image src="/icons/icons8-shopping-cart-48.png" alt="logo" width={20} height={20} />
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
