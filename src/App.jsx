import { BrowserRouter, Routes, Route } from "react-router-dom";
import TenantLogin from "./pages/TenantLogin";
import TenantDashboard from "./pages/TenantDashboard";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<TenantLogin />} />
        <Route path="/dashboard" element={<TenantDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
