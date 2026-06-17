import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { wishlistActions } from "../store/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist);
  const items = useSelector((state) => state.items);
  const finalItems = items.filter((item) => wishlistItems.includes(item.id));
  const suggestedItems = items
    .filter((item) => !wishlistItems.includes(item.id))
    .slice(0, 4);
  const showSuggestions = finalItems.length <= 2;

  return (
    <main className="wishlist-main">
      <section className="wishlist-page">
        <div className="section-title wishlist-title">
          <span>Saved styles</span>
          <h2>Wishlist</h2>
        </div>
        {finalItems.length === 0 ? (
          <div className="empty-wishlist">
            <p>Your wishlist is empty.</p>
            <Link to="/" className="primary-cta">Continue shopping</Link>
          </div>
        ) : (
            <div className="wishlist-grid">
              {finalItems.map((item) => (
                <article className="wishlist-item" key={item.id}>
                  <div className="wishlist-media">
                    <img src={item.image} alt={item.item_name} />
                  </div>
                  <div className="wishlist-content">
                    <h3>{item.item_name}</h3>
                    <div className="price">
                      <span className="current-price">Rs {item.current_price}</span>
                      <span className="original-price">Rs {item.original_price}</span>
                      <span className="discount">({item.discount_percentage}% OFF)</span>
                    </div>
                    <button
                      type="button"
                      className="btn-remove-wishlist"
                      onClick={() => dispatch(wishlistActions.removeFromWishlist(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
        )}
        {showSuggestions && (
          <section className="wishlist-suggestions">
            <div className="section-title wishlist-title">
              <span>More to save</span>
              <h2>Suggested picks</h2>
            </div>
            <div className="wishlist-grid">
              {suggestedItems.map((item) => (
                <article className="wishlist-item" key={item.id}>
                  <div className="wishlist-media">
                    <img src={item.image} alt={item.item_name} />
                  </div>
                  <div className="wishlist-content">
                    <h3>{item.item_name}</h3>
                    <div className="price">
                      <span className="current-price">Rs {item.current_price}</span>
                      <span className="original-price">Rs {item.original_price}</span>
                      <span className="discount">({item.discount_percentage}% OFF)</span>
                    </div>
                    <button
                      type="button"
                      className="btn-remove-wishlist"
                      onClick={() => dispatch(wishlistActions.addToWishlist(item.id))}
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
};

export default Wishlist;
