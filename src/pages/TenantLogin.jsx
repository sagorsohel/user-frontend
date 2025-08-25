import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function TenantLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // loading state
  const navigate = useNavigate();

  const subdomain = window.location.hostname.split(".")[0];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    setMessage(""); // clear previous message
    try {
      const res = await api.post("/tenant/login", { ...form, subdomain });
      if (res.data.success) {
        localStorage.setItem("tenantToken", res.data.token);
        localStorage.setItem("tenantId", res.data.tenant._id);
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded w-96">
        <h1 className="text-xl font-bold mb-4">Tenant Login ({subdomain})</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-2 border rounded w-full mb-2"
          disabled={loading}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="p-2 border rounded w-full mb-2"
          disabled={loading}
        />

        <button
          className={`w-full py-2 rounded text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && <p className="mt-2 text-red-600">{message}</p>}
      </form>
    </div>
  );
}
