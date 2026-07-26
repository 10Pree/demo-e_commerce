
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import HeaderProduct  from "@/components/headerProduct";

export default async function Page({ searchParams }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const params = await searchParams
  const search = params?.search || ""
  const category = params?.category || ""

  let productsData = null
  try {
    const res = await axios.get(`${API_URL}/search/products?search=${search}&category=${category}`)
    productsData = res.data.data
  } catch (error) {
    console.log(error)
  }
  return (
    <>
      <div className=" flex flex-col justify-center items-center my-4">
        <HeaderProduct keyword={search} />
        <div className="w-full flex justify-center items-center mt-12 mb-[80px] md:mb-0 py-4">
          <div className="w-full md:w-fit grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 mx-2 md:mx-0">
            {productsData && productsData.length > 0 && (
              productsData.map((p, index) => (
                <Link key={index} href={`/product/${p.p_code}`} className="w-full h-[300px] md:w-[230px] md:h-[300px] shadow-2xl rounded-xl bg-white cursor-pointer border border-gray-300 group ">
                  <div key={index} className=" relative bg-[#F3F4F6] h-36 w-full flex justify-center items-center rounded-t-xl group-hover:bg-gray-200 duration-300 ease-in">
                    <Image className="object-contain" src={p.image_url ? `${API_URL}${p.image_url}` : "/images/iphone-card-40-17pro.png"} alt="image product" fill />
                  </div>
                  <div className="p-3 flex flex-col gap-1 text-[#111827]">
                    <span className="font-bold line-clamp-1">{p.p_name}</span>
                    <p className=" font-light text-gray-500 w-full h-full line-clamp-2 md:line-clamp-3">{p.p_details}</p>
                    <div className="font-bold text-2xl text-end text-[#1E3A8A]">{p.p_price}฿</div>
                  </div>
                </Link>
              ))
            )
            }
            {productsData && productsData.length === 0 && (
              <div className="w-screen h-screen flex justify-center items-center">
                <div className="flex flex-col justify-center items-center opacity-50">
                  <Image src="/images/logo.png" alt="logo" width={100} height={100} />
                  <span className="text-2xl font-bold text-[#111827]">ไม่มีสินค้าอยู่</span>
                </div>
              </div>
            )}
          </div>        
        </div>
      </div>
    </>
  )
}