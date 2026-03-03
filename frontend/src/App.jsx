import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navigation from "./pages/Navigation.jsx"
import ProtectedRoute from "./pages/ProtectedRoutes.jsx"
import RegisterSelection from "./pages/auth/RegisterSelection"
import LoginSelection from "./pages/auth/LoginSelection"
import SellerRegister from "./pages/Seller/SellerRegister"
import SellerLogin from "./pages/Seller/SellerLogin"
import SellerDashboard from "./pages/Seller/Sellerdashboard"
import AddProduct from "./pages/Seller/AddProduct"
import BuyerRegister from "./pages/Buyer/BuyerRegister"
import BuyerLogin from "./pages/Buyer/BuyerLogin"

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/register" element={<RegisterSelection />} />
        <Route path="/login" element={<LoginSelection />} />
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/seller/login" element={<SellerLogin />} />

        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute roles={["seller"]}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller/add-product"
          element={
            <ProtectedRoute roles={["seller"]}>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route path="/buyer/register" element={<BuyerRegister />} />
        <Route path="/buyer/login" element={<BuyerLogin />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App