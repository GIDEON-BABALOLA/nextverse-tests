
import "../styles/components/Feed/feed.css"
import { useModalContext } from "../hooks/useModalContext";
import FeedList from "../components/Feed/FeedList";
import FeedRightSidebar from "../components/Feed/FeedRightSidebar";
import FeedSearch from "../components/Feed/FeedSearch";
import FeedLeftSidebar from "../components/Feed/FeedLeftSidebar";
import FeedBottomNav from "../components/Feed/FeedBottomNav";
import ConnectivityToast from "../components/common/connectivityToast";
import ChatBot from "../components/ChatBot/ChatBot";
import { FaHome,FaSearch, FaTimes } from "react-icons/fa";
import useWindowSize from "../hooks/useWindowSize";
import { Link } from "react-router-dom"
import {  useState } from "react"
const FeedPage = () => {
    const { closeContextMenu } = useModalContext();
    const [feedCategory, setFeedCategory] = useState({
      all : true,
      technology : false,
      fiction : false,
      adventure : false,
      nonfiction : false,
      romance : false,
      memoir : false
    })
    const [view, setView] = useState({
        list : false,
        grid : true
    })
    const changeView = (e) => {
        if(e.currentTarget.closest("a") === null){
            setView({
                list : !view.list,
                grid : !view.grid
        })
    return;
    }
    switch (e.currentTarget.closest("a").innerText) {
        case "Grid":
            setView({
                list : false,
                grid : true
            })
            break;
            case "List":
                setView({
                    list : true,
                    grid : false
                })
            break;
            case undefined :
            setView({
                list : !view.list,
                grid : !view.grid
            })
            break;
    }
    }
  const { width } = useWindowSize()
  return (
    <>
    <ConnectivityToast />
       <section className="total-feed" onClick={closeContextMenu}>
<FeedBottomNav view={view} changeView={changeView}/>
 
 <FeedLeftSidebar view={view} changeView={changeView}/>
    <div className="feed-main-content">
        <div className="feed-header">
            <div className="feed-logo">Lite Note</div>
           { width < 768 &&<>
 <FeedSearch />


           </> }
        </div>
        
        <div className="feed-tabs">
            <span className="feed-headman active">Recommended</span>
            <span
            className="feed-headman"
             >Following</span>
            <span 
            className="feed-headman"
           >Challenges</span>
        </div>
        <hr />
        
  <FeedList view={view} feedCategory={feedCategory}/>
    </div>
        
  <FeedRightSidebar feedCategory={feedCategory} setFeedCategory ={setFeedCategory}/>
   </section>
      <ChatBot />
    </>

  )
}

export default FeedPage