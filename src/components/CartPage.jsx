import React from "react";

function CartPage({ cart, removeFromCart, updateQuantity, proceedToCheckout, clearCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="py-8 px-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart 🛍️</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Go add some awesome tees!</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border p-4 rounded shadow">
              <div className="w-28 h-28 flex items-center justify-center bg-gray-100 rounded">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price} each</p>

                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 border rounded">-</button>
                  <div className="px-3">{item.quantity}</div>
                  <button onClick={() => updateQuantity(item.id, +1)} className="px-3 py-1 border rounded">+</button>
                  <button onClick={() => removeFromCart(item.id)} className="ml-4 text-red-500 font-semibold">Remove</button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}

          <div className="text-right mt-4">
            <h3 className="text-xl font-bold">Total: ₹{total}</h3>

            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={proceedToCheckout}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to clear the cart?")) {
                    clearCart();
                  }
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CartPage;
