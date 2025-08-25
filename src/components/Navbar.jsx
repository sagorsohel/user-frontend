import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api"; // axios instance with baseURL

export default function Navbar() {
  const navigate = useNavigate();
  const subdomain = window.location.hostname.split(".")[0];
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

  // const handleLogout = () => {
  //   localStorage.removeItem("tenantToken");
  //   localStorage.removeItem("tenantId");
  //   navigate("/");
  // };

  return (
    <nav
      className={`px-6 py-4 flex justify-between items-center`}
      style={{ backgroundColor: theme.colors?.navbar || "blue" }}
    >
      <div className="font-bold text-xl text-white">{subdomain} Shop</div>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:text-gray-200">
          Home
        </Link>

        {/* {token && (
          <Link to="/dashboard" className="hover:text-gray-200">
            Dashboard
          </Link>
        )}
        {token && (
          <Link to="/theme" className="hover:text-gray-200">
            Theme Control
          </Link>
        )}
        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        )} */}
      </div>
    </nav>
  );
}
