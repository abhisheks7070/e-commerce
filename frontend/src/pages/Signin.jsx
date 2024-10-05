import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
// import Main from './Main'

const Signin = () => {

    const [login, setLogin] = useState({ "email": "as@gmail.com", "password": "Abhishek@9" })
    const [err, setErr] = useState(false)
    const navigate = useNavigate()

    function handleChange(e) {
        const name = e.target.name
        const value = (e.target.value)
        setLogin((prev) => ({ ...prev, [name]: value }))
        setErr(false)
    }

    async function handleSubmit(event) {
        event.preventDefault()

        try {

            const response = await axios.post('https://e-commerce-be-v4ed.onrender.com/signin', login);
            console.log(response.data);
            localStorage.setItem("token", response.data)
            if (response.status == 200) {
                navigate("/home")
            }
        } catch (error) {
            setErr(true)
        }

    }



    return (

            <div className="flex justify-center items-center h-screen bg-gray-800">
                <form
                    action="submit"
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
                >
                    <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="text"
                            value={login.email}
                            name="email"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            value={login.password}
                            name="password"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black"
                            placeholder="Enter your password"
                        />
                    </div>
                    {err == true && <div className='mb-2 text-red-600'>Incorrect Email or Password</div>}

                    <input
                        type="submit"
                        value="Login"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    />
                    <input
                        type="button"
                        value="Signup"
                        className="mt-3 w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                        onClick={() => { navigate('/') }}
                    />
                </form>
            </div>

    )
}

export default Signin