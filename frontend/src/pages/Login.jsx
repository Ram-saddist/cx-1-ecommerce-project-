import React, { useState, useContext } from 'react'
import axios from '../services/axiosInstance.jsx'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
export default function Login() {
  const { login } = useContext(AuthContext)
  const navigate=useNavigate()
  const [loginFormData, setLoginFormData] = useState({
    email: "", password: ""
  })

  function handleChange(e) {
    setLoginFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  function handleLogin(e) {
    e.preventDefault()
    alert()
    axios.post("/seller/login", loginFormData)
      .then((res) => {
         alert("Login Successful")
         console.log(res)
        login(res.data)
       
        navigate("/")
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            name='email'
            placeholder='Enter email'
            onChange={handleChange} />
        </div>
        <div>
          <input
            type="password"
            name='password'
            placeholder='Enter password'
            onChange={handleChange} />
        </div>
        <button>Login</button>
      </form>
    </div>
  )
}
