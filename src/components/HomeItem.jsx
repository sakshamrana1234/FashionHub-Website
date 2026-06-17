import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/bagSlice";
import { wishlistActions } from "../store/wishlistSlice";
import { IoAddOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const HomeItem=({item})=>{
const itemRef=useRef(null);
const dispatch=useDispatch()
const bagItems= useSelector(store=>store.bag);
const wishlistItems= useSelector(store=>store.wishlist);
const elementFound=bagItems.indexOf(item.id)>= 0;
const wishlistFound=wishlistItems.indexOf(item.id)>= 0;

const handleAddToBag=()=>{
    dispatch(bagActions.addToBag(item.id))
}

const removeAddToBag=()=>{
    dispatch(bagActions.removeFromBag(item.id))
}

const handleWishlist=()=>{
  if(wishlistFound){
    dispatch(wishlistActions.removeFromWishlist(item.id))
  } else {
    dispatch(wishlistActions.addToWishlist(item.id))
  }
}

useEffect(()=>{
  const itemElement=itemRef.current;
  if(!itemElement) return;

  const observer=new IntersectionObserver(([entry])=>{
    if(entry.isIntersecting){
      itemElement.classList.add("is-visible");
      observer.unobserve(itemElement);
    }
  },{threshold:0.18});

  observer.observe(itemElement);
  return ()=>observer.disconnect();
},[])

  return (<article className="item-container reveal-card" ref={itemRef}>
      <div className="item-media">
        <img className="item-image" src={item.image} alt={item.item_name}/>
        <span className="rating">{item.rating.stars} star | {item.rating.count}</span>
      </div>
      <div className="item-content">
        <div className="item-name">{item.item_name}</div>
        <div className="price">
            <span className="current-price">Rs {item.current_price}</span>
            <span className="original-price">Rs {item.original_price}</span>
            <span className="discount">({item.discount_percentage}% OFF)</span>
        </div>
        <div className="item-actions">
          {elementFound ? <button type="button" className="btn-add-bag remove" onClick={removeAddToBag}><IoRemoveCircleOutline/> Remove</button> : <button type="button" className="btn-add-bag" onClick={handleAddToBag} ><IoAddOutline /> Add to Bag</button>}
          <button type="button" className={`btn-wishlist ${wishlistFound ? "active" : ""}`} onClick={handleWishlist} aria-label="Wishlist">
            {wishlistFound ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
    </article>)
}
export default HomeItem;
