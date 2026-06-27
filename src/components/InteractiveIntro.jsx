import { useEffect, useRef, useState } from "react";
import "./InteractiveIntro.css";

const InteractiveIntro = () => {
  const [showCursor, setShowCursor] = useState(false);
  const cursorRef = useRef(null);
  const focusRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setShowCursor(true);

      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      if (focusRef.current) {
        focusRef.current.style.left = `${e.clientX}px`;
        focusRef.current.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseLeave = () => {
      setShowCursor(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="intro-container">
      {/* Focus area - clears blur */}
      <div
        ref={focusRef}
        className={`focus-light ${showCursor ? "active" : ""}`}
      />

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${showCursor ? "active" : ""}`}
      >
        <div className="cursor-ring"></div>
        <div className="cursor-dot"></div>
      </div>

      {/* Hero section */}
      <section className="modern-hero">
        <div className="hero-grid">
          {/* Left column - Text */}
          <div className="hero-left">
            <div className="hero-tag">The Future of Fashion</div>
            <h1 className="hero-title">
              <span className="title-line">Define Your</span>
              <span className="title-line highlight-line">Own Style</span>
            </h1>
            <p className="hero-subtitle">
              Experience fashion like never before. Curated collections, premium
              quality, and exclusive designs crafted for you.
            </p>
            <div className="hero-ctas">
              <button className="btn-primary">Explore Now</button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>

          {/* Right column - Interactive cards */}
          <div className="hero-right">
            <div className="features-grid">
              <div className="feature-card feature-1">
                <div className="feature-icon">★</div>
                <h3>Premium Quality</h3>
                <p>Finest materials & craftsmanship</p>
              </div>
              <div className="feature-card feature-2">
                <div className="feature-icon">◆</div>
                <h3>Trending Designs</h3>
                <p>Latest styles from top designers</p>
              </div>
              <div className="feature-card feature-3">
                <div className="feature-icon">✦</div>
                <h3>Fast Delivery</h3>
                <p>Quick & reliable shipping</p>
              </div>
              <div className="feature-card feature-4">
                <div className="feature-icon">◈</div>
                <h3>Exclusive Access</h3>
                <p>Members-only collections</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
      </section>

      {/* Scroll prompt */}
      <div className="scroll-prompt">
        <span>Scroll to discover</span>
        <div className="scroll-icon">↓</div>
      </div>
    </div>
  );
};

export default InteractiveIntro;
