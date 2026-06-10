import React from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
export function DataTableProducts({ data, onRefresh }) {

    const deleteProduct = async (id, name) => {
        try {
            const confirmDelete = await Swal.fire({
                icon: 'warning',
                title: `ลบ สินค้า ${name} หรือมั้ย`,
                showConfirmButton: true,
                showCancelButton: true
            })

            if (confirmDelete.isConfirmed) {
                await axios.delete(`http://localhost:8000/product/${id}`, { withCredentials: true })
                await Swal.fire({
                    icon: 'success',
                    title: "ลบสินค้าแล้ว",
                    timer: 2000,
                    showConfirmButton: false
                })
                onRefresh()
            }
        } catch (err) {
            console.log("Message:", err)
        }
    }
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
                        <button onClick={(e) => deleteProduct(p.id, p.p_name)} className=" px-6 py-2 font-medium text-red-600  rounded-2xl hover:underline hover:bg-red-600 hover:text-white">Delete</button>
                    </td>
                </tr>
            ))}
        </>
    )
}