import { BrowserRouter, Routes, Route } from "react-router-dom";

import TenantLogin from "./pages/TenantLogin";
import TenantDashboard from "./pages/TenantDashboard";
import Home from "./pages/Home";
import ThemeController from "./pages/ThemeControlPage";
import Layout from "./layout/layout";
import SidebarLayout from "./layout/SidebarLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout only for Home & Login */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<TenantLogin />} />
        </Route>

        {/* Sidebar layout for dashboard pages */}
        <Route element={<SidebarLayout />}>
          <Route path="/products" element={<TenantDashboard />} />
          <Route path="/theme" element={<ThemeController />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
