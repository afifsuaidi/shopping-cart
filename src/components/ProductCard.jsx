import { useState } from "react";
import QuantityControl from "./QuantityControl";

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  return (
    <article className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <h2>{product.title}</h2>

        <p className="product-price">${product.price.toFixed(2)}</p>

        <QuantityControl
          quantity={quantity}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onChange={setQuantity}
        />

        <button
          type="button"
          className="add-button"
          onClick={() => onAddToCart(product, quantity)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
