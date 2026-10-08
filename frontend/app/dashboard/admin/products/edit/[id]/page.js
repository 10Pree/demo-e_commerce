"use client"
import Image from "next/image"
import axios from "axios"
import Swal from "sweetalert2"
import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PackagePlus, Trash, X } from 'lucide-react';

export default function Page({ params }) {
    const router = useRouter()
    const [urlImagePreview, seturlImagePreview] = useState([])
    const [categories, setCategories] = useState([])
    const [attributes, setAttributes] = useState([])
    const [attributesValues, setAttributesValues] = useState([])
    const [variantsIds, setVariantsIds] = useState([])
    const [variants, setVariants] = useState([])
    const [openpopup, setOpenpopup] = useState(true)
    const { id } = use(params)
    const [productData, setProductData] = useState({
        p_name: "",
        p_details: "",
        p_stock: 0,
        images: [],
        categories_ids: [],
        variants: []
    })


    const getProductById = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/product/${id}`, { withCredentials: true })
            const productRow = res.data.product?.[0]
            if (!productRow) {
                Swal.fire({
                    icon: 'error',
                    title: "ไม่พบข้อมูลสินค้า",
                    timer: 2000,
                    showConfirmButton: false
                })
                router.push("/dashboard/admin/products")
                return
            }
            const variantsRow = res.data.variants || []
            const { p_name, p_price, p_details, p_stock, images, categories_ids } = productRow

            setProductData({ p_name, p_price, p_details, p_stock, images: images || [], categories_ids: categories_ids || [], variants: variantsRow || [] })
            setUrlImagePreview(images.map(img => `http://localhost:8000${img}`))


        } catch (error) {
            console.log("Message Error: ", error)
        }
    }
    const getCategories = async () => {
        try {
            const res = await axios.get("http://localhost:8000/categories", { withCredentials: true })
            setCategories(res.data.data)
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

    const handleDeleteimg = (index) => {
        try {
            setProductData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
            seturlImagePreview(prev => prev.filter((_, i) => i !== index))
            revokeObjectURL(urlImagePreview[index])
        } catch (err) {
            console.log("Message Error: ", err)
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

    const handleAddVariant = (formData) => {
        const sku = formData.get('sku')
        const price = formData.get('price')
        const stock = formData.get('stock')

        const attributeids = variantsData.map((attr) => (
            formData.get(`attribute-${attr.attribute_id}`)
        ))

        if (!sku || !price || !stock || !attributeids || !attributeids || attributeids.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: "กรุณากรอกข้อมูล รูปแบบสินค้า ให้ครบ",
                timer: 2000,
                showConfirmButton: false
            })
            return
        }
        const newVariant = {
            "sku": sku,
            "price": Number(price),
            "stock": Number(stock),
            "attribute_value_ids": attributeids.map(Number)
        }

        setProductData(prev => ({ ...prev, variants: [...prev.variants, newVariant] }))
        // console.log("Product Data Variants:", productData.variants)
    }

    const handleDeleteVariant = (index) => {
        try {
            setProductData(prev => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }))
        } catch (error) {
            console.log("Message Error: ", error)
        }
    }
    const handleSubmitVariant = (formData) => {
        const variantIds = formData.getAll('variant').map(Number)
        setVariantsIds(variantIds)
        setOpenpopup(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log("Name: ", name, "Value: ", value)
        setProductData(prev => ({ ...prev, [name]: value }))
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
            console.log("oldImages:", oldImages)

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
        getCategories()
        getCategoryById()

        console.log("Products: ", productData)
        console.log("urlImagePreview: ", urlImagePreview)
    }, [])
    return (
        <div className="w-full h-full flex flex-col gap-3 ">
            <div className="flex items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#111827]">แก้ไขสินค้า</h1>
                    <p className="text-sm text-gray-500 mt-1">ฟอร์มแก้ไขสินค้า</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                <div className="w-full md:w-1/2 h-full flex flex-col  gap-3">
                    <div className="w-full bg-[#F3F4F6] rounded-2xl shadow-2xl p-4">
                        <div>
                            <h1 className="text-[16px] font-bold">ชื่อ</h1>
                            <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="text" name="p_name" onChange={handleChange} value={productData.p_name || ""} />
                        </div>
                        <div>
                            <h1 className="text-[16px] font-bold">ราคา</h1>
                            <input className="bg-white border-[1px] rounded-[8px] p-1 w-full" type="text" name="p_price" onChange={handleChange} value={productData.p_price || ""} />
                        </div>
                        <div>
                            <h1 className="text-[16px] font-bold">รายละเอียด</h1>
                            <textarea className="w-full h-40 border rounded-[8px] p-2" name="p_details" onChange={handleChange} value={productData.p_details || ""} ></textarea>
                        </div>
                    </div>
                    <div className=" w-full bg-[#F3F4F6] rounded-2xl shadow-2xl p-4 ">
                        <div>
                            <h1 className="text-[16px] font-bold">ประเภท</h1>
                            <div className="border-[1px] rounded-[8px] p-2 flex flex-col gap-1">
                                {/* {categories.map(t => (
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
                                ))} */}
                            </div>
                        </div>
                    </div>
                    <div className=" w-full bg-[#F3F4F6] rounded-2xl shadow-2xl p-4">
                        <div className="flex flex-col gap-2F">
                            <h1 className="text-[16px] font-bold">อัพโหลด</h1>
                            <div className="flex justify-start items-center">
                                <label className="cursor-pointer shadow-2xl w-fit h-fit bg-[#1E3A8A] rounded-[8px] p-3">
                                    <input onChange={handleUpload} multiple className="hidden" type="file" accept="image/*" /><Image src={"/icons/icons8-upload-48.png"} alt="icon upload" width={20} height={20} />
                                </label>
                            </div>
                            <span>รูป</span>
                            <div className="w-full h-[300px] flex justify-center items-center gap-2 overflow-x-scroll">
                                {/* {
                                    urlImagePreview.length > 0 ? urlImagePreview.map((src, index) =>
                                        <div key={index} className="relative w-[150px] h-[150px] flex-shrink-0">
                                            <Image className="w-full h-full object-cover" unoptimized src={src} alt="icon upload" width={300} height={300} />
                                            <Image src={"/icons/icons8-delete-90.svg"} width={50} height={50} onClick={() => handleDeleteimg(index)} alt="image" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer opacity-70 hover:opacity-100" />
                                        </div>)
                                        :
                                        <div className="w-1/2 h-1/2 border-[1px] rounded-2xl flex justify-center items-center ">ไม่ได้อัพรูป</div>
                                } */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 h-fit rounded-2xl shadow-2xl p-4">
                    <div className="flex flex-col gap-5">
                        <form action={handleAddVariant} className="flex flex-col gap-5 ">
                            <h1 className="text-[16px] font-bold">รูปแบบสินค้า</h1>
                            <div className="flex justify-end items-center">
                                <div onClick={() => setOpenpopup(false)} className="flex justify-center items-center gap-2 bg-[#1E3A8A] w-fit px-2 py-2 rounded-2xl text-white cursor-pointer">
                                    เพิ่มรูปแบบสินค้า
                                </div>
                            </div>
                            <div className="border-[1px] rounded-[8px] p-2 flex flex-col gap-3">
                                {/* {
                                    variants.length > 0 ?
                                        variants.map((item) => (
                                            <div key={item.attribute_id} className="flex flex-col gap-1">
                                                <h2 className="text-[16px] font-bold">{item.attribute_name}</h2>
                                                <div className="flex gap-2" >
                                                    {
                                                        item.values.map((val) => (
                                                            <div key={val.value_id} className="flex gap-2">
                                                                <span>{val.value}</span>
                                                                <input type="radio" name={`attribute-${item.attribute_id}`} value={val.value_id} />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ))
                                        :
                                        <div className="flex justify-center items-center h-[100px] w-full">
                                            <span className="text-black/60">ไม่มีรูปแบบสินค้า</span>
                                        </div>
                                } */}
                            </div>
                            <div className="flex justify-start items-center gap-2">
                                <span className="text-[16px] font-bold">รหัสสินค้า</span>
                                <input className="border-[1px] rounded-[8px] p-2" type="text" name="sku" placeholder="รหัสสินค้า" />
                            </div>
                            <div className="flex justify-start items-center gap-2">
                                <span className="text-[16px] font-bold">ราคา</span>
                                <input className="border-[1px] rounded-[8px] p-2" type="number" name="price" placeholder="ราคา" />
                            </div>
                            <div className="flex justify-start items-center gap-2">
                                <span className="text-[16px] font-bold">จำนวน</span>
                                <input className="border-[1px] rounded-[8px] p-2" type="number" name="stock" placeholder="จำนวนสินค้า" />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="submit" className="flex justify-center items-center gap-2 bg-[#1E3A8A] w-fit px-2 py-2 rounded-2xl text-white cursor-pointer">
                                    เพิ่ม
                                    <PackagePlus size={20} />
                                </button>
                            </div>
                        </form>
                        <div className="flex flex-col justify-center gap-3">
                            <span className="text-center font-bold">รายละเอียดสต๊อกสินค้า</span>
                            <div className="flex flex-col justify-start gap-3">
                                {/* {
                                    variants.length > 0 ?
                                        productData.variants.map((item, index) => (
                                            <div key={index} className="flex justify-between gap-2 border rounded-2xl p-2 px-6">
                                                <div className="flex gap-4 ">
                                                    <span>{index + 1}</span>
                                                    <span>{item.sku}</span>
                                                    <span>
                                                        {
                                                            attributesValues
                                                                .filter((val) => val.value_id === item.attribute_value_ids[0])
                                                                .map((val) => val.value)
                                                        }
                                                    </span>
                                                    <span>
                                                        {
                                                            attributesValues
                                                                .filter((val) => val.value_id === item.attribute_value_ids[1])
                                                                .map((val) => val.value)
                                                        }
                                                    </span>
                                                    <span>{item.price}</span>
                                                </div>
                                                <div className="flex justify-center items-center gap-4">
                                                    <span>{item.stock} ชิ้น</span>
                                                    <Trash size={20} color="red" onClick={() => handleDeleteVariant(index)} />
                                                </div>
                                            </div>
                                        ))
                                        :
                                        <div className="flex justify-center items-center h-[200px] w-full">
                                            <span className="text-black/60">ไม่มีรายละเอียดสต๊อกสินค้า</span>
                                        </div>
                                } */}
                            </div>
                            <div className="flex justify-end">
                                <div className="flex flex-row justify-center items-center gap-2">
                                    <span>
                                        รวม
                                    </span>
                                    <div className=" border px-5 py-1 rounded-[8px]">
                                        {/* {
                                            productData.variants.reduce((total, item) => item.stock + total, 0)
                                        } */}
                                    </div>
                                    <span>
                                        ชิ้น
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-end"><button className="bg-[#1E3A8A] px-4 py-2 rounded-2xl text-white" onClick={updateProduct}>บันทึก</button></div>
            <div className={`bg-black/50 w-full h-full fixed top-0 left-0 flex justify-center items-center ${openpopup ? 'hidden' : ''}`}>
                <form action={handleSubmitVariant} className="bg-white md:w-[440px] md:h-[468px] w-[70%] h-[59%] rounded-3xl relative">
                    <div className="flex justify-end items-center mt-3 mr-3">
                        <X className=" cursor-pointer" onClick={() => setOpenpopup(true)} />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-6">
                        <h2 className="font-bold">รูปแบบสินค้า</h2>
                        <div className="flex flex-col gap-3 border rounded-[12px] w-[80%] h-[300px] p-3 overflow-y-scroll">
                            {/* {
                                attributes.map((arr) => (
                                    <div key={arr.attribute_id} className="flex gap-2 py-2 px-4 border w-fit rounded-[12px]">
                                        <input type="checkbox" name="variant" value={arr.attribute_id} />
                                        <span>{arr.attribute_name}</span>
                                    </div>
                                ))
                            } */}
                        </div>
                    </div>
                    <button className="absolute bottom-4 right-4 py-2 px-4 bg-[#1E3A8A] text-white rounded-[12px] cursor-pointer" type="submit">เลือก</button>
                </form>
            </div>
        </div>
    )
}