// src/components/ProductCard.jsx
export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="mt-2 font-semibold">${product.price}</p>
    </div>
  );
}
