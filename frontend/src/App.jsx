import React from 'react'
import Register from "./pages/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import  ProtectedRoutes,{Unauthorized} from './pages/ProtectedRoutes'
import SellerDashboard from './pages/Sellerdashboard.jsx'
import Navigation from './pages/Navigation.jsx'
export default function App() {
  return (
    <BrowserRouter>
    <Navigation/>
    <Routes>
       <Route path="/register" element={<Register/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path='/seller/dashboard' element={
        <ProtectedRoutes allowedRole="seller">
        <SellerDashboard/>
       </ProtectedRoutes>}/>
       <Route path='/unauthorized' element={<Unauthorized/>}/>
    </Routes>
    </BrowserRouter>
  )
}