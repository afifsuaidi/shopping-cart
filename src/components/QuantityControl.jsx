function QuantityControl({ quantity, onIncrease, onDecrease, onChange }) {
  function handleChange(event) {
    const value = Number(event.target.value);

    if (value >= 1) {
      onChange(value);
    }
  }

  return (
    <div className="quantity-control">
      <button type="button" onClick={onDecrease}>
        −
      </button>

      <input type="number" min="1" value={quantity} onChange={handleChange} />

      <button type="button" onClick={onIncrease}>
        +
      </button>
    </div>
  );
}

export default QuantityControl;
