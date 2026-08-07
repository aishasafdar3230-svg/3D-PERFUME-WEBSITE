import { useState } from "react";
import PerfumeModel from "./PerfumeModel";
import Reveal from "./Reveal";
import products from "../data/products";

function Products({ onAddToCart }) {
  const [addedIndex, setAddedIndex] = useState(null);

  function handleAdd(index, item) {
    onAddToCart(item);
    setAddedIndex(index);
    setTimeout(() => setAddedIndex(null), 1500);
  }

  return (
    <section className="products" id="shop">
      <Reveal>
        <span className="section-eyebrow">The Collection</span>
        <h2 className="section-title">Our Curated Fragrances</h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="model-stage">
          <div className="model-glow" />
          <PerfumeModel />
          <div className="model-pedestal" />
        </div>
        <p className="model-hint">Drag to rotate</p>
      </Reveal>

      <div className="products-grid">
        {products.map((item, index) => (
          <Reveal key={index} delay={index * 90} className="product-card-wrap">
            <div className={`product-card ${addedIndex === index ? "product-card-pop" : ""}`}>
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
              <button onClick={() => handleAdd(index, item)}>
                {addedIndex === index ? "Added ✓" : "Add to Cart"}
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Products;
