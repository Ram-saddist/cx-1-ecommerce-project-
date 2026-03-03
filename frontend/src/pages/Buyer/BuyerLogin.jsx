import React, { useState, useContext } from "react"
import axios from "../../services/axiosInstance"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function BuyerLogin() {

    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)

    // Handle input
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    // Login
    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const res = await axios.post("/buyer/login", formData)

            if (res.data.token) {

                // Save token
                localStorage.setItem("token", res.data.token)

                // Save user in context
                setUser(res.data.user)

                alert("Login Successful")

                navigate("/buyer/home")
            }

        } catch (err) {
            alert(err.response?.data?.message || "Login Failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
            <h2>Buyer Login</h2>

            <form>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                /><br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                /><br /><br />

                <button disabled={loading} onClick={handleLogin}>
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>
        </div>
    )
}