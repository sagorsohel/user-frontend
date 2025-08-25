import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function SidebarLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Scrollable main content */}
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <Outlet />
      </main>
    </div>
  );
}
