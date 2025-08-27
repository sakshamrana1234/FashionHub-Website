import {Outlet} from "react-router-dom"
import Footer from "../components/Footer";
import Header from "../components/header";
import FetchItems from "../components/fetchItems";
import LoadingSpinner from "../components/loadingSpinner";
import { useSelector } from "react-redux";



function App() {
  const fetchStatus=useSelector(store=>store.fetchStatus
  );
  return (
    <>
      <Header/>
     {fetchStatus.currentlyFetching ? <LoadingSpinner/>: <Outlet/>}
   
    <FetchItems/> 
      <Footer/>
       
    </>
  );
}

export default App;
