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

    const applyHeroScale = (progress) => {
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const visualTop = 86;
      const availableHeight = window.innerHeight - visualTop - 28;
      const maxFitScale = Math.max(1, availableHeight / heroVisualElement.offsetHeight);
      const targetScale = 1 + easedProgress * 0.34;
      const zoomScale = Math.min(targetScale, maxFitScale);
      const visualRect = heroVisualElement.getBoundingClientRect();
      const currentTransform = getComputedStyle(heroVisualElement).transform;
      const currentShift = currentTransform === "none" ? 0 : new DOMMatrixReadOnly(currentTransform).m41;
      const unshiftedCenter = visualRect.left - currentShift + visualRect.width / 2;
      const centerShift = (window.innerWidth / 2 - unshiftedCenter) * easedProgress;
      const liftShift = -68 * easedProgress;

      heroElement.style.setProperty("--hero-image-scale", zoomScale.toFixed(3));
      heroElement.style.setProperty("--hero-model-shift", `${centerShift.toFixed(1)}px`);
      heroElement.style.setProperty("--hero-model-lift", `${liftShift.toFixed(1)}px`);
      heroElement.style.setProperty("--hero-model-radius", `${Math.max(0, 8 - easedProgress * 8).toFixed(1)}px`);
      heroElement.style.setProperty("--hero-copy-opacity", "1");
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
      const womenElement = womenSectionRef.current;
      if (!womenElement) return;

      const womenRect = womenElement.getBoundingClientRect();
      const heroRect = heroElement.getBoundingClientRect();
      if (womenRect.top <= 88 && heroRect.bottom <= 0 && currentProgress > 0) {
        resetHeroZoom();
      }
    };

    const handleWheel = (event) => {
      if (window.matchMedia("(max-width: 980px)").matches) return;

      const rect = heroElement.getBoundingClientRect();
      const isHeroActive = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.45;
      const zoomIsSettled = Math.abs(targetProgress - currentProgress) <= 0.01;
      const zoomIsFinished = targetProgress >= 1 && currentProgress >= 0.995 && zoomIsSettled;

      if (event.deltaY > 0 && isHeroActive && !zoomIsFinished) {
        event.preventDefault();
        if (targetProgress < 1) {
          targetProgress = Math.min(targetProgress + event.deltaY / 520, 1);
        }
        startHeroAnimation();
        return;
      }

      if (event.deltaY < 0 && isHeroActive && targetProgress > 0) {
        event.preventDefault();
        targetProgress = Math.max(targetProgress + event.deltaY / 520, 0);
        startHeroAnimation();
        return;
      }
    };

    const handleResize = () => {
      applyHeroScale(currentProgress);
    };

    applyHeroScale(0);
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handlePageScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handlePageScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main>
      <section className="hero-section" ref={heroRef}>
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
