import Image from "next/image"
export default function Page({ params }) {

    return (
        <div className="w-screen h-screen">
            <div>
                <div>
                    <Image src={"/images/iphone-card-40-17pro.png"} width={100} height={100} alt="image product" />
                </div>
                <div>
                    <h1>IPHONE 17 Pro</h1>
                    <span>1999</span>
                    <span>ความจุ</span>
                    <div className="flex flex-wrap gap-4">
                            <label className="cursor-pointer flex">
                                <input className="hidden peer" type="radio" value={256} name="valence" />
                                <span className="w-[90px] h-[30px] text-[20px] bg-[#F3F4F6]  rounded-[8px] font-bold text-center text-[#111827] peer-checked:bg-[#1E3A8A] peer-checked:text-white">256GB</span>
                            </label>

                            <label className="cursor-pointer flex">
                                <input className="hidden peer" type="radio" value={512} name="valence" />
                                <span className="w-[90px] h-[30px] text-[20px] bg-[#F3F4F6]  rounded-[8px] font-bold text-center text-[#111827] peer-checked:bg-[#1E3A8A] peer-checked:text-white">512GB</span>
                            </label>
                    </div>
                    <span>สี</span>
                    <div className="flex flex-wrap gap-4">

                        <label className="w-[100px] h-[30px] flex cursor-pointer">
                            <input className=" hidden peer" type="radio" name="color" />
                            <span className="w-[100px] h-[30px] bg-[#F3F4F6] rounded-[8px] text-[20px] font-bold text-center peer-checked:bg-[#1E3A8A] peer-checked:text-white">Black</span>
                        </label>


                        <label className="w-[100px] h-[30px] flex cursor-pointer">
                            <input className=" hidden peer" type="radio" name="color" />
                            <span className="w-[100px] h-[30px] bg-[#F3F4F6] rounded-[8px] text-[20px] font-bold text-center peer-checked:bg-[#1E3A8A] peer-checked:text-white">White</span>
                        </label>


                        <label className="w-[100px] h-[30px] flex cursor-pointer">
                            <input className=" hidden peer" type="radio" name="color" />
                            <span className="w-[100px] h-[30px] bg-[#F3F4F6] rounded-[8px] text-[20px] font-bold text-center peer-checked:bg-[#1E3A8A] peer-checked:text-white">Mist Blue</span>
                        </label>


                        <label className="w-[100px] h-[30px] flex cursor-pointer">
                            <input className=" hidden peer" type="radio" name="color" />
                            <span className="w-[100px] h-[30px] bg-[#F3F4F6] rounded-[8px] text-[20px] font-bold text-center peer-checked:bg-[#1E3A8A] peer-checked:text-white">Lavender</span>
                        </label>

                        <label className="w-[100px] h-[30px] flex cursor-pointer">
                            <input className=" hidden peer" type="radio" name="color" />
                            <span className="w-[100px] h-[30px] bg-[#F3F4F6] rounded-[8px] text-[20px] font-bold text-center peer-checked:bg-[#1E3A8A] peer-checked:text-white">Sage</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}