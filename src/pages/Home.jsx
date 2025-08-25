// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const subdomain = window.location.hostname.split(".")[0];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center bg-blue-50 p-6">
        <h1 className="text-5xl font-bold mb-4">{subdomain} Shop</h1>
        <p className="text-lg mb-6 text-center">Welcome to your online store! Manage products, showcase your shop, and grow your business.</p>
       
      </main>
      <Footer />
    </div>
  );
}
