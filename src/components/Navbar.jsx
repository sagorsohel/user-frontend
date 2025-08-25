import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const subdomain = window.location.hostname.split(".")[0];
  const token = localStorage.getItem("tenantToken"); // check if logged in

  const handleLogout = () => {
    localStorage.removeItem("tenantToken");
    localStorage.removeItem("tenantId");
    navigate("/"); // navigate to home page
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="font-bold text-xl">{subdomain} Shop</div>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:text-gray-200">
          Home
        </Link>
       
        {token && (
          <Link to="/dashboard" className="hover:text-gray-200">
            Dashboard
          </Link>
        )}
        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
