import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LayoutDashboard, Palette, Home, LogOut } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/products", label: "Products", icon: <LayoutDashboard size={18} /> },
    { to: "/theme", label: "Theme Control", icon: <Palette size={18} /> },
  ];

  const subdomain = window.location.hostname.split(".")[0];

  // 🔹 Check if tenant is logged in
  useEffect(() => {
    const token = localStorage.getItem("tenantToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("tenantToken");
    localStorage.removeItem("tenantId");
    navigate("/login"); // redirect to login
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">{subdomain}</h2>

      {/* Nav links */}
      <nav className="flex flex-col gap-2 flex-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors 
            ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <Home size={18} />
          Home
        </NavLink>

        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors 
              ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
