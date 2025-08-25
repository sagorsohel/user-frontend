import { useEffect, useState } from "react";
import api from "../api"; // axios instance with baseURL

export default function Home() {
  const subdomain = window.location.hostname.split(".")[0];
  const [tenant, setTenant] = useState(null);
  const [tenantId, setTenantId] = useState(null);
  const [products, setProducts] = useState([]);

  // 🔹 Fetch Tenant Info
  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const { data } = await api.get(`/tenant/${subdomain}`);
        if (data.success) {
          setTenant(data.tenant);
          setTenantId(data.tenant?._id);
        } else {
          setTenant(null);
          setTenantId(null);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchTenant();
  }, [subdomain]);

  // 🔹 Fetch Products when tenantId is available
  useEffect(() => {
    if (!tenantId) return;

    const fetchProducts = async () => {
      try {
        const { data } = await api.get(`/products/public/${tenantId}`);
        if (data.success) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [tenantId]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center bg-blue-50 p-6">
        <h1 className="text-5xl font-bold mb-4">
          {tenant ? `${tenant.name} Shop` : `${subdomain}'s Online Store`}
        </h1>
        <p className="text-lg mb-6 text-center">
          Welcome to your online store! Manage products, showcase your shop, and grow your business.
        </p>

        {/* Products Section */}
        <div className="mt-10 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-blue-600 font-semibold mt-2">
                    ${product.price}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products available yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}
