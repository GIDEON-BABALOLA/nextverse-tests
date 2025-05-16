import { useRef, useEffect, useContext } from "react"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { BiMicrophone } from "react-icons/bi";
import { BiSolidSend } from "react-icons/bi";
import  ChatBotContext  from "../../context/ChatBotContext"
const ChatInput = ( { handleChat } ) => {
   const { inputText, setInputText, inputInitHeight, setInputInitHeight } = useContext(ChatBotContext)
   const { transcript, resetTranscript } = useSpeechRecognition()
   useEffect(() => {
      const first = transcript.split(" ")[transcript.split(" ").length -1]
      setInputText(transcript)
   }, [transcript, setInputText])
const chatInputRef = useRef();
const handleInput = (e) => {
   setInputText(e.target.value)
   const height = `${chatInputRef.current.scrollHeight}px`
   if(chatInputRef.current){
   setInputInitHeight(height)
   }
}
const handleRecord = async () => {
   SpeechRecognition.startListening({ continuous: true })
}
const handleEnter = (e) => {
   if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
      e.preventDefault();
      handleChat()
      SpeechRecognition.stopListening();
      resetTranscript()
  }
}
  return(   
     <div className="litenotechatbot-chat-input">
  <textarea 
  className="input-with-placeholder"
  placeholder="Enter a message..." value={inputText} onKeyDown = {handleEnter}  ref={chatInputRef} onChange={handleInput} style={{height : inputInitHeight, color : "black"}}/>
  <span id="litenotechatbot-mic-btn" className="" onClick={handleRecord}>
   <BiMicrophone />
  </span>
  <span id="litenotechatbot-send-btn" className="litenotechatbot-sendButton"  onClick={
   () => { handleChat()
      SpeechRecognition.stopListening();
      resetTranscript()
      
      }
   
   }>
   <BiSolidSend /></span>
  </div>
  )
}

export default ChatInput
