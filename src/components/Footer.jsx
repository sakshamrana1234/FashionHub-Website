import { Link } from "react-router-dom";

const Footer=()=>{
return(
  <footer className="site-footer">
    <div className="footer_container">
      <div className="footer_column footer-brand">
        <h3>FashionHub</h3>
        <p>Independent style edits for people who dress with a point of view.</p>
      </div>

      <div className="footer_column">
        <h3>Shop</h3>
        <Link to="/">New drops</Link>
        <Link to="/men">Essentials</Link>
        <Link to="/women">Accessories</Link>
        <Link to="/sale">Sale</Link>
      </div>

      <div className="footer_column">
        <h3>Studio</h3>
        <Link to="/">Lookbook</Link>
        <Link to="/">Style notes</Link>
        <Link to="/">Care guide</Link>
        <Link to="/">Support</Link>
      </div>
    </div>
    <div className="copyright">
      © 2026 FashionHub. Curated with attitude.
    </div>
  </footer>
)
}
export default Footer;
