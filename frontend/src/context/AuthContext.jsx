import { useState, useEffect } from "react"
import { createContext } from "react"

export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    useEffect(() => {
        let storedUser = localStorage.getItem("user")
        let storeToken = localStorage.getItem("token")
        if (storeToken && storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])
    const [user, setUser] = useState("")
    function login(data) {
        setUser(data.seller)
        localStorage.setItem("token", data.accessToken)
        localStorage.setItem("user", JSON.stringify(data.seller))
    }
    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")

        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}