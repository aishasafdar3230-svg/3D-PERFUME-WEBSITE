import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function CartPage({ cart, onUpdateQty, onRemove, onCheckout }) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = cart.length === 0 ? 0 : subtotal >= 5000 ? 0 : 200;
  const total = subtotal + shipping;

  function handleCheckout() {
    onCheckout();
    setOrderPlaced(true);
  }

  return (
    <>
      <section className="cart-page" id="cart">
      <div className="cart-page-inner">
        {orderPlaced ? (
          <div className="cart-page-empty cart-thank-you">
            <span className="section-eyebrow">Order Confirmed</span>
            <h1 className="section-title">Thank You for Your Shopping!</h1>
            <p>Your order has been placed successfully.</p>
            <Link to="/shop" className="cart-page-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <span className="section-eyebrow">Your Order</span>
            <h1 className="section-title">Shopping Bag</h1>

            {cart.length === 0 ? (
              <div className="cart-page-empty">
                <p>Your bag is empty.</p>
                <Link to="/shop" className="cart-page-btn">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="cart-page-layout">
                <ul className="cart-page-items">
                  {cart.map((item) => (
                    <li key={item.name} className="cart-page-item">
                      <img src={item.img} alt={item.name} />
                      <div className="cart-page-item-info">
                        <h3>{item.name}</h3>
                        <p className="cart-page-item-price">
                          Rs. {item.price.toLocaleString()}
                        </p>
                        <div className="cart-qty">
                          <button
                            onClick={() => onUpdateQty(item.name, -1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span>{item.qty}</span>
                          <button
                            onClick={() => onUpdateQty(item.name, 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="cart-page-item-side">
                        <span className="cart-item-total">
                          Rs. {(item.price * item.qty).toLocaleString()}
                        </span>
                        <button
                          className="cart-remove"
                          onClick={() => onRemove(item.name)}
                          aria-label={`Remove ${item.name}`}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="cart-page-summary">
                  <h3>Bill Summary</h3>
                  <div className="cart-row">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="cart-row">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `Rs. ${shipping}`}</span>
                  </div>
                  <div className="cart-row cart-total">
                    <span>Total</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                  <button className="cart-checkout" onClick={handleCheckout}>
                    Checkout
                  </button>
                  <Link to="/shop" className="cart-page-continue">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
    <Footer />
    </>
  );
}

export default CartPage;
