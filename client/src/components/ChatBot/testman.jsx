import { CgClose } from "react-icons/cg";
import { useAuthContext } from "../../hooks/useAuthContext";
import ChatBotLogo from "../../styles/components/common/Icons/ChatBotLogo";
const ChatHeader = ({setToggleChatBot, toggleChatBot}) => {
  const { user } = useAuthContext();
  return (
    <>
    <section className="litenotechatbot-header">

            <div className="litenotechatbot-header-contain"
            style={{display : "flex", flexDirection : "row", alignItems : "center", justifyContent : "center", gap : "6px"}}
            >     
                              <img src="https://res.cloudinary.com/doctr0fct/image/upload/v1732895892/company/Litenote_Chatbot_logo_vvybvq.svg"
style={{width : "10%"}}

          /> 
                  <h2> 
                  
                  Good Morning  
            
            &nbsp;{ user ? user["username"] : "Guest"}</h2>

            </div>
          
        </section>
        </>
  )
}

export default ChatHeader



<span className="litenotechatbot-spanner"
onClick={
() =>
  setToggleChatBot(!toggleChatBot)}
><CgClose /></span>