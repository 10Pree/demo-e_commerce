import Image from "next/image";
// import { useState } from "react";

export default function Header({ onToggleMenu }) {

  return (
    <div className="h-16">
      <nav className="bg-[#1E3A8A] h-full w-full flex items-center justify-between px-5">
        <div className="w-8">
          <Image onClick={onToggleMenu} className="block lg:hidden cursor-pointer"  src="/icons/icons8-menu-50.svg" alt="logo" width={75} height={75} />
        </div>
        <div className="">
          <Image
            className="mx-3 w-[35px] h-[36px]"
              src="/icons/icons8-user-profile-50.png"
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
