import { BrowserRouter, Routes, Route } from "react-router-dom";

import TenantLogin from "./pages/TenantLogin";
import TenantDashboard from "./pages/TenantDashboard";
import Home from "./pages/Home";
import ThemeController from "./pages/ThemeControlPage";
import Layout from "./layout/layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap all pages inside Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<TenantLogin />} />
          <Route path="/dashboard" element={<TenantDashboard />} />
          <Route path="/theme" element={<ThemeController />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

