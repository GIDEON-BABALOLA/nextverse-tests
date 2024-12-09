import StorySidebar from "./StorySidebar"
import "../../styles/components/Reader/story-display.css"
import CommentModal from "../common/CommentModal"
import StoryBody from "./StoryBody"
import { useModalContext } from "../../hooks/useModalContext"
import MobileComment from "./MobileComment"
import Comment from "./Comment"
import { useGetAStory } from "../../hooks/useGetAStory"
import { useState, useEffect } from "react"
import Toast from "../common/Toast"
import StorySuggestions from "./StorySuggestions"
import ErrorMessage from "../common/ErrorMessage"
import DeleteModal from "./DeleteModal"
const StoryDisplay = ({ username, id, title} ) => {
  const { getAStory, isLoading, error, data, isFollowing } = useGetAStory();
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [comments, setComments] = useState([])
  const [commentNumber, setCommentNumber] = useState(0)
  const [deleteModal, setDeleteModal] = useState({
    comment : "",
    modal : false
  })
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  useEffect(() => {
getAStory(id)
  }, [])
  const resendRequest = () => {
getAStory(id)
  }
  const [openModal, setOpenModal] = useState(false);
  const {  closeContextMenu } = useModalContext()
  return (
<>
<Toast />
    <MobileComment
     comments={comments}
 setComments={setComments}
 commentNumber={commentNumber}
 setCommentNumber={setCommentNumber}
    openModal={openModal} 
    id={id}
     isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}/>
        <StorySidebar 
        setOpenModal={setOpenModal} 
        openModal={openModal}
        toggleDrawer={toggleDrawer}
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
      <StoryBody
      content={data.content}
      title={data.title}
      picture={data.picture}
      author={data.author}
      avatar={data.avatar}
      userId={data.userId}
      isFollowing={isFollowing}
      />
     
    </div>
    <StorySuggestions
    author={data.author}
    avatar={data.avatar}
    userId={data.userId}
    isFollowing={isFollowing}

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


