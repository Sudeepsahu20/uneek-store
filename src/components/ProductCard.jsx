import React from 'react';


export default function ProductCard({ product,addToCart }) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-xl transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-58 object-contain rounded-md mb-4 bg-gray-100"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 mb-2">₹{product.price}</p>
      <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800" onClick={()=>addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
