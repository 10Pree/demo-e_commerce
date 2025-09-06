import Image from "next/image";

export default function Header() {
  return (
    <div>
      <nav className=" flex flex-col justify-around items-center px-3 md:flex-row">
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
          <input className="w-full h-full px-10" type="text" />
        </div>
        <div className=" md:block hidden">
          <ul>
            <li className=" flex gap-2">
              <strong className=" cursor-pointer">Sing up</strong>
              <strong>/</strong>
              <strong className=" cursor-pointer">Login</strong>
            </li>
          </ul>
        </div>
        <div className="md:hidden block">
                        <Image
            className="mx-3"
              src="/icons/icons8-menu.svg"
              alt="icon-search"
              width={20}
              height={20}
              priority
            />
        </div>
      </nav>
    </div>
  );
}
