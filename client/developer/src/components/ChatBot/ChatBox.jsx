import ChatElement from "./ChatElement"
import { useContext } from "react"
import  ChatBotContext  from "../../context/ChatBotContext"
import { FaRobot } from "react-icons/fa";
const ChatBox = ({ apiError }) => {
  const { messages, chatBoxRef } = useContext(ChatBotContext)
  return (
    <section>
             <ul className="litenotechatbot-chatbox" ref={chatBoxRef}>
            <li className="litenotechatbot-chat litenotechatbot-incoming">
                <span  id= "litenotechatbot-robot" >
                <img src="https://res.cloudinary.com/doctr0fct/image/upload/v1732896392/company/svgexport-10_zojfxu.svg" style={{width : "80%"}}/>
                </span>
 
<p className="litenotechatbot-jump-text">Hi there,<br />How can I help you today?</p>
            </li>
            {messages.map((message) => (
<ChatElement  key={message.id}  id={message.id} message={message.message}  type={message.type} apiError={apiError} 
time={message.time}
error={message.error}/>
            ))}
        </ul>
    </section>
  )
}

export default ChatBox