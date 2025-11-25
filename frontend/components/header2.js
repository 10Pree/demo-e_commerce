import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <nav className=" flex flex-col justify-around items-center px-3 md:flex-row">
        <div>
          <Image src="/images/logo.png" alt="logo" width={80} height={80} />
        </div>
        <div className=" md:block hidden">
          <ul>
            <li className=" flex gap-2">
              <strong className=" cursor-pointer hover:bg-[#]">Sing up</strong>
              <strong>/</strong>
              <strong className=" cursor-pointer">Login</strong>
            </li>
          </ul>
        </div>
        <div className=" group md:hidden block mt-4 cursor-pointer w-fit">
          <label className="flex flex-col justify-center items-center">
            <input className="peer hidden" type="checkbox" />
            <Image
              className=""
              src="/icons/icons8-menu.svg"
              alt="icon-search"
              width={20}
              height={20}
              priority
            />
            <div className="mt-4 hidden peer-checked:block">
              <div className=" flex gap-2">
                <strong className=" cursor-pointer">Sing up</strong>
                <strong>/</strong>
                <strong className=" cursor-pointer">Login</strong>
              </div>
            </div>
          </label>
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
