import StorySidebar from "./StorySidebar"
import "../../styles/components/Reader/story-display.css"
import CommentModal from "../common/CommentModal"
import LikesModal from "./LikesModal"
import Likes from "./Likes"
import { FaShareAlt, FaBookmark, FaRegThumbsUp } from "react-icons/fa"
import { MdReadMore } from "react-icons/md"
import StoryBody from "./StoryBody"
import { useModalContext } from "../../hooks/useModalContext"
import StoryAuthor from "./StoryAuthor"
import MobileComment from "./MobileComment"
import MobileLikes from "./MobileLikes"
import Comment from "./Comment"
import { useGetAStory } from "../../hooks/useGetAStory"
import { useState, useEffect } from "react"
import Toast from "../common/Toast"
import StorySuggestions from "./StorySuggestions"
import ErrorMessage from "../common/ErrorMessage"
import ContextMenu from "../common/ContextMenu"
import DeleteModal from "./DeleteModal"
import Share from "../common/Share"
const StoryDisplay = ({ username, id, title} ) => {
  const {
    contextMenu,
     shareModal,
 shareRef,
 fireClick,
 setContextMenu,
 shareUrl,
 setShareUrl,
} = useModalContext()
  const { getAStory, isLoading, error, data, isFollowing, isLiked } = useGetAStory();
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [likesDrawerOpen, setLikesDrawerOpen] = useState(false)
  const [comments, setComments] = useState([])
  const [commentNumber, setCommentNumber] = useState(0)
  const [deleteModal, setDeleteModal] = useState({
    comment : "",
    modal : false
  })
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const toggleLikesDrawer = () => setLikesDrawerOpen((prev) => !prev);
  useEffect(() => {
getAStory(id)
  }, [id])
  const resendRequest = () => {
getAStory(id)
  }
  useEffect(() => {
console.log(data)
  }, [data])
  const [openModal, setOpenModal] = useState(false);
  const [likeModal, setLikeModal] = useState(false)
  const {  closeContextMenu } = useModalContext()
  return (
<>
<Share  share={shareRef} shareModal={shareModal} shareUrl={shareUrl} setShareUrl={setShareUrl}/>
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
            {id : 3, icon : <MdReadMore/>
            , label : "Close"},
            {id : 4, icon : <FaRegThumbsUp />
            , label : "Like Story"}
]} />
<Toast />
    <MobileComment
     comments={comments}
 setComments={setComments}
 commentNumber={commentNumber}
 setCommentNumber={setCommentNumber}
    openModal={openModal} 
    id={id}
     isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}/>
     <MobileLikes 
      isOpen={likesDrawerOpen}
      id={id}
      likeModal={likeModal}
      likesDrawerOpen={likesDrawerOpen}
      onClose={() => setLikesDrawerOpen(false)}
     />
        <StorySidebar 
        setOpenModal={setOpenModal} 
        openModal={openModal}
        likeModal={likeModal}
        setLikeModal={setLikeModal}
        toggleDrawer={toggleDrawer}
        toggleLikesDrawer={toggleLikesDrawer}
        story={ {title : data.title, author : data.author, _id :data._id } }
        />
 <section className="story-page-total-screen" onClick={closeContextMenu}>

  {!error &&
  
  <>
  {
   isLoading ?  
   
   <>
   <div style={{
display : "flex",
flexDirection : "row",
justifyContent : "space-around",
alignItems : "space-around",
margin  : "0% auto",

height : "100vh"}}
className="story-display-main"
>
<span className="still-no-stories-loader"></span>
</div>
   </>
   : <>
   <div className="story-display-main">
   <div className="read-story-body">
   <StoryAuthor
      author={data.author}
      avatar={data.avatar}
      userId={data.userId}
      views={data.totalViews}
      likes={data.totalLikes}
      isFollowing={isFollowing}
      isLiked={isLiked}
      storyId={id}
      />  
      
   <StoryBody
      content={data.content}
      title={data.title}
      picture={data.picture}
      author={data.author}
      avatar={data.avatar}
      userId={data.userId}
      views={data.totalViews}
      likes={data.totalLikes}
      isFollowing={isFollowing}
      />
          
    <span className="for-me-title"><b>
   More From {data.author}
    </b></span>
    
    <StoryAuthor
      author={data.author}
      avatar={data.avatar}
      userId={data.userId}
      views={data.totalViews}
      likes={data.totalLikes}
      isFollowing={isFollowing}
      isLiked={isLiked}
      storyId={id}
      />
           <StorySuggestions
    userId={data.userId}
    shareModal={shareModal}
    fireClick={fireClick}
    type={"more"}
    storyId={id}

     />
  
           <StorySuggestions
    userId={data.userId}
    shareModal={shareModal}
    fireClick={fireClick}
    title={"Suggested From Litenote"}
    type={"litenote"}
    storyId={id}

     />
   </div>
    
    
   
    </div>
   <LikesModal likeModal={likeModal} setLikeModal={setLikeModal}
    height={400} width={400}
    content={<Likes
      id={id}
      likeModal={likeModal}
      setLikeModal={setLikeModal}
      likesDrawerOpen={likesDrawerOpen}
     
     />}
   />
      <CommentModal
  openModal={openModal}
   setOpenModal={setOpenModal} height={570} width={600}
content={<Comment
 id={data._id}
 openModal={openModal}
 isOpen={isDrawerOpen}
setDeleteModal={setDeleteModal}
comments={comments}
commentNumber={commentNumber}
setComments={setComments}
setCommentNumber={setCommentNumber}
/> 
}

 />
 <DeleteModal  deleteModal={deleteModal} setDeleteModal={setDeleteModal} 
 comments={comments}
 setComments={setComments}
 commentNumber={commentNumber}
 setCommentNumber={setCommentNumber}
 storyId={id}
  zIndex={5000}/>
   </>
  }
  
  </>
  }
   
 </section>
 {error && <section style={{height : "100vh", padding : "100px 0px"}}>


{ error?.code == "ERR_NETWORK" ? 
  <ErrorMessage title={"Check Your Internet Connection"} 
message={"We are unable to load this content, check your connection"}
height={60}
type={error.code}
fireClick = {resendRequest}
/>
:
error?.code == "ERR_CANCELED"

?
<ErrorMessage title={"Timeout Error"} 
message={"Sorry, Your Request Has Timed Out, Pls click on the refresh button"}
height={60}
type={error.code}
fireClick = {resendRequest}
/>
:
<ErrorMessage title={"Something went wrong"} 
message={"We are unable to load this content, Pls click on the refresh button"}
height={60}
type={error.code}
fireClick = {resendRequest}
/>
}
</section>
}
    </>

  )
}

export default StoryDisplay


