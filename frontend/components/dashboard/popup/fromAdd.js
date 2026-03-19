import { useState } from "react"

export default function FromAdd({onClose, handleChangePassword}) {
    const [isPassword, setIsPassword] = useState(undefined)
    return (
        <div className=" z-99 w-full h-full bg-black/60 fixed inset-0 flex justify-center items-center">
            <div className="bg-white md:w-[30%] w-[90%] md:h-[40%] h-[45%] rounded-2xl">
                <div className="px-3 py-4 flex justify-end">
                    <img src="/icons/icons8-forward-52.png" width={30} height={30} onClick={onClose}/>
                </div>
                <div className="w-full h-full flex flex-col items-center">
                    <h1 className="text-center font-bold">เพิ่มผู้ใช้งาน</h1>
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-[50%] flex flex-col gap-2">
                            <h2>รหัสผ่าน</h2>
                            <div className="flex gap-2 relative justify-center items-center">
                                <input name="password" onChange={handleChangePassword}  className="w-full h-10 p-3 border-2 rounded-xl" type="password" placeholder="รหัสผ่าน"/>
                                {

                                }
                            </div>
                        </div>
                        <div className="w-[50%] flex flex-col gap-2">
                            <h2>รหัสผ่าน อีกครั้ง</h2>
                            <div className="flex gap-2 relative justify-center items-center">
                                <input name="password"   className="w-full h-10 p-3 border-2 rounded-xl" type="password" placeholder="รหัสผ่าน"/>
                                <img className=" absolute right-1 " src="/icons/icons8-checked-96.png" width={20} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                        <button className="bg-[#1E3A8A] py-3 px-4 rounded-xl text-white">ยืนยัน</button>
                    </div>
                </div>
            </div>
        </div>
    )
}