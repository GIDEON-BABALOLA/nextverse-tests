import { useState, useContext} from "react"
import toast, { Toaster } from "react-hot-toast";
import ChatHeader from "./ChatHeader"
import ChatBox from "./ChatBox"
import ChatInput from "./ChatInput"
import ChatToggler from "./ChatToggler"
import { useGenerateChatBotResponse } from "../../hooks/useGenerateChatBotResponse";
import { usePlayChime } from "../../hooks/usePlayChime";
import  ChatBotContext  from "../../context/ChatBotContext"
import "../../styles/components/common/chatbot.css"
const  ChatBot = () => {
  const { 
    messages,
    chatBotRef,
    setInputText,
    setInputInitHeight,
    inputText,
    setMessages
  } = useContext(ChatBotContext)
  const { generateResponse, error } = useGenerateChatBotResponse()
  const { playChime } = usePlayChime()
    const [toggleChatBot, setToggleChatBot] = useState(false)
    let userMessage
    const handleChat = async () => {
      playChime()
      userMessage = inputText.trim();
      if(!userMessage){
        toast.error("Enter A Message")
return //closes the function;
      }  // if no message
      // //Resetting the textarea height to its default height once a message is sent
      setInputInitHeight("50px")
       //Append the users message to the chatbox
       const outgoingArray = [...messages, {id : messages[messages.length - 1].id + 1, type: "outgoing", message: userMessage,  time : new Date().toISOString()}]
       setMessages(outgoingArray)
       setInputText("")                            
  handleIncomingMessage(outgoingArray)
      }

      const handleIncomingMessage = async (outgoingArray) => {
        const newMessage = {
          id: outgoingArray[outgoingArray.length - 1].id + 1,
          type: "incoming",
          message: "Thinking",
          error: false
        };
        // Update messages state immediately with the "Thinking" message
        setMessages([...outgoingArray, newMessage]);
        // Call generateResponse immediately
        const response = await generateResponse([...outgoingArray, newMessage]);
        // Update messages state with the response from generateResponse
        setTimeout(() => {
        setMessages(response);
        playChime()
        }, 1000);
      };
      

  return (
    <>
    <Toaster />
    <section className={toggleChatBot ? "litenotechatbot-show-chatbot" : ""}>
    <ChatToggler toggleChatBot={toggleChatBot} setToggleChatBot={setToggleChatBot}/>
    <div className="litenotechatbot-chatbot" ref={chatBotRef}>
        <ChatHeader setToggleChatBot={setToggleChatBot} toggleChatBot={toggleChatBot}/>
        <ChatBox apiError={error}/>
        <ChatInput setInputText={setInputText}
        handleChat={handleChat}
        />
    </div>
    </section>
    </>
  )
}
export default ChatBot