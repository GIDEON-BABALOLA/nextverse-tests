import { CgClose } from "react-icons/cg";
import { useAuthContext } from "../../hooks/useAuthContext";
const ChatHeader = ({setToggleChatBot, toggleChatBot}) => {
  const { user } = useAuthContext();
  return (
    <>
    <section className="litenotechatbot-header">
            <div className="litenotechatbot-header-contain">            <h2> Good Morning  
            
            &nbsp;{ user ? user["username"] : "Guest"}</h2>
            <span className="litenotechatbot-spanner"
            onClick={
            () =>
              setToggleChatBot(!toggleChatBot)}
            ><CgClose /></span></div>
          
        </section>
        </>
  )
}

export default ChatHeader