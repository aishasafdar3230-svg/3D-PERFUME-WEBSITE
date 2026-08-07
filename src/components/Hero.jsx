import heroVideo from "../assets/hero.mp4";

function Hero() {
  return (
    <section className="hero" id="home">
      <video autoPlay muted loop playsInline className="hero-video">
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="hero-overlay" />
      <div className="hero-content hero-content-in">
        <span className="hero-eyebrow">Essence de Parfum</span>
        <h2>Discover Your Signature Scent</h2>
        <p>Luxury perfumes crafted for elegance</p>
      </div>
      <div className="hero-scroll">
        <span />
        Scroll
      </div>
    </section>
  );
}

export default Hero;
