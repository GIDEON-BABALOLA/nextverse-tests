import StorySidebar from "./StorySidebar"
import "../../styles/components/Reader/story-display.css"
import CommentModal from "../common/CommentModal"
import LikesModal from "./LikesModal"
import Likes from "./Likes"
import { FaShareAlt, FaRegBookmark } from "react-icons/fa"
import { MdReadMore, MdOutlineFavoriteBorder } from "react-icons/md"
import StoryBody from "./StoryBody"
import { useModalContext } from "../../hooks/useModalContext"
import StoryAuthor from "./StoryAuthor"
import MobileComment from "./MobileComment"
import MobileLikes from "./MobileLikes"
import Comment from "./Comment"
import { useGetAStory } from "../../hooks/useGetAStory"
import ContextMenu from "../common/ContextMenu"
import { useState, useEffect, useMemo } from "react"
import Toast from "../common/Toast"
import MoreStories from "./MoreStories"
import SuggestedStories from "./SuggestedStories"
import ErrorMessage from "../common/ErrorMessage"
import DeleteModal from "./DeleteModal"
import Share from "../common/Share"
import { useLikeAStory } from "../../hooks/useLikeAStory"
import { useUnLikeAStory } from "../../hooks/useUnlikeAStory"
const StoryDisplay = ({ username, id, title} ) => {
    const likeStory = useLikeAStory();
    const unlikeStory = useUnLikeAStory();
  const {
     shareModal,
 shareRef,
 fireClick,
 shareUrl,
 setShareUrl,
 contextMenu,
setContextMenu
} = useModalContext()
  const { getAStory, isLoading, error, data, isFollowing, isLiked, isBookmarked } = useGetAStory();
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [likesDrawerOpen, setLikesDrawerOpen] = useState(false)
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [commentNumber, setCommentNumber] = useState(0)
  const [likesNumber, setLikesNumber] = useState(0)
  const [moreStories, setMoreStories] = useState([])
  const [suggestedStories, setSuggestedStories] = useState([])
  const [totalLikes, setTotalLikes] = useState(0)
  const [liking, setLiking]  = useState(false)
  const [unLiking, setUnLiking] = useState(false)
  const [likedBefore, setLikedBefore] = useState("")
  const [deleteModal, setDeleteModal] = useState({
    comment : "",
    modal : false
  })
  const memoizedStories = useMemo(() => [...moreStories, ...suggestedStories], [moreStories, suggestedStories]);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const toggleLikesDrawer = () => setLikesDrawerOpen((prev) => !prev);
  useEffect(() => {
    setMoreStories([])
    setSuggestedStories([])
getAStory(id)
  }, [id])
  const resendRequest = () => {
getAStory(id)
  }
  useEffect(() => {
    setLikedBefore(isLiked)
    setTotalLikes(data.totalLikes)
  }, [data, isLiked])
  const [openModal, setOpenModal] = useState(false);
  const [likeModal, setLikeModal] = useState(false)
  const {  closeContextMenu } = useModalContext()
  return (
<>
<Share  share={shareRef} shareModal={shareModal} shareUrl={shareUrl} setShareUrl={setShareUrl}/>
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
      likes={likes}
      likesNumber={likesNumber}
      setLikes={setLikes}
      setLikesNumber={setLikesNumber}
     />
        <StorySidebar 
        setOpenModal={setOpenModal} 
        openModal={openModal}
        likeModal={likeModal}
        setLikeModal={setLikeModal}
        toggleDrawer={toggleDrawer}
        toggleLikesDrawer={toggleLikesDrawer}
        isBookmarked={isBookmarked}
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
      author={data.userId.username}
      avatar={data.userId.picture}
      email = {data.userId.email}
      bio = {data.userId.bio}
      userId={data.userId._id}
      viewsNumber={data.totalViews}
      likes={likes}
      setLikesNumber={setLikesNumber}
      setLikes={setLikes}
      isFollowing={isFollowing}
      storyId={id}
      totalLikes={totalLikes}
      setTotalLikes={setTotalLikes}
      liking={liking}
      setLiking={setLiking}
      unLiking={unLiking}
      setUnLiking={setUnLiking}
      likedBefore={likedBefore}
      setLikedBefore={setLikedBefore}
      likeStory={likeStory}
      unlikeStory={unlikeStory}
      />  
      
   <StoryBody
      content={data.content}
      title={data.title}
      picture={data.picture}
      pictures={data.pictures}
      author={data.author}
      avatar={data.avatar}
      userId={data.userId}
      views={data.totalViews}
      likes={data.totalLikes}
      isFollowing={isFollowing}
      />
      <>
      <span className="for-me-title"><b>
   More From {data.author}
    </b></span>
    
    <StoryAuthor
        author={data.userId.username}
        avatar={data.userId.picture}
        email = {data.userId.email}
        bio = {data.userId.bio}
        userId={data.userId._id}
         viewsNumber={data.totalViews}
         likes={likes}
         setLikesNumber={setLikesNumber}
         setLikes={setLikes}
         isFollowing={isFollowing}
         storyId={id}
         totalLikes={totalLikes}
         setTotalLikes={setTotalLikes}
         liking={liking}
         setLiking={setLiking}
         unLiking={unLiking}
         setUnLiking={setUnLiking}
         likedBefore={likedBefore}
         setLikedBefore={setLikedBefore}
         likeStory={likeStory}
         unlikeStory={unlikeStory}
      
      />  
      </>
      <div style={{marginTop : "30px"}}>
      <MoreStories
    userId={data.userId}
    shareModal={shareModal}
    fireClick={fireClick}
    storyId={data._id}
    title={data.title}
    moreStories={moreStories}
    setMoreStories={setMoreStories}

     />
         <SuggestedStories
    userId={data.userId}
    shareModal={shareModal}
    fireClick={fireClick}
    storyId={data._id}
    title={data.title}
    suggestedStories={suggestedStories}
    setSuggestedStories={setSuggestedStories}

     />
      </div>
  
         <ContextMenu
  state={"feed"}
  contextMenu={contextMenu}
  stories={memoizedStories}
  shareModal={shareModal}
             setContextMenu={setContextMenu}
             contextMenuData={[
             {id : 1, icon : <FaShareAlt />
             , label : "Share", type : "default"},
             {id : 2, icon : <FaRegBookmark />
             , label : "Bookmark", type : "custom"},
             {id : 4, icon : <MdOutlineFavoriteBorder />
             , label : "Like", type : "custom"},
             {id : 5, icon : <MdReadMore />
              , label : "Read More", type : "default"}
]} /> 
   </div>
    
    
   
    </div>
   <LikesModal likeModal={likeModal} setLikeModal={setLikeModal}
    height={400} width={400}
    content={<Likes
      id={id}
      likeModal={likeModal}
      setLikeModal={setLikeModal}
      likesDrawerOpen={likesDrawerOpen}
      likes={likes}
      likesNumber={likesNumber}
      setLikes={setLikes}
      setLikesNumber={setLikesNumber}
     
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


