import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Shop from "./components/Shop";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import OrdersPage from "./components/OrdersPage";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import HomeCategories from "./components/HomeCategories";

function App() {
  const navigate = useNavigate(); // Now this works
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart") || "[]"));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [toast, setToast] = useState(null);

  const cartCount = cart.reduce((s, item) => s + item.quantity, 0);

  const addToCart = (product) => {
    if (!user) return alert("Please login to add products to cart!");
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      return [...prev, { ...product, quantity: 1 }];
    });
    setToast(`${product.name} added to cart ✅`);
    setTimeout(() => setToast(null), 2000);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQuantity = (id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item).filter(item => item.quantity > 0));
  const clearCart = () => setCart([]);

  const proceedToCheckout = () => navigate("/checkout");

  return (
    <>
      <Navbar cartCount={cartCount} user={user} setUser={setUser} />
      <Routes>
          <Route path="/" element={<><Hero /><HomeCategories /></>} />
          <Route path="/shop/:category" element={<Shop addToCart={addToCart} user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} clearCart={clearCart} proceedToCheckout={proceedToCheckout} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} clearCart={clearCart} />} />
        <Route path="/orders" element={<OrdersPage user={user} />} />
      </Routes>

      {toast && <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg">{toast}</div>}
    </>
  );
}

export default App;
