import FeedCard from "../Dashboard/common/FeedCard"
import ContextMenu from "../common/ContextMenu"
import ErrorMessage from "../common/ErrorMessage"
import { FaShareAlt, FaBookmark, FaRegThumbsUp } from "react-icons/fa"
import Share from "../common/Share"
import { MdReadMore } from "react-icons/md"
import { useModalContext } from "../../hooks/useModalContext"
const FeedList = ({ view, feedData}) => {
  const { contextMenu, setContextMenu, shareRef,  shareModal, fireClick } = useModalContext()
  return (

    <>
   <section>
    {view.grid && <div className="feed-grid">
{feedData.map((content, index) => (
   
 <FeedCard story={content}
 isLoading={false}
 fireClick={fireClick}
  key={index} view={"grid"}/>
))

}          
       </div>}
       { view.list &&
       <>
       <div className="feed-list-view">
       {feedData.map((content, index) => (
           <>
 <FeedCard story={content} key={index}
 isLoading={false}
 view={"list"}
 fireClick={fireClick}

 />
<hr  style={{color : "#9CA3AF"}}/>

</>
       ))}



       </div>
       
       </>
       }
    </section>
    <Share  share={shareRef} shareModal={shareModal}/>
<ContextMenu
  state={"feed"}
  contextMenu={contextMenu}
  shareModal={shareModal}
             setContextMenu={setContextMenu}
             contextMenuData={[
             {id : 1, icon : <FaShareAlt />
             , label : "Share"},
             {id : 2, icon : <FaBookmark />
             , label : "Bookmark"},
       
             {id : 4, icon : <FaRegThumbsUp />
             , label : "Like Story"},
             {id : 5, icon : <MdReadMore />
              , label : "Read More"}
]} />
    </>
  )
}

export default FeedList