import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home">
      <div className="hero">
        <p className="eyebrow">WELCOME TO REACTSHOP</p>

        <h1>
          Simple shopping,
          <br />
          built with React.
        </h1>

        <p>
          Browse our products, choose your quantities, and manage everything
          from your shopping cart.
        </p>

        <Link to="/shop" className="hero-button">
          Start Shopping
        </Link>
      </div>
    </section>
  );
}

export default Home;
