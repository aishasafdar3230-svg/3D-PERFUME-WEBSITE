import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import products from "../data/products";

const usps = [
  {
    title: "Hand Poured",
    text: "Every bottle blended in small batches for lasting quality.",
  },
  {
    title: "Rare Botanicals",
    text: "Sourced ingredients paired with modern, refined accords.",
  },
  {
    title: "Free Shipping",
    text: "Complimentary delivery on all orders over Rs. 5,000.",
  },
];

function HomeHighlights() {
  const featured = products.slice(0, 3);

  return (
    <>
      <section className="highlights">
        <Reveal className="highlights-grid">
          {usps.map((item) => (
            <div key={item.title} className="highlight-card">
              <span className="highlight-mark" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="featured">
        <Reveal>
          <span className="section-eyebrow">Bestsellers</span>
          <h2 className="section-title">A Taste of the Collection</h2>
        </Reveal>

        <div className="featured-grid">
          {featured.map((item, index) => (
            <Reveal key={item.name} delay={index * 90} className="featured-card-wrap">
              <div className="featured-card">
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  width={1000}
                  height={1000}
                />
                <h3>{item.name}</h3>
                <p>Rs. {item.price.toLocaleString()}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <Link to="/shop" className="cart-page-btn featured-cta">
            View Full Collection
          </Link>
        </Reveal>
      </section>

      <section className="cta-banner">
        <Reveal>
          <h2>Ready to Find Your Signature Scent?</h2>
          <p>Explore fragrances crafted for every mood and moment.</p>
          <Link to="/shop" className="cta-banner-btn">
            Shop Now
          </Link>
        </Reveal>
      </section>
    </>
  );
}

export default HomeHighlights;
