"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function HeaderProduct({ keyword }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()


    const [search, setSearch] = useState(keyword || "")
    const [category, setCategory] = useState("")

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams)

            if (search) params.set('search', search)
            else params.delete('search')

            if (category) params.set('category', category)
            else params.set('category', "")

            router.push(`${pathname}?${params.toString()}`)
        }, 500)
        return () => clearTimeout(timer)
    }, [search, category])

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-[280px] md:w-[480px] h-[38px] bg-[#F3F4F6] rounded-[8px] relative">
                <input value={search} onChange={(e) => setSearch(e.target.value)} className=" absolute w-full h-full pl-10 focus:" type="text" />
                <Image className="absolute top-2 left-2 invert" src={"/icons/icons8-search-60.svg"} width={25} height={25} alt="icon" />
            </div>
            <div className="w-[280px] md:w-[480px] h-[38px] flex gap-2 mt-2">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-[50%] h-[38px] bg-[#F3F4F6] rounded-[8px]">
                    <option value="">เลือก</option>
                    <option value="1">Smartphone</option>
                    <option value="2">ACCESSORIES SMARTPHONE</option>
                    <option value="3">SMART WATCH</option>
                    <option value="4">SMART LIFE & IOT</option>
                    <option value="5">NOTEBOOK</option>
                    <option value="6">ACCESSORIES NOTEBOOK</option>
                    <option value="7">HEADSET</option>
                    <option value="8">MICROPHONE</option>
                </select>
            </div>
        </div>
    )
}