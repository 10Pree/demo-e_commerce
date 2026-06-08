import React from "react";
import Link from "next/link";
export function DataTableProducts({ data }) {

    return (
        <>
            {data.map((p) => (
                <tr key={p.id} className="bg-white border-b text-[#111827] border-gray-200 hover:bg-[#111827] hover:text-white ">
                    <th scope="row" className="px-3 py-4 font-medium whitespace-nowrap ">
                        {p.id}
                    </th>
                    <td className="px-6 py-4">
                        {p.p_name}
                    </td>
                    <td className="px-3 py-4">
                        ${p.p_price}
                    </td>
                    <td className="px-3 py-4">
                        {p.p_stock}
                    </td>
                    <td className="py-4 text-center flex justify-center items-center gap-4">
                        <Link href={`/dashboard/admin/products/edit/${p.id}`} className=" px-6 py-2 font-medium text-white bg-blue-600 rounded-2xl hover:underline">Edit</Link>
                        <Link href="#" className=" px-6 py-2 font-medium text-red-600  rounded-2xl hover:underline hover:bg-red-600 hover:text-white">Delete</Link>
                    </td>
                </tr>
            ))}
        </>
    )
}