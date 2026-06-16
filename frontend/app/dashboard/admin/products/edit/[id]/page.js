"use client"
import Image from "next/image"
import { use, useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

export default function Page({ params }) {
    const router = useRouter()
    const { id } = use(params)
    const [urlImagePreview, setUrlImagePreview] = useState([])
    const [showCategory, setShowCategory] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [productData, setProductData] = useState(
        {
            p_name: "",
            p_price: 0,
            p_details: "",
            p_stock: 0,
            images: [],
            categories_ids: []
        }
    )


    // console.log("Products: ", productData)
    // console.log("urlImagePreview: ", urlImagePreview)

    const getProductById = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/product/${id}`, { withCredentials: true })
            const { p_name, p_price, p_details, p_stock, images, categories_ids } = res.data.data[0]

            setProductData({ p_name, p_price, p_details, p_stock, images: images || [], categories_ids: categories_ids || [] })
            setUrlImagePreview(images.map(img => `http://localhost:8000${img}`))


        } catch (error) {
            console.log("Message Error: ", error)
        }
    }
    const getCategoryById = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/categorie/${id}`, { withCredentials: true })
            setShowCategory(res.data.data[0])
            console.log(res)

        } catch (error) {
            console.log("Message Error: ", error)
        }
    }
    const getCategory = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/categories`, { withCredentials: true })
            setAllCategories(res.data.data)

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
        setUrlImagePreview(newPrevViewUrl)
        /// setProductData ส่งให้ Backend
        setProductData({ ...productData, images: newFiles })
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setProductData(prev => ({ ...prev, [name]: value }))
    }

const handleDeleteimg = (index) => {
    try {

        setProductData(prev => ({...prev, images: prev.images.filter((_, i) => i !== index)}))
        
        // ลบ preview ด้วย ไม่งั้นรูปยังโชว์อยู่
        setUrlImagePreview(prev => prev.filter((_, i) => i !== index))
    } catch (err) {
        console.log("Message Error: ", err)
    }
}

    const updateProduct = async () => {
        try {
            const formData = new FormData()


            formData.append('p_name', productData.p_name)
            formData.append('p_price', productData.p_price)
            formData.append('p_details', productData.p_details)
            formData.append('p_stock', productData.p_stock)

            formData.append('categories_ids', productData.categories_ids)

            const oldImages = productData.images.filter(img => typeof img === 'string')
            const newImages = productData.images.filter(img => img instanceof File)

            formData.append('old_images', JSON.stringify(oldImages)) // ส่งเป็น JSON
            newImages.forEach(file => formData.append('images', file)) // ส่งเป็น File

            const res = await axios.put(`http://localhost:8000/product/${id}`, formData, {
                withCredentials: true

            })
            console.log("oldImages:",oldImages)

            Swal.fire({
                icon: 'success',
                title: "อัพเดตสินค้าสำเร็จ",
                timer: 2000,
                showConfirmButton: false
            })

            console.log(res)

        } catch (error) {
            console.log("Message Error: ", error)
        }
    }
    useEffect(() => {
        getProductById()
        getCategory()
        getCategoryById()
    }, [])
    return (
        <div>
            <h1 className="text-3xl font-bold my-4">แก้ไขสินค้า</h1>
            <div className="flex-row justify-center items-center gap-4 md:flex">
                <div className="w-full h-full md:w-1/3  bg-[#F3F4F6] rounded-2xl shadow-2xl p-4 ">
                    <div>
                        <h1 className="text-[16px] font-bold">ชื่อ</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="text" name="p_name" onChange={handleChange} value={productData.p_name || ""} />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">ราคา</h1>
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="number" name="p_price" onChange={handleChange} value={productData.p_price} />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">ประเภท</h1>
                        <div className="border-[1px] rounded-[8px] p-2 flex flex-col gap-1">
                            {allCategories.map(t => (
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
                        <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="number" name="p_stock" onChange={handleChange} value={productData.p_stock} />
                    </div>
                    <div>
                        <h1 className="text-[16px] font-bold">รายละเอียด</h1>
                        <textarea className="w-full h-40 border rounded-[8px] p-2" onChange={handleChange} name="p_details" value={productData.p_details}></textarea>
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
                        <div className="w-[300px] h-[300px] flex flex-nowrap justify-start items-center gap-2 overflow-x-scroll">
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
            <div className="text-end"><button className="bg-[#1E3A8A] px-4 py-2 rounded-2xl text-white" onClick={updateProduct}>บันทึก</button></div>
        </div>
    )
}