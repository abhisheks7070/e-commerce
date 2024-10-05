import React, { useState } from 'react'
const Password = () => {


    const [verify, setVerify] = useState({ "long": false, "lc": false, "uc": false, "sc": false, "num": false, "space": false })


    const handleChange = (event) => {
        const pass = (event.target.value).trim()
        if (pass != "") {

            setVerify((values) => ({ ...values, ["long"]: ((pass.length) >= 8) ? true : false }))

            const arr = pass.split("")

            for (let i = 0; i <= arr.length - 1; i++) {
                if (arr[i]==" ") {
                    setVerify((values) => ({ ...values, ["space"]: true }))
                    break
                }

                else{
                    setVerify((values) => ({ ...values, ["space"]: false }))

                }
            }

            for (let i = 0; i <= arr.length - 1; i++) {
                if (arr[i] == arr[i].toLowerCase() && arr[i] != "@" && arr[i] != "_" && arr[i] != "#" && hasNumber(arr[i])==false) {
                    setVerify((values) => ({ ...values, ["lc"]: true }))
                    break
                }

                else{
                    setVerify((values) => ({ ...values, ["lc"]: false }))

                }
            }

            for (let i = 0; i <= arr.length - 1; i++) {
                if (arr[i] == arr[i].toUpperCase() && arr[i] != "@" && arr[i] != "_" && arr[i] != "#" && hasNumber(arr[i])==false) {
                    setVerify((values) => ({ ...values, ["uc"]: true }))
                    break
                }

                else{
                    setVerify((values) => ({ ...values, ["uc"]: false }))

                }
            }
            for (let i = 0; i <= arr.length - 1; i++) {
                if (arr[i] == "@" || arr[i] == "_" || arr[i] == "#") {
                    setVerify((values) => ({ ...values, ["sc"]: true }))
                    break
                }
                else{
                    setVerify((values) => ({ ...values, ["sc"]: false }))

                }
            }
            
            function hasNumber(str) {
                return /[0-9]/.test(str);
            }
            
            
            setVerify((values) => ({ ...values, ["num"]: hasNumber(pass) ? true : false }))
        

        }


        else {
            setVerify({ "long": false, "lc": false, "uc": false, "sc": false })
        }
    }


    return (
        <>
            <div className='mt-4 flex flex-col gap-2 justify-center items-center'>
                <input className='border-black border-2 rounded-lg w-[30vw] h-16 placeholder:px-2 text-2xl px-2' placeholder='Enter the password' onChange={handleChange} type="text" name="" id="" />
                {
                verify.space == false ? <div className='flex w-[29vw] justify-between font-extrabold text-lg'>
                    <span className={`${verify.lc == true ? "text-green-700" : "text-red-700"}`}>Lowercase</span>
                    <span className={`${verify.uc == true ? "text-green-700" : "text-red-700"}`}>Uppercase</span>
                    <span className={`${verify.sc == true ? "text-green-700" : "text-red-700"}`}>Special_character</span>
                    <span className={`${verify.num == true ? "text-green-700" : "text-red-700"}`}>Number</span>
                    <span className={`${verify.long == true ? "text-green-700" : "text-red-700"}`}>length</span>
                </div> : <div>No Empty space are allowed</div>

                }
                <div className='mt-8 text-xl font-bold'>
                    Your password is {(verify.lc && verify.uc && verify.sc && verify.long == true && verify.num == true && verify.space==false) ? "VALID" : "INVALID"}
                </div>
            </div>
        </>
    )
}

export default Password