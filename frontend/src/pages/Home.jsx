import React, { useEffect, useState, useContext } from "react"
import API from "../services/axiosInstance"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Home() {

  const [products, setProducts] = useState([])
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product/all-products")
      setProducts(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddToCart = async (productId) => {

    if (!user) {
      alert("Please login first")
      navigate("/login")
      return
    }

    if (user.role !== "buyer") {
      alert("Only buyers can add to cart")
      return
    }

    try {

      await API.post("/cart/add", {
        productId,
        quantity: 1
      })

      alert("Product added to cart")

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>

      <h2>All Products</h2>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px"
      }}>

        {products.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              width: "200px"
            }}
          >

            {p.images?.length > 0 && (
              <img
                src={`http://localhost:2000/api/products/image/${p.images[0]}`}
                alt={p.name}
                width="180"
              />
            )}

            <h4>{p.name}</h4>

            <p>{p.description}</p>

            <p>₹{p.price}</p>

            <button onClick={() => handleAddToCart(p._id)}>
              Add To Cart
            </button>

          </div>
        ))}

      </div>

    </div>
  )
}