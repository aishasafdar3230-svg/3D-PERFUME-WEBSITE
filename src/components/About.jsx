import perfume4 from "../assets/perfume4.webp";
import perfume5 from "../assets/perfume5.webp";
import Reveal from "./Reveal";

function About() {
  return (
    <section className="about" id="about">
      <Reveal className="about-images-wrap">
        <div className="about-images">
          <img
            src={perfume4}
            alt="Perfume crafting"
            className="about-img about-img-back"
            loading="lazy"
            decoding="async"
            width={1000}
            height={1000}
          />
          <img
            src={perfume5}
            alt="Perfume bottle detail"
            className="about-img about-img-front"
            loading="lazy"
            decoding="async"
            width={1000}
            height={1000}
          />
        </div>
      </Reveal>
      <Reveal delay={120} className="about-text-wrap">
        <div className="about-text">
          <span className="section-eyebrow">Our Story</span>
          <h2 className="section-title" style={{ textAlign: "left" }}>Crafted With Intention</h2>
          <p>
            Essence began with a simple belief: fragrance is memory in liquid
            form. Every bottle we create is blended in small batches, pairing
            rare botanicals with modern accords to craft scents that linger
            long after you've left the room.
          </p>
          <p>
            From the first spark of an idea to the final pour, each fragrance
            passes through the hands of our perfumers before it ever reaches
            yours — nothing rushed, nothing generic.
          </p>
          <div className="about-stats">
            <div>
              <strong>12+</strong>
              <span>Signature Blends</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Hand Poured</span>
            </div>
            <div>
              <strong>5★</strong>
              <span>Rated by Customers</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default About;
