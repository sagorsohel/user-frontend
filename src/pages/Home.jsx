import { useEffect, useState } from "react";
import api from "../api"; // axios instance with baseURL

export default function Home() {
  const hostname = window.location.hostname; // e.g. sohel.user-frontend-lemon.vercel.app
  const tenantSubdomain = hostname.split(".")[0]; // 'sohel', 'sagor', etc.

  const [tenant, setTenant] = useState(null);
  const [tenantId, setTenantId] = useState(null);
  const [products, setProducts] = useState([]);
  const [theme, setTheme] = useState(null);

  // Fetch tenant info
  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const { data } = await api.get(`/tenant/${tenantSubdomain}`);
        if (data.success) {
          setTenant(data.tenant);
          setTenantId(data.tenant?._id);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchTenant();
  }, [tenantSubdomain]);

  // Fetch theme
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const { data } = await api.get(`/theme/public/${tenantSubdomain}`);
        if (data.success) setTheme(data.theme);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTheme();
  }, [tenantSubdomain]);

  // Fetch products
  useEffect(() => {
    if (!tenantId) return;
    const fetchProducts = async () => {
      try {
        const { data } = await api.get(`/products/public/${tenantId}`);
        if (data.success) setProducts(data.products);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [tenantId]);

  // Theme styles
  const cardClass = theme?.cardStyle === "rounded" ? "rounded-lg" : "rounded-none";
  const productGridClass =
    theme?.productView === "list"
      ? "flex flex-col gap-4"
      : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";
  const cardBg = theme?.colors?.secondary || "white";
  const cardText = theme?.colors?.primary || "black";

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-5xl font-bold mb-4" style={{ color: cardText }}>
          {tenant ? `${tenant.name} Shop` : `${tenantSubdomain}'s Online Store`}
        </h1>
        <p className="text-lg mb-6 text-center" style={{ color: cardText }}>
          Welcome to your online store! Manage products, showcase your shop, and grow your business.
        </p>

        <div className="mt-10 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: cardText }}>
            Products
          </h2>
          {products.length > 0 ? (
            <div className={productGridClass}>
              {products.map((product) => (
                <div
                  key={product._id}
                  className={`shadow-md p-4 hover:shadow-lg transition ${cardClass}`}
                  style={{ backgroundColor: cardBg, color: cardText }}
                >
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="font-semibold mt-2">${product.price}</p>
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
