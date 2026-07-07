import { useState } from "react"

export function DataTableLogProducts({ data }) {


    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 10

    //จำวนเริ่มต้นและ จบ การแสดง ข้อมูล
    const startIdex = (currentPage - 1) * itemPerPage
    const endIndex = startIdex + itemPerPage
    const currentItem = data.slice(startIdex, endIndex)

    // จำนวนหน้าทั้งหมด
    // const totalPages = Math.ceil(data.length / itemPerPage)

    // const handleNext = () => {
    //     if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    // }

    // const handlePrev = () => {
    //     if (currentPage > 1) setCurrentPage(currentPage - 1)
    // }

    return (
        <>
            {
                currentItem.map((l, index) => (
                    <tr key={l.id} className="bg-white border-b text-[#111827] border-gray-200 hover:bg-[#111827] hover:text-white ">
                        <th scope="row" className="px-3 py-4 font-medium  hover:text-[#111827] whitespace-nowrap ">
                            {startIdex + index + 1}
                        </th>
                        <td className="px-6 py-4">
                            {l.users_id}
                        </td>
                        <td className="px-6 py-4">
                            {l.text}
                        </td>
                        <td className="px-6 py-4">
                            {l.created_at}
                        </td>
                    </tr>
                ))
            }
        </>
    )
}