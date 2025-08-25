import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
//   const [tenant, setTenant] = useState(null);
  const [products, setProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("tenantToken");
   const [theme, setTheme] = useState({
    colors: {
      navbar: "blue",
      footer: "gray",
      primary: "blue",
      secondary: "green",
    },
  });
  useEffect(() => {
    const fetchActiveTheme = async () => {
      if (!token) return;

      try {
        const res = await api.get("/theme/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Pick the tenant's active theme
        const active = res.data.themes.find((t) => t.isActive);

        if (active) setTheme(active);
      } catch (err) {
        console.error("Failed to fetch active theme:", err);
      }
    };

    fetchActiveTheme();
  }, [token]);


  useEffect(() => {
      const token = localStorage.getItem("tenantToken");
    setLoading(true)
    const loadProducts = async () => {
      try {
        const res = await api.get("/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res?.data?.products || []);
        setLoading(false)
      } catch (err) {
        console.log(err);
        setLoading(false)
      }
    };
    loadProducts();
    setLoading(false)
  }, [loading]);


  console.log(theme)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tenant Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Products Card */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-4xl font-bold text-blue-600">{products?.length}</p>
        </div>

        {/* Current Theme Card */}
        <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-2">Current Theme</h2>
          <p className="text-2xl font-bold text-green-600">
            {theme?.name || "Default Theme"}
          </p>
        </div>
      </div>
    </div>
  );
}
