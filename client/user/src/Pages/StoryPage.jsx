import StoryDisplay from "../components/Reader/StoryDisplay"
import ChatBot from "../components/ChatBot/ChatBot.jsx"
import { useParams } from "react-router-dom"
const StoryPage = () => {
  const { username, id, title} = useParams();
  return (
    <>
    <StoryDisplay username={username} id={id} title={title}/>
    <ChatBot />
    </>

  )
}

export default StoryPage