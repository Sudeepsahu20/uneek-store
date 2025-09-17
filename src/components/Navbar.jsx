import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ cartCount, user, setUser }) {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Uneek Store 🛒
      </h1>

  <ul className="flex gap-6">
  <li className="cursor-pointer" onClick={() => navigate("/")}>Home</li>
  <li className="cursor-pointer" onClick={() => navigate("/")}>Shop</li>
  {!user && <li className="cursor-pointer" onClick={() => navigate("/login")}>Login</li>}
  {!user && <li className="cursor-pointer" onClick={() => navigate("/signup")}>Signup</li>}
  {user && <li className="cursor-pointer" onClick={() => navigate("/orders")}>My Orders</li>}
</ul>

      {user && (
        <button
          className="ml-4 bg-red-500 px-3 py-1 rounded"
          onClick={() => {
            localStorage.removeItem("user");
            setUser(null);
            navigate("/");
          }}
        >
          Logout
        </button>
      )}

      <button
        onClick={() => navigate("/cart")}
        className="relative bg-blue-500 px-4 py-2 rounded flex items-center gap-2"
      >
        <span className="text-lg">🛒</span>
        <span>Cart</span>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {cartCount}
        </span>
      </button>
    </nav>
  );
}

export default Navbar;

