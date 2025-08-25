import { useEffect, useState } from "react";
import api from "../api"; // axios instance with baseURL

export default function ThemeController() {
  const [themes, setThemes] = useState([]);
  const [activeTheme, setActiveTheme] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("tenantToken");

  // Load all themes & current tenant theme
  useEffect(() => {
    setLoading(true);
    const loadThemes = async () => {
      try {
        // Get all themes
        const resThemes = await api.get("/theme/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const allThemes = resThemes.data.themes;
        if (!allThemes?.length) {
          setThemes([]);
          setLoading(false);
          return;
        }

        setThemes(allThemes);

        // Find the tenant's active theme
        const active = allThemes.find((t) => t.isActive) || allThemes[0];
        setActiveTheme(active);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
      setLoading(false);
    };

    loadThemes();
  }, [token]);

  // Select a theme and update isActive in DB
  const handleThemeSelect = async (themeId) => {
    try {
      const res = await api.post(
        "/theme/select",
        { themeId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update activeTheme locally
      const updatedTheme = res.data.theme;
      setActiveTheme(updatedTheme);

      // Update themes array to reflect isActive
      setThemes((prev) =>
        prev.map((t) => ({
          ...t,
          isActive: t._id === updatedTheme._id,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

    if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }
  if (!themes.length) {
    return <p className="p-6 text-gray-500">No themes available</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Select Your Theme</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        {themes.map((theme) => (
          <div key={theme._id} className="p-4 border rounded w-60 relative">
            <p className="font-semibold text-lg">{theme.name}</p>

            {/* Show theme colors */}
            <div className="flex gap-1 mt-2">
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: theme.colors?.navbar }}
                title="Navbar color"
              ></div>
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: theme.colors?.footer }}
                title="Footer color"
              ></div>
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: theme.colors?.primary }}
                title="Primary color"
              ></div>
              <div
                className="w-6 h-6 rounded"
                style={{ backgroundColor: theme.colors?.secondary }}
                title="Secondary color"
              ></div>
            </div>

            {/* Show theme options */}
            <div className="mt-2 text-sm">
              <p>Sticky Header: {theme.stickyHeader ? "Yes" : "No"}</p>
              <p>Product View: {theme.productView}</p>
              <p>Card Style: {theme.cardStyle}</p>
            </div>

            {/* Active button */}
            <button
              className={`mt-3 w-full py-2 rounded text-white ${
                theme.isActive ? "bg-green-600" : "bg-gray-500"
              }`}
              onClick={() => handleThemeSelect(theme._id)}
            >
              {theme.isActive ? "Active" : "Set Active"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
