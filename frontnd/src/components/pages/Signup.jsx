import React, { useState } from 'react'
import validator from 'validator'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: ""
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.username || !formData.password) {
            return enqueueSnackbar("Username, email, and password are required", { variant: 'error' })
        }
        if (!validator.isEmail(formData.email)) {
            return enqueueSnackbar("Invalid email format", { variant: 'error' })
        }
        if (!validator.isAlphanumeric(formData.username)) {
            return enqueueSnackbar("Username must be alphanumeric", { variant: 'error' })
        }
        if (!validator.isStrongPassword(formData.password)) {
            return enqueueSnackbar("Use a stronger password", { variant: 'error' })
        }
        try {
            const user = await axios.post("http://localhost:5000/login",  formData )
            if (!user) {
                return enqueueSnackbar("Unable to create new user", { variant: 'error' })
            }
            setFormData({ email: "", username: "", password: "" });
            enqueueSnackbar("User created successfully", { variant: 'success' });
            navigate("/quizes",{state : {username : formData.username}})
        }
        catch (error) {
            console.log("Error:", error);
            return enqueueSnackbar("Server error", { variant: 'error' })
        }
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Sign Up</h2>
                <p className="text-gray-600 text-center mb-6">Signup your details here</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email here.."
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username here.."
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password here.."
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>

    )
}

export default Signup
