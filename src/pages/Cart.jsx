import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function Cart({ cart, onIncrease, onDecrease, onRemove }) {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <section className="page empty-cart">
        <p className="eyebrow">YOUR CART</p>

        <h1>Your cart is empty.</h1>

        <p>Add some products before coming back here.</p>

        <Link to="/shop" className="hero-button">
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="page-heading">
        <p className="eyebrow">YOUR CART</p>

        <h1>Shopping Cart</h1>

        <p>
          {totalItems} {totalItems === 1 ? "item" : "items"} in your cart.
        </p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>

          <button type="button" className="checkout-button">
            Checkout
          </button>
        </aside>
      </div>
    </section>
  );
}

export default Cart;
