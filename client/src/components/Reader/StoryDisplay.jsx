import StorySidebar from "./StorySidebar"
import "../../styles/components/Reader/story-display.css"
import SpecialModal from "../common/SpecialModal"
import StoryBody from "./StoryBody"
import { useModalContext } from "../../hooks/useModalContext"
import Comment from "../../components/common/Comment"
import { useGetAStory } from "../../hooks/useGetAStory"
import { useState, useEffect } from "react"
import StorySuggestions from "./StorySuggestions"
import ErrorMessage from "../common/ErrorMessage"
const StoryDisplay = ({ username, id, title} ) => {
  const { getAStory, isLoading, error, data, isFollowing } = useGetAStory();
  useEffect(() => {
getAStory(id)
  }, [])
  useEffect(() => {
if(Object.keys(data).length > 0){
console.log(data)
}
  }, [data])
  const resendRequest = () => {
getAStory(id)
  }
  console.log(username, id, title)
  const [openModal, setOpenModal] = useState();
  const {  closeContextMenu } = useModalContext()
  return (
    <>
        <StorySidebar setOpenModal={setOpenModal} openModal={openModal}/>
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
   </>
  }
  
  </>
  }
  {
    isLoading && <div>still loading</div>
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
 <SpecialModal openModal={openModal} setOpenModal={setOpenModal} height={500} width={700}
content={<Comment />}

 />
    </>

  )
}

export default StoryDisplay