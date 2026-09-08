import { NavLink } from "react-router-dom";

function Header({ cartItemCount }) {
  return (
    <header className="header">
      <div className="header-content">
        <NavLink to="/" className="logo">
          ReactShop
        </NavLink>

        <nav className="nav">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/shop">Shop</NavLink>

          <NavLink to="/cart">
            Cart
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
