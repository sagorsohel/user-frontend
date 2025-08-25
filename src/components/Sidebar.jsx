import { NavLink } from "react-router-dom";
import { LayoutDashboard, Palette } from "lucide-react"; // icons from lucide-react (shadcn uses it)

export default function Sidebar() {
  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/theme", label: "Theme Control", icon: <Palette size={18} /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Tenant Panel</h2>
      <nav className="flex flex-col gap-2">
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
    </aside>
  );
}
