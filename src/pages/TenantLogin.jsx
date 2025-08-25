import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function TenantLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // auto-detect subdomain
  const subdomain = window.location.hostname.split(".")[0];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/tenant/login", { ...form, subdomain });
      console.log(res)
      if (res.data.success) {
        localStorage.setItem("tenantToken", res.data.token);
        localStorage.setItem("tenantId", res.data.tenant._id);
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
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
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="p-2 border rounded w-full mb-2"
        />
        <button className="bg-blue-600 text-white py-2 rounded w-full">Login</button>
        {message && <p className="mt-2 text-red-600">{message}</p>}
      </form>
    </div>
  );
}
