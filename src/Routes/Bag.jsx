import { useSelector } from "react-redux";
import BagSummary from "../components/BagSummary";
import BagItems from "../components/BagItems";

const Bag=()=>{
  const bagItems=useSelector(state=>state.bag)
   const items=useSelector(state=>state.items)
   const finalItems=items.filter(item=>{
    const TrueItems=bagItems.indexOf(item.id);
    
    return TrueItems>=0;
  } ) 

  return(

    <main className="bag-main">
      <div className="bag-page">
        <div className="bag-items-container">
          {finalItems.map((item) => (
            <BagItems key={item.id} item={item} />
          ))}
        </div>
        <BagSummary />
      </div>
    </main>


)}
export default Bag;
