import Image from "next/image";

export default function Profile() {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex flex-col items-center justify-center gap-4 bg-[#F3F4F6] shadow-2xl w-fit h-fit rounded-2xl p-8">
                <Image src="/images/logo.png" alt="logo" width={75} height={75} />
                <h1 className="text-[18px] font-bold text-[#111827]">ข้อมูล</h1>
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col items-start justify-center gap-1">
                        <span className="text-sm text-gray-700 mt-1">ชื่อผู้ใช้</span>
                        <span className="text-sm text-gray-700 mt-1">อีเมล</span>
                        <span className="text-sm text-gray-700 mt-1">เบอร์โทรศัพท์</span>
                    </div>
                                        <div className="flex flex-col items-start justify-center gap-1">
                        <span className="text-sm text-gray-500 mt-1">username</span>
                        <span className="text-sm text-gray-500 mt-1">email@example.com</span>
                        <span className="text-sm text-gray-500 mt-1">081-234-5678</span>
                    </div>
                </div>
            </div>
        </div>
    );
}