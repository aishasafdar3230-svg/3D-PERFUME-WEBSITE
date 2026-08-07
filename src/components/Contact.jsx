import { useState } from "react";
import Reveal from "./Reveal";

// Web3Forms access key
const ACCESS_KEY = "3fd65033-13e0-49cd-b35c-8aa46b365716";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [shine, setShine] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function triggerShine() {
    setShine(false);
    // restart animation even if clicked again quickly
    requestAnimationFrame(() => setShine(true));
    setTimeout(() => setShine(false), 900);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("sent");
          setForm({ name: "", email: "", message: "" });
          setTimeout(() => setStatus("idle"), 4000);
        } else {
          console.error("Web3Forms error:", data.message);
          setStatus("error");
        }
      })
      .catch((err) => {
        console.error("Web3Forms error:", err);
        setStatus("error");
      });
  }

  return (
    <section className="contact" id="contact">
      <Reveal>
        <span className="section-eyebrow">Get In Touch</span>
        <h2 className="section-title">Contact Us</h2>
      </Reveal>

      <Reveal delay={100} className="contact-form-wrap">
        <form
          className={`contact-form${shine ? " shine-active" : ""}`}
          onSubmit={handleSubmit}
          onClick={triggerShine}
        >
        <span className="form-shine-overlay" aria-hidden="true"></span>

        <div className="form-row-group">
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Tell us what you're looking for..."
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>

          <button type="submit" className="form-submit" disabled={status === "sending"}>
            {status === "sending" && "Sending..."}
            {status === "sent" && "Message Sent ✓"}
            {(status === "idle" || status === "error") && "Send Message"}
          </button>

          {status === "sent" && (
            <p className="form-success">Thank you — we'll get back to you soon.</p>
          )}
          {status === "error" && (
            <p className="form-error">Something went wrong. Please try again.</p>
          )}
        </form>
      </Reveal>
    </section>
  );
}

export default Contact;
