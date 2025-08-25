// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center mt-10">
      &copy; {new Date().getFullYear()} My Multi-Tenant E-commerce. All rights reserved.
    </footer>
  );
}
