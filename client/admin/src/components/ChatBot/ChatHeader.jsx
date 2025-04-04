import { CgClose } from "react-icons/cg";
import { useAuthContext } from "../../hooks/useAuthContext";
import ChatBotLogo from "../../styles/components/common/Icons/ChatBotLogo";
import useWindowSize from "../../hooks/useWindowSize"
import { useEffect } from "react";
import { useState } from "react";
const ChatHeader = ({setToggleChatBot, toggleChatBot}) => {
  const [time, setTime] = useState("")
  const { user } = useAuthContext();
  const { width } = useWindowSize();
  function getTimeOfDay() {
    const currentHour = new Date().getHours(); // Get the current hour (0-23)
  
    if (currentHour >= 5 && currentHour < 12) {
     setTime("Morning")
    } else if (currentHour >= 12 && currentHour < 17) {
    setTime("Afternoon")
    } else if (currentHour >= 17 && currentHour < 21) {
      setTime("Evening")
    } else {
      setTime("Night")     // From 9 PM to 4:59 AM
    }
  }
  useEffect(() => {
  getTimeOfDay()
  }, [])

  
  
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
                  
                  {width < 1200 ? "Hi" : `Good ${time}`}  
            
            &nbsp;{ user ? user["username"] : "Guest"}</h2>
            { width < 1200 && <span className="litenotechatbot-spanner"
onClick={
() =>
  setToggleChatBot(!toggleChatBot)}
><CgClose /></span>
            }

            </div>
          
        </section>
        </>
  )
}

export default ChatHeader

