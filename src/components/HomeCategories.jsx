import React from "react";
import { Link } from "react-router-dom";

export default function HomeCategories() {
  const categories = [
    { name: "Mugs", image: "/images/Mug.jpeg", path: "mugs" },
    { name: "Tote Bags", image: "/images/toteBag1.jpeg", path: "tote-bags" },
    { name: "Sippers", image: "/images/sipper1.jpeg", path: "sippers" },
    { name: "Keychains", image: "/images/keyChain.jpeg", path: "keychains" },
    { name: "T-Shirts", image: "/images/Oversized.webp", path: "t-shirts" },
    { name: "Mousepads", image: "/images/mousepad.jpeg", path: "mousepads" },
  ];

return (
  <section className="py-12 px-6">
    <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {categories.map((cat) => (
        <Link key={cat.path} to={`/shop/${cat.path}`}>
          <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
            {/* Image full area cover kare */}
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="w-full h-58 object-contain rounded-md mb-4 bg-gray-100" 
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold">{cat.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

}
