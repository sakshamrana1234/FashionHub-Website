import {Outlet} from "react-router-dom"
import Footer from "../components/Footer";
import Header from "../components/Header";
import FetchItems from "../components/fetchItems";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSelector } from "react-redux";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";



function App() {
  const fetchStatus=useSelector(store=>store.fetchStatus
  );
  return (
    <>
      <Header/>
     {fetchStatus.currentlyFetching ? <LoadingSpinner/>: <Outlet/>}
   
    <FetchItems/> 
      <a
        className="support-agent-link"
        href="https://supr-chat-ai-agent.vercel.app/"
        target="_blank"
        rel="noreferrer"
      >
        <IoChatbubbleEllipsesOutline />
        <span>AI Support</span>
      </a>
      <Footer/>
       
    </>
  );
}

export default App;
