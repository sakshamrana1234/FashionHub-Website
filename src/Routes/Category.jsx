import { useSelector } from "react-redux";
import HomeItem from "../components/HomeItem";

const categoryConfig = {
  women: {
    label: "For her",
    title: "Women",
    description: "Fresh shirts, relaxed pants, and sharp accessories for everyday styling.",
    filter: (item) => item.item_name.startsWith("Women"),
  },
  men: {
    label: "For him",
    title: "Men",
    description: "Clean essentials, easy layers, and accessories built for repeat wear.",
    filter: (item) => item.item_name.startsWith("Men's"),
  },
  sale: {
    label: "Price drop",
    title: "The tags just got lighter.",
    description: "Five sharper picks with fresh markdowns, ready before they disappear.",
    filter: () => true,
    limit: 5,
    sort: (firstItem, secondItem) => secondItem.discount_percentage - firstItem.discount_percentage,
  },
};

const Category = ({ type }) => {
  const items = useSelector((store) => store.items);
  const config = categoryConfig[type];
  const categoryItems = [...items]
    .filter(config.filter)
    .sort(config.sort || (() => 0))
    .slice(0, config.limit || items.length);

  return (
    <main className="category-main">
      <section className="shop-section">
        <div className="product-collection">
          <div className="section-title sale-title">
            <span>{config.label}</span>
            <h2>{config.title}</h2>
            <p>{config.description}</p>
          </div>
          <div className="items-container">
            {categoryItems.map((item) => (
              <HomeItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Category;
