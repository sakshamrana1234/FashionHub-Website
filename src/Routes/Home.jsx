import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomeItem from "../components/HomeItem";
import { getImagePath } from "../utils/imagePath";

const Home = () => {
  const heroRef = useRef(null);
  const heroVisualRef = useRef(null);
  const womenSectionRef = useRef(null);
  const items = useSelector((store) => store.items) || [];
  const menItems = items.filter((item) => item.item_name.startsWith("Men's"));
  const womenItems = items.filter((item) => item.item_name.startsWith("Women"));
  const saleItems = [...items]
    .sort((firstItem, secondItem) => secondItem.discount_percentage - firstItem.discount_percentage)
    .slice(0, 5);

  useEffect(() => {
    const heroElement = heroRef.current;
    const heroVisualElement = heroVisualRef.current;
    if (!heroElement || !heroVisualElement) return;

    let frameId;
    let targetProgress = 0;
    let currentProgress = 0;
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const applyHeroScale = (progress) => {
      const easedProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const startDrop = -window.innerHeight * 0.1;
      const endDrop = window.innerHeight * 0.08;
      const downShift = startDrop + (endDrop - startDrop) * easedProgress;
      const zoomScale = 0.86 + easedProgress * 0.34;

      heroElement.style.setProperty("--hero-image-scale", zoomScale.toFixed(3));
      heroElement.style.setProperty("--hero-model-drop", `${downShift.toFixed(1)}px`);
      heroElement.style.setProperty("--hero-model-radius", `${Math.max(0, 8 - easedProgress * 8).toFixed(1)}px`);
      heroElement.style.setProperty("--hero-copy-opacity", "1");
    };

    const updateTargetProgress = () => {
      const heroStart = heroElement.offsetTop;
      const heroScrollDistance = Math.max(1, heroElement.offsetHeight - window.innerHeight);
      targetProgress = clamp((window.scrollY - heroStart) / heroScrollDistance, 0, 1);
    };

    const renderHeroScale = () => {
      currentProgress += (targetProgress - currentProgress) * 0.12;
      applyHeroScale(currentProgress);

      if (Math.abs(targetProgress - currentProgress) > 0.001) {
        frameId = window.requestAnimationFrame(renderHeroScale);
      } else {
        currentProgress = targetProgress;
        applyHeroScale(currentProgress);
      }
    };

    const startHeroAnimation = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(renderHeroScale);
    };

    const resetHeroZoom = () => {
      targetProgress = 0;
      currentProgress = 0;
      window.cancelAnimationFrame(frameId);
      heroElement.classList.add("hero-resetting");
      applyHeroScale(0);
      window.requestAnimationFrame(() => {
        heroElement.classList.remove("hero-resetting");
      });
    };

    const handlePageScroll = () => {
      updateTargetProgress();
      startHeroAnimation();

      const womenElement = womenSectionRef.current;
      if (!womenElement) return;

      const womenRect = womenElement.getBoundingClientRect();
      const heroRect = heroElement.getBoundingClientRect();
      if (womenRect.top <= 88 && heroRect.bottom <= 0 && currentProgress > 0) {
        resetHeroZoom();
      }
    };

    const handleResize = () => {
      updateTargetProgress();
      applyHeroScale(currentProgress);
      startHeroAnimation();
    };

    updateTargetProgress();
    currentProgress = targetProgress;
    applyHeroScale(currentProgress);
    window.addEventListener("scroll", handlePageScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handlePageScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main>
      <section className="hero-section" ref={heroRef}>
        <div className="hero-sticky">
          <div className="hero-copy">
            <span className="hero-label">New season edit</span>
            <h1>Style that looks collected, not copied.</h1>
            <p>Discover sharp essentials, statement layers, and everyday pieces curated for a fresher FashionHub identity.</p>
            <div className="hero-actions">
              <Link to="/women" className="primary-cta">Shop the edit</Link>
              <Link to="/sale" className="secondary-cta">View trends</Link>
            </div>
          </div>
          <div className="hero-visual" ref={heroVisualRef}>
            <img src={getImagePath("images/newmodelimage.jpg")} alt="FashionHub editorial model" />
            <div className="hero-badge">
              <span>Fresh Drop</span>
              <strong>08 styles live</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="shop-section">
        <div className="product-collection collection-women" ref={womenSectionRef}>
          <div className="section-title">
            <span>For her</span>
            <h2>Women</h2>
          </div>
          <div className="items-container">
            {womenItems.map((item) => (
              <HomeItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="product-collection collection-men">
          <div className="section-title">
            <span>For him</span>
            <h2>Men</h2>
          </div>
          <div className="items-container">
            {menItems.map((item) => (
              <HomeItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="product-collection sale-collection collection-sale">
          <div className="section-title sale-title">
            <span>Price drop</span>
            <h2>The tags just got lighter.</h2>
            <p>Five sharper picks with fresh markdowns, ready before they disappear.</p>
          </div>
          <div className="items-container">
            {saleItems.map((item) => (
              <HomeItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
