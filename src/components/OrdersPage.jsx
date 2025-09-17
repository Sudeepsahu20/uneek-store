import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrdersPage({ user }) {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <section className="py-8 px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Orders 📦</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders placed yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Order ID: {order.id}</h3>
              <p className="text-sm text-gray-600">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
              <p className="mt-1"><strong>Name:</strong> {order.name}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <div className="mt-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 font-bold">Total: ₹{order.total}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
