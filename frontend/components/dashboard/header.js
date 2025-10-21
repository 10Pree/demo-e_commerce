import Image from "next/image";

export default function Header() {
  return (
    <div className="h-[67px]">
      <nav className="bg-[#1E3A8A] h-full w-full flex items-center justify-between px-5">
        <div>
          <Image src="/images/logo.png" alt="logo" width={75} height={75} />
        </div>
        <div className="">
          <Image
            className="mx-3 w-[35px] h-[36px]"
              src="/images/icons8-user-profile-50.png"
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
