import {  useState } from "react"

export default function FromAdd({ onClose, onComfirmPassword, data, setdata }) {
    const [isPasswordValid, setIsPasswordValid] = useState(null)
    const [isComfirmPasswordValid, setIsComfirmPasswordValid] = useState(null)
    const [passwordTwo, setPasswordTwo] = useState("")
    const isFormValid = data.password.length >= 6 && passwordTwo.length >= 6 && data.password === passwordTwo

    const handleChangePassword = (e) => {
        const { name, value } = e.target
        setdata(prev => ({ ...prev, [name]: value }))

        setIsPasswordValid(value.length >= 6 ? true : false)

        if(passwordTwo !== ""){
            setIsComfirmPasswordValid(value === passwordTwo)
        }
    }
    const checkChangePassword = (e) => {
        const {name , value} = e.target
        setPasswordTwo(value)
        if(value === ""){
            setIsComfirmPasswordValid(null)
        }else {
            setIsComfirmPasswordValid(value === data.password)
        }
    }



    return (
        <div className=" z-99 w-full h-full bg-black/60 fixed inset-0 flex justify-center items-center">
            <div className="bg-white md:w-[30%] w-[90%] md:h-auto py-8 rounded-2xl">
                <div className="px-3 flex justify-end">
                    <img src="/icons/icons8-forward-52.png" width={30} height={30} onClick={onClose} />
                </div>
                <div className="w-full h-full flex flex-col items-center gap-4">
                    <h1 className="text-center font-bold">รหัสผ่าน</h1>
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-[70%] flex flex-col gap-2">
                            <h2>รหัสผ่าน (อย่างน้อย 6 ตัว)</h2>
                            <div className="flex gap-2 relative justify-center items-center">
                                <input name="password" onChange={handleChangePassword} value={data.password  || ""} className="w-full h-13 p-3 border-2 rounded-xl" type="password" placeholder="รหัสผ่าน" required/>
                                {
                                    isPasswordValid !== null &&  (<img className=" absolute right-1 " src={isPasswordValid ? "/icons/icons8-checked-96.png" : "/icons/icons8-cross-96.png"} width={20} />) 
                                }
                            </div>
                        </div>
                        <div className="w-[70%] flex flex-col gap-2">
                            <h2>รหัสผ่าน อีกครั้ง</h2>
                            <div className="flex gap-2 relative justify-center items-center">
                                <input name="passwordTwo" onChange={checkChangePassword} className="w-full h-13 p-3 border-2 rounded-xl" type="password" placeholder="รหัสผ่าน" required/>
                                {
                                    isComfirmPasswordValid !== null &&  (<img className=" absolute right-1 " src={isComfirmPasswordValid ? "/icons/icons8-checked-96.png" : "/icons/icons8-cross-96.png"} width={20} />) 
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-4 w-[70%]">
                        <button className={`py-3 px-4 rounded-xl w-full ${isFormValid ? (`bg-[#1E3A8A] text-white`) : ("bg-gray-400 text-black")}`} type="button" disabled={!isFormValid}  onClick={onComfirmPassword}>ยืนยัน</button>
                    </div>
                </div>
            </div>
        </div>
    )
}