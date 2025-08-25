import { useState, useEffect } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";

export default function TenantDashboard() {
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("tenantToken");

  // Load products
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
  }, [loading, token]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/products", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setMessage("Product added ✅");
        setForm({ name: "", price: "", description: "" });
        setLoading(false);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding product");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 p-6  ">
        <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
          Products
        </h1>

        {/* Add Product Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 mb-8 space-y-4"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Add New Product
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
            )}
            {loading ? "Adding..." : "Add Product"}
          </button>
          {message && <p className="text-green-600 font-medium">{message}</p>}
        </form>

        {/* Products Grid */}
        {products.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
        {products.length === 0 && (
          <p className="text-gray-500 text-center mt-6">
            No products added yet. Start by adding your first product!
          </p>
        )}
      </main>
    </div>
  );
}
