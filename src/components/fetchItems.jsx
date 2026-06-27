import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsActions } from "../store/itemsSlice";
import { fetchStatusActions } from "../store/fetchSlice";

const fallbackItems = [
  {
    id: "001",
    image: "images/Shirt.jpg",
    company: "FashionHub",
    item_name: "Men's Classic Shirt",
    original_price: 1899,
    current_price: 1299,
    discount_percentage: 32,
    return_period: 14,
    delivery_date: "10 Oct 2026",
    rating: { stars: 4.4, count: 1200 },
  },
  {
    id: "002",
    image: "images/Model1.jpg",
    company: "FashionHub",
    item_name: "Men's Coat",
    original_price: 1499,
    current_price: 899,
    discount_percentage: 40,
    return_period: 14,
    delivery_date: "10 Oct 2026",
    rating: { stars: 4.2, count: 980 },
  },
  {
    id: "003",
    image: "images/ManPants.jpg",
    company: "FashionHub",
    item_name: "Men's Tailored Pants",
    original_price: 2499,
    current_price: 1699,
    discount_percentage: 32,
    return_period: 14,
    delivery_date: "10 Oct 2026",
    rating: { stars: 4.5, count: 760 },
  },
  {
    id: "004",
    image: "images/Mansbelt.jpg",
    company: "FashionHub",
    item_name: "Men's Leather Belt",
    original_price: 999,
    current_price: 649,
    discount_percentage: 35,
    return_period: 14,
    delivery_date: "10 Oct 2026",
    rating: { stars: 4.3, count: 530 },
  },
  {
    id: "009",
    image: "images/Polotshirt.jpg",
    company: "FashionHub",
    item_name: "Men's Polo T-Shirt",
    original_price: 1699,
    current_price: 1099,
    discount_percentage: 35,
    return_period: 14,
    delivery_date: "10 Oct 2026",
    rating: { stars: 4.5, count: 860 },
  },
  {
    id: "005",
    image: "images/Womanshirt.jpg",
    company: "FashionHub",
    item_name: "Women Relaxed Shirt",
    original_price: 1799,
    current_price: 1199,
    discount_percentage: 33,
    return_period: 14,
    delivery_date: "10 Oct 2026",
    rating: { stars: 4.4, count: 1100 },
  },
  {
    id: "006",
    image: "images/WomanPants.jpg",
    company: "FashionHub",
    item_name: "Women Wide-Leg Pants",
    original_price: 2299,
    current_price: 1599,
    discount_percentage: 30,
    return_period: 14,
    delivery_date: "10 Oct 2026",
    rating: { stars: 4.6, count: 690 },
  },
  {
    id: "007",
    image: "images/WomanBelt.jpg",
    company: "FashionHub",
    item_name: "Women Statement Belt",
    original_price: 899,
    current_price: 599,
    discount_percentage: 33,
    return_period: 14,
    delivery_date: "10 Oct 2026",
    rating: { stars: 4.1, count: 420 },
  },
  {
    id: "008",
    image: "images/Redscarf.jpg",
    company: "FashionHub",
    item_name: "Women Red Accent Scarf",
    original_price: 799,
    current_price: 499,
    discount_percentage: 38,
    return_period: 14,
    delivery_date: "10 Oct 2026",
    rating: { stars: 4.3, count: 610 },
  },
];

const FetchItems=()=>{ 
  const fetchDone=useSelector(store=>store.fetchStatus.fetchDone);
  const dispatch=useDispatch();
  const apiUrl = import.meta.env.VITE_ITEMS_API_URL;

  useEffect(()=>{
    if(fetchDone) return;

    if (!apiUrl) {
      dispatch(itemsActions.addInitialItems(fallbackItems));
      dispatch(fetchStatusActions.markFetchDone());
      dispatch(fetchStatusActions.markFetchingFinished());
      return;
    }

    const controller=new AbortController();
    const signal=controller.signal;

    dispatch(fetchStatusActions.markFetchingStarted());

    fetch(apiUrl,{signal})
    .then((res)=>{
      if(!res.ok){
        throw new Error(`Request failed with status ${res.status}`);
      }
      return res.json();
    })
    .then(({items})=>{
     dispatch(itemsActions.addInitialItems(items))
     dispatch(fetchStatusActions.markFetchDone());
     dispatch(fetchStatusActions.markFetchingFinished());
    })
    .catch((err)=>{
      if(err.name === "AbortError") return;
      console.error("Error fetching items:",err);
      dispatch(itemsActions.addInitialItems(fallbackItems));
      dispatch(fetchStatusActions.markFetchDone());
      dispatch(fetchStatusActions.markFetchingFinished());
    });
    return ()=>controller.abort();
  },[apiUrl,dispatch,fetchDone])
  return 
}
export default FetchItems;
