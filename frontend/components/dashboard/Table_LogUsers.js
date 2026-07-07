import { useState } from "react"

export function DataTableLogUsers({ data }) {
    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 10

    //จำวนเริ่มต้นและ จบ การแสดง ข้อมูล
    const startIdex = (currentPage - 1) * itemPerPage
    const endIndex = startIdex + itemPerPage
    const currentItem = data.slice(startIdex, endIndex)

    return (
        <>
            {currentItem.map((l) => (
                <tr key={l.id} className="bg-white border-b text-[#111827] border-gray-200 hover:bg-[#111827] hover:text-white ">
                    <th scope="row" className="px-3 py-4 font-medium hover:text-[#111827] whitespace-nowrap ">
                        {l.users_id}
                    </th>
                    <td className="px-6 py-4">
                        {l.name}
                    </td>
                    <td className="px-6 py-4">
                        {l.text}
                    </td>
                    <td className="px-6 py-4">
                        {l.created_at}
                    </td>
                </tr>
            ))}
        </>
    )
}