import { createContext, useState, useRef, useEffect } from "react";
 const ChatBotContext = createContext({})
export const ChatBotProvider = ( { children } ) => {
    const chatBoxRef = useRef()
    const chatBotRef = useRef()
    const [messages, setMessages] = useState([])
    const [inputText, setInputText] = useState("")
    const [inputInitHeight, setInputInitHeight] = useState("50px")
    useEffect(() => {
setMessages([{id : 1, type : "outgoing", message : "Start By saying Hi"}])
    }, [])
    useEffect(() => {
        scrollToBottom();
      }, [messages]);
      const scrollToBottom = () => {
        if (chatBoxRef.current) {
          chatBoxRef.current.scrollTo({
            top: chatBoxRef.current.scrollHeight,
            behavior: 'smooth' // Optional smooth scrolling
          });
        }
      };
    return (
        <ChatBotContext.Provider
        value={{
        chatBotRef  : chatBotRef,
        chatBoxRef : chatBoxRef,
        messages : messages,
        inputText : inputText,
        setInputText : setInputText,
        inputInitHeight : inputInitHeight,
        setInputInitHeight : setInputInitHeight,
        setMessages : setMessages
        }}
         >
         
            {children}
        </ChatBotContext.Provider>
    )
}
export default ChatBotContext