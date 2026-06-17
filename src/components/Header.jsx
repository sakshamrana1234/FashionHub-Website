import { BsHandbag } from "react-icons/bs";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header=()=>{
const bag = useSelector(store=>store.bag)
const wishlist = useSelector(store=>store.wishlist)

return (
 <header className="site-header">
        <div className="header-shell">
          <Link className="brand-lockup" to="/">
            <span>FH</span>
            <strong>FashionHub</strong>
          </Link>

          <nav className="nav_bar" aria-label="Primary navigation">
            <Link to="/women">Women</Link>
            <Link to="/men">Men</Link>
            <Link to="/">Editorial</Link>
            <Link to="/sale">Sale</Link>
          </nav>

          <div className="search_bar">
            <FaSearch className="search_icon" />
            <input
              className="search_input"
              placeholder="Search streetwear, classics, sneakers..."
            />
          </div>

          <div className="action_bar">
            <button className="action_container" type="button" aria-label="Profile">
              <IoPersonOutline />
              <span className="action_name">Profile</span>
            </button>

            <Link className="action_container" to="/wishlist" aria-label="Wishlist">
              <FaRegHeart />
              <span className="action_name">Wishlist</span>
              {wishlist.length > 0 && <span className="bag-item-count">{wishlist.length}</span>}
            </Link>

            <Link className="action_container bag-action" to="/bag" aria-label="Shopping bag">
              <BsHandbag />
              <span className="action_name">Bag</span>
              {bag.length > 0 && <span className="bag-item-count">{bag.length}</span>}
            </Link>
          </div>
        </div>
      </header>
)}
export default Header;
