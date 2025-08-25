// src/pages/TenantDashboard.jsx
import { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

export default function TenantDashboard() {
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [loading,setLoading]=useState(false)
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("tenantToken");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await api.get("/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res?.data?.products || []);
      } catch (err) {
        console.log(err);
      }
    };
    loadProducts();
  }, [loading,token]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await api.post("/products", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setMessage("Product added ✅");
        setForm({ name: "", price: "", description: "" });
        // fetchProducts();
        setLoading(false)
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding product");
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <form onSubmit={handleSubmit} className="grid gap-2 mb-6">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="p-2 border rounded"
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-2 border rounded"
          />
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded"
          >
            Add Product
          </button>
          {message && <p className="text-blue-600 mt-2">{message}</p>}
        </form>

        {products.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-2">Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
