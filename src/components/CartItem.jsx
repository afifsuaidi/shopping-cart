import QuantityControl from "./QuantityControl";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const subtotal = item.price * item.quantity;

  return (
    <article className="cart-item">
      <img src={item.image} alt={item.title} className="cart-item-image" />

      <div className="cart-item-info">
        <h2>{item.title}</h2>

        <p>${item.price.toFixed(2)} each</p>

        <QuantityControl
          quantity={item.quantity}
          onIncrease={() => onIncrease(item.id)}
          onDecrease={() => onDecrease(item.id)}
          onChange={(quantity) => {
            if (quantity > item.quantity) {
              for (let i = item.quantity; i < quantity; i += 1) {
                onIncrease(item.id);
              }
            } else if (quantity < item.quantity) {
              for (let i = item.quantity; i > quantity; i -= 1) {
                onDecrease(item.id);
              }
            }
          }}
        />

        <p className="subtotal">
          Subtotal: <strong>${subtotal.toFixed(2)}</strong>
        </p>

        <button
          type="button"
          className="remove-button"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default CartItem;
