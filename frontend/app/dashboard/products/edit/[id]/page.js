"use client"
import Link from "next/link"
import Image from "next/image"
import { use, useEffect, useState } from "react"
import axios from "axios"

export default function Page({ params }) {
    const { id } = use(params)
    const [category, setCategory] = useState("0")
    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState(
        {
            p_code: "",
            p_name: "",
            p_price: "",
            p_details: "",
            p_stock: 0,
            p_image_url: "",
            created_at: "00-00-00",
            updated_at: "",
        }
    )

    const getProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/product/${id}`)
            setProduct(res.data.data[0])
            // console.log(product)

        } catch (error) {
            console.log("Message Error: ", error)
        }
    }
    const getCategoryById = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/categorie/${id}`)
            setCategory(res.data.data[0].id)

        } catch (error) {
            console.log("Message Error: ", error)
        }
    }
    const getCategory = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/categories`)
            setCategories(res.data.data)

        } catch (error) {
            console.log("Message Error: ", error)
        }
    }
    useEffect(() => {
        getProduct()
        getCategory()
        getCategoryById()
    }, [])
    return (
        <div>
            <h1 className="text-3xl font-bold my-4">แก้ไขสินค้า</h1>
            <div className="w-full h-full flex-row justify-center items-center gap-4 md:flex md:w-full">
                <div className="w-full h-1/2 bg-[#F3F4F6] rounded-2xl shadow-2xl p-4 md:w-1/2">
                    <div>
                        <h1 className="text-[16px] font-bold">ชื่อ</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="text" value={product.p_name} onChange={(e) => setProduct({ ...product, p_name: e.target.value })} />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">ราคา</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="number" value={product.p_price} onChange={(e) => setProduct({ ...product, p_price: e.target.value })} />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">ประเภท</h1>
                        <div className="w-[280px] md:w-[480px] h-[38px] flex gap-2 mt-2">
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-[50%] h-[38px] bg-[#F3F4F6] rounded-[8px] border">
                                <option value="0">เลือก</option>
                                {
                                    categories.map((c) => (
                                        <option key={c.id} value={String(c.id)}>{c.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">จำนวน</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="number" value={product.p_stock} onChange={(e) => setProduct({ ...product, p_stock: e.target.value })} />
                    </div>
                </div>
                <div className="flex justify-center items-center m-8 md:m-0">
                    <div className="w-fit h-fit bg-[#F3F4F6]  rounded-2xl shadow-2xl p-4 flex flex-col justify-center gap-2">
                        <h1 className="text-[16px] font-bold">อัพโหลด</h1>
                        <div className="w-fit h-fit bg-[#1E3A8A] rounded-[8px] flex justify-center items-center p-3">
                            <button className="cursor-pointer shadow-2xl h-full w-full"><Image src={"/icons/icons8-upload-48.png"} alt="icon upload" width={20} height={20} /></button>
                        </div>
                        <div>
                            <span>รูป</span>
                            <Image src={"/icons/icons8-upload-50.png"} alt="icon upload" width={200} height={300} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-end"><button className="bg-[#1E3A8A] px-4 py-2 rounded-2xl text-white">บันทึก</button></div>
        </div>
    )
}