"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"


export default function Page() {
    const router = useRouter()
    const [urlImagePreview, seturlImagePreview] = useState([])
    const [categories, setCategories] = useState([])
    const [productData, setProductData] = useState({
        p_name: "",
        p_price: 0,
        p_details: "",
        p_stock: 0,
        images: [],
        categories_ids: []
    })

    // console.log("Products: ", productData)
    // console.log("urlImagePreview: ", urlImagePreview)


    const handleCreateUser = async () => {
        try {
            const formData = new FormData()

            formData.append('p_name', productData.p_name)
            formData.append('p_price', productData.p_price)
            formData.append('p_details', productData.p_details)
            formData.append('p_stock', productData.p_stock)

            productData.images.forEach(file => {
                formData.append('images', file)
            })

            formData.append('categories_ids', productData.categories_ids)

            const res = await axios.post("http://localhost:8000/product", formData, { withCredentials: true, headers: {'Content-Type': 'multipart/form-data'} })
            // alert("Create User Successful")
            Swal.fire({
                icon:'success',
                title: "เพิ่มสินค้าแล้ว",
                timer: 2000,
                showConfirmButton: false
            })
            router.push("/dashboard/admin/products")
        } catch (error) {
            console.log("Message Error: ", error)
        }
    }

    const handleDeleteimg = (index) => {
        try{
            setProductData(prev => ({...prev, images: prev.images.filter((_, i) => i !== index)}))
            seturlImagePreview(prev => prev.filter((_, i) => i !== index))
        }catch(err){
            console.log("Message Error: ", err)
        }
    }

    const getCategories = async () => {
        try {
            const res = await axios.get("http://localhost:8000/categories", { withCredentials: true })
            setCategories(res.data.data)
            // console.log(res.data.data)
        } catch (error) {
            console.log("Message Error: ", error)
        }
    }

    const handleUpload = (e) => {
        const files = [...e.target.files]
        const prevViewUrl = files.map(file => URL.createObjectURL(file))

        const newPrevViewUrl = [...urlImagePreview, ...prevViewUrl]
        const newFiles = [...productData.images, ...files]
        // urlImagePreview แสดงให้ user เห็น
        seturlImagePreview(newPrevViewUrl)
        /// setProductData ส่งให้ Backend
        setProductData({ ...productData, images: newFiles })
    }
    useEffect(() => {
        getCategories()
    }, [])
    return (
        <div>
            <h1 className="text-3xl font-bold my-4">เพิ่มสินค้า</h1>
            <div className="flex-row justify-center items-center gap-4 md:flex">
                <div className="w-full h-full md:w-1/3  bg-[#F3F4F6] rounded-2xl shadow-2xl p-4 ">
                    <div>
                        <h1 className="text-[16px] font-bold">ชื่อ</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="text" onChange={(e) => setProductData({ ...productData, p_name: e.target.value })} />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">ราคา</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="number" onChange={(e) => setProductData({ ...productData, p_price: e.target.value })} />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">ประเภท</h1>
                        <div className="border-[1px] rounded-[8px] p-2 flex flex-col gap-1">
                            {categories.map(t => (
                                <label key={t.id} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={t.id}
                                        checked={productData.categories_ids.includes(t.id)}
                                        onChange={(e) => {
                                            const id = t.id
                                            if (e.target.checked) {
                                                setProductData({ ...productData, categories_ids: [...productData.categories_ids, id] })
                                            } else {
                                                setProductData({ ...productData, categories_ids: productData.categories_ids.filter(c => c !== id) })
                                            }
                                        }}
                                    />
                                    {t.name}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">จำนวน</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="number" onChange={(e) => setProductData({ ...productData, p_stock: e.target.value })} />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">รายละเอียด</h1>
                        <textarea className="w-full h-40 border rounded-[8px] p-2" onChange={(e) => setProductData({ ...productData, p_details: e.target.value })}></textarea>
                    </div>
                </div>
                <div className="flex justify-center items-center m-8 md:m-0">
                    <div className="w-fit h-fit bg-[#F3F4F6]  rounded-2xl shadow-2xl p-4 flex flex-col justify-center gap-2">
                        <h1 className="text-[16px] font-bold">อัพโหลด</h1>
                        <div className="flex justify-start items-center">
                            <label className="cursor-pointer shadow-2xl w-fit h-fit bg-[#1E3A8A] rounded-[8px] p-3">
                                <input onChange={handleUpload} multiple className="hidden" type="file" accept="image/*" /><Image src={"/icons/icons8-upload-48.png"} alt="icon upload" width={20} height={20} />
                            </label>
                        </div>
                        <span>รูป</span>
                        <div className="w-[300px] h-[300px] flex justify-center items-center gap-2 overflow-x-scroll">
                            {
                                urlImagePreview.length > 0 ? urlImagePreview.map((src, index) =>
                                    <div key={index} className="relative w-[150px] h-[150px] flex-shrink-0">
                                        <Image className="w-full h-full object-cover" unoptimized src={src} alt="icon upload" width={300} height={300} />
                                        <Image src={"/icons/icons8-delete-90.svg"} width={50} height={50} onClick={() => handleDeleteimg(index)} alt="image" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100" />
                                    </div>)
                                    :
                                    <div className="w-1/2 h-1/2 border-[1px] rounded-2xl flex justify-center items-center ">ไม่ได้อัพรูป</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-end"><button className="bg-[#1E3A8A] px-4 py-2 rounded-2xl text-white" onClick={handleCreateUser}>บันทึก</button></div>
        </div>
    )
}