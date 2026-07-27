import BuyButton from "@/components/buyButton"
import axios from "axios"
import Image from "next/image"

export default async function Page({ params }) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const { id } = await params
    let productData = null
    try{
        const res = await axios.get(`${API_URL}/product/code/${id}`)
        productData =  res.data.data[0]
    }catch(error){
        console.log(error)
    }

    return (
        <div className="w-full min-h-screen">
            <div className="flex flex-col gap-24 justify-center items-center my-4 md:my-24 px-4">
                <div className="flex flex-col md:flex-row gap-9 px-8">
                    <div className="relative w-full h-[300px] md:w-[400px] md:h-[400px] bg-[#F3F4F6] rounded-xl flex justify-center items-center">
                        <Image className="object-contain" src={productData?.image_url ? `${API_URL}${productData.image_url}` : "/images/ImageNotFound-RB.svg"} alt="image product" fill />
                    </div>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-bold">{ productData?.p_name || "ชื่อสินค้าไม่สามารถแสดงได้"}</h1>
                        <div className="flex gap-2">
                            <span className="text-3xl font-bold">{ productData?.p_price || "-"}</span>
                            <span className=" text-gray-400 line-through  mt-4">999</span>
                        </div>
                        <span className="text-[1rem] font-bold">ความจุ</span>
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
                        <span className="text-[1rem] font-bold">สี</span>
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
                <div className="w-full mr-0 flex justify-center gap-4 md:mr-96 md:justify-end">
                    <button className="w-48 h-14 bg-[#F3F4F6] border border-[#111827] rounded-[8px] font-bold hover:bg-[#1E3A8A] hover:text-white duration-150 ease-in">เพิ่มไปยังรถเข็น</button>
                    <BuyButton code={productData?.p_code} />
                </div>
                <div className="flex flex-col justify-between w-full md:w-1/2 md:flex-row p-8 md:p-0 gap-8 md:gap-0">
                    <h2 className="font-bold">รายละเอียด</h2>
                    <p className="w-full md:w-1/2 flex flex-wrap">{productData?.p_details || "รายละเอียดสินค้าไม่สามารถแสดงได้"} </p>
                </div>
            </div>
        </div>
    )
}