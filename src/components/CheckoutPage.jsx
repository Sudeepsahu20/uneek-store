import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutPage({ cart, clearCart }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const backToCart = () => {
    navigate("/cart"); 
  };
  const backToShop = () => {
    navigate("/");
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if (!name.trim() || !address.trim() || !phone.trim()) {
      alert("Please fill all shipping details.");
      return;
    }

    const newOrder = {
      id: "ORD-" + Date.now(),
      name,
      address,
      phone,
      items: cart,
      total,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([newOrder, ...existing]));

    setOrderId(newOrder.id);
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <section className="py-8 px-6 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Order Placed Successfully ✅</h2>
        <p className="mb-2">Order ID: <span className="font-mono">{orderId}</span></p>
        <p className="mb-4">We saved the order in your browser (demo). Backend will come later.</p>
        <button
          onClick={backToShop}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Back to Shop
        </button>
      </section>
    );
  }

  return (
    <section className="py-8 px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={placeOrder} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Shipping Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Place Order (Fake)
            </button>
            <button type="button" onClick={backToCart} className="px-4 py-2 border rounded hover:bg-gray-100 transition">
              Back to Cart
            </button>
          </div>
        </form>

        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-3">Order Summary</h3>
          {cart.length === 0 ? (
            <p className="text-gray-600">No items in cart.</p>
          ) : (
            <div className="space-y-3">
              {cart.map((it) => (
                <div key={it.id} className="flex justify-between">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-600">Qty: {it.quantity}</div>
                  </div>
                  <div className="font-semibold">₹{it.price * it.quantity}</div>
                </div>
              ))}
              <div className="border-t pt-3 text-right">
                <div className="font-bold">Total: ₹{total}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;
