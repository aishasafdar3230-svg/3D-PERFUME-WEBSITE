import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  function handleAddToCart(item) {
    setCart((prev) => {
      const existing = prev.find((p) => p.name === item.name);
      if (existing) {
        return prev.map((p) =>
          p.name === item.name ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function handleUpdateQty(name, delta) {
    setCart((prev) =>
      prev
        .map((p) => (p.name === name ? { ...p, qty: p.qty + delta } : p))
        .filter((p) => p.qty > 0)
    );
  }

  function handleRemove(name) {
    setCart((prev) => prev.filter((p) => p.name !== name));
  }

  function handleCheckout() {
    setCart([]);
  }

  const cartCount = cart.reduce((sum, p) => sum + p.qty, 0);

  return (
    <div className="app">
      <ScrollToTop />
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage onAddToCart={handleAddToCart} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              onUpdateQty={handleUpdateQty}
              onRemove={handleRemove}
              onCheckout={handleCheckout}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
