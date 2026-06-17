import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomeItem from "../components/HomeItem";

const Home = () => {
  const items = useSelector((store) => store.items);
  const menItems = items.filter((item) => item.item_name.startsWith("Men's"));
  const womenItems = items.filter((item) => item.item_name.startsWith("Women"));
  const saleItems = [...items]
    .sort((firstItem, secondItem) => secondItem.discount_percentage - firstItem.discount_percentage)
    .slice(0, 5);

  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="hero-label">New season edit</span>
          <h1>Style that looks collected, not copied.</h1>
          <p>Discover sharp essentials, statement layers, and everyday pieces curated for a fresher FashionHub identity.</p>
          <div className="hero-actions">
            <Link to="/women" className="primary-cta">Shop the edit</Link>
            <Link to="/sale" className="secondary-cta">View trends</Link>
          </div>
        </div>
        <div className="hero-visual">
          <img src="images/Polotshirt.jpg" alt="FashionHub model wearing a polo t-shirt" />
          <div className="hero-badge">
            <span>Fresh Drop</span>
            <strong>08 styles live</strong>
          </div>
        </div>
      </section>

      <section className="trend-strip" aria-label="Fashion categories">
        {["Minimal fits","Weekend layers","Active edge","Fresh denim","Clean beauty"].map((trend)=>(
          <span key={trend}>{trend}</span>
        ))}
      </section>

      <section className="shop-section">
        <div className="product-collection">
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

        <div className="product-collection">
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

        <div className="product-collection sale-collection">
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
