import React, { useState } from "react"
import axios from "../../services/axiosInstance"
import { useNavigate } from "react-router-dom"

export default function BuyerRegister() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [otp, setOtp] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [emailVerified, setEmailVerified] = useState(false)
    const [loading, setLoading] = useState(false)

    // Handle Input Change
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    // Send OTP
    const handleSendOtp = async (e) => {
        e.preventDefault()

        if (!formData.email) {
            return alert("Enter email first")
        }

        try {
            setLoading(true)

            const res = await axios.post("/buyer/send-otp", {
                email: formData.email
            })

            if (res.data.message) {
                alert(res.data.message)
                setOtpSent(true)
            }

        } catch (err) {
            alert(err.response?.data?.message || "OTP sending failed")
        } finally {
            setLoading(false)
        }
    }

    // Verify OTP
    const handleVerifyOtp = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const res = await axios.post("/buyer/verify-otp", {
                email: formData.email,
                otp
            })

            if (res.data.message) {
                alert(res.data.message)
                setEmailVerified(true)
                setOtpSent(false)
            }

        } catch (err) {
            alert(err.response?.data?.message || "OTP verification failed")
        } finally {
            setLoading(false)
        }
    }

    // Final Register
    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const res = await axios.post("/buyer/register", formData)

            if (res.data.message) {
                alert(res.data.message)
                navigate("/buyer/login")
            }

        } catch (err) {
            alert(err.response?.data?.message || "Registration failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Buyer Registration</h2>

            <form>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                /><br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                />

                <button disabled={loading} onClick={handleSendOtp}>
                    {loading ? "Sending..." : "Send OTP"}
                </button>

                <br /><br />

                {otpSent && (
                    <div>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        <button disabled={loading} onClick={handleVerifyOtp}>
                            Verify OTP
                        </button>

                        <br /><br />
                    </div>
                )}

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                /><br /><br />

                <button
                    disabled={!emailVerified || loading}
                    onClick={handleRegister}
                >
                    Register
                </button>

            </form>
        </div>
    )
}