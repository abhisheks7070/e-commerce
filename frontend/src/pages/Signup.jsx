import React, { useState } from 'react'
import Password from '../components/Password'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Signup = () => {

    const [verify, setVerify] = useState({ "long": false, "lc": false, "uc": false, "sc": false, "num": false, "space": false })
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [users, setUsers] = useState([])
    const [err, setErr] = useState(false)

    const navigate = useNavigate()

    const handleChange = (event) => {
        if (event.target.name == "name") {
            setName(event.target.value)
            console.log(name)
        }

        if (event.target.name == "email") {
            setUsername(event.target.value)
            console.log(username)
        }

        if (event.target.name == "password") {

            const pass = (event.target.value).trim()
            setPassword((event.target.value).trim())
            if (pass != "") {

                setVerify((values) => ({ ...values, ["long"]: ((pass.length) >= 8) ? true : false }))

                const arr = pass.split("")

                for (let i = 0; i <= arr.length - 1; i++) {
                    if (arr[i] == " ") {
                        setVerify((values) => ({ ...values, ["space"]: true }))
                        break
                    }

                    else {
                        setVerify((values) => ({ ...values, ["space"]: false }))

                    }
                }

                for (let i = 0; i <= arr.length - 1; i++) {
                    if (arr[i] == arr[i].toLowerCase() && arr[i] != "@" && arr[i] != "_" && arr[i] != "#" && hasNumber(arr[i]) == false) {
                        setVerify((values) => ({ ...values, ["lc"]: true }))
                        break
                    }

                    else {
                        setVerify((values) => ({ ...values, ["lc"]: false }))

                    }
                }

                for (let i = 0; i <= arr.length - 1; i++) {
                    if (arr[i] == arr[i].toUpperCase() && arr[i] != "@" && arr[i] != "_" && arr[i] != "#" && hasNumber(arr[i]) == false) {
                        setVerify((values) => ({ ...values, ["uc"]: true }))
                        break
                    }

                    else {
                        setVerify((values) => ({ ...values, ["uc"]: false }))

                    }
                }
                for (let i = 0; i <= arr.length - 1; i++) {
                    if (arr[i] == "@" || arr[i] == "_" || arr[i] == "#") {
                        setVerify((values) => ({ ...values, ["sc"]: true }))
                        break
                    }
                    else {
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
    }

    async function handleSubmit(event) {
        try {
            event.preventDefault()
            const response = await axios.post('https://e-commerce-be-v4ed.onrender.com/signup', { name : name, email: username, password: password })
            console.log(response.data)

        } catch (error) {
            setErr(true)
        }
    }


    return (
        <div className='flex flex-col bg-gray-800 h-[100vh] justify-center items-center'>

            <div className="flex flex-col justify-center space-y-4 p-4 max-w-sm mx-auto border-2 border-black bg-white rounded-xl">
                <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
                <input
                    name="name"
                    placeholder="Enter your name"
                    type="email"
                    onChange={handleChange}
                    className="border border-gray-900 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-black"
                />
                <input
                    name="email"
                    placeholder="Enter the username"
                    type="email"
                    onChange={handleChange}
                    className="border border-gray-900 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-black"
                />

                <input
                    name="password"
                    placeholder="Enter the password"
                    onChange={handleChange}
                    type="password"
                    className="border border-gray-900 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-black"
                />

                {verify.space === false ? (
                    <div className="flex flex-wrap gap-1">
                        <span className={`text-sm ${verify.lc ? 'text-green-500' : 'text-red-500'}`}>Lowercase,</span>
                        <span className={`text-sm ${verify.uc ? 'text-green-500' : 'text-red-500'}`}>Uppercase,</span>
                        <span className={`text-sm ${verify.sc ? 'text-green-500' : 'text-red-500'}`}>Special_Character,</span>
                        <span className={`text-sm ${verify.num ? 'text-green-500' : 'text-red-500'}`}>Number,</span>
                        <span className={`text-sm ${verify.long ? 'text-green-500' : 'text-red-500'}`}>Length</span>
                    </div>
                ) : (
                    <div className="text-red-500">No Empty spaces are allowed</div>
                )}

                {err && <div className="text-red-500">Username already exists</div>}

                <div>
                    <button
                        onClick={handleSubmit}
                        disabled={!((verify.lc && verify.uc && verify.sc && verify.long && verify.num && !!username) && verify.space === false)}
                        className={`w-full bg-blue-800 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                        Signup
                    </button>
                </div>

                <div>
                    <button
                        onClick={() => navigate('/signin')}
                        className="w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        SignIn
                    </button>
                </div>

                {/* <div className="text-gray-500 mt-2">{timer}</div> */}
            </div>
        </div>


    )
}


export default Signup