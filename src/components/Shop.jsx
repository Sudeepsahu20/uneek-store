import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import products from "../data/products";

export default function Shop({ addToCart, user }) {
  const { category } = useParams(); // route se category mil rahi hai

  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please login to add products to cart!");
      return;
    }
    addToCart(product);
  };

  // Agar category match nahi karta to sab dikhao
  const filteredProducts = category
    ? products.filter((item) => item.category.toLowerCase().replace(" ", "-") === category)
    : products;

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        {category ? category.toUpperCase() : "Our Collection"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            addToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
