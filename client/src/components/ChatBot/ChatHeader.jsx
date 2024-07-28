import { CgClose } from "react-icons/cg";
const chatHeader = ({setToggleChatBot, toggleChatBot}) => {
  return (
    <>
    <section className="litenotechatbot-header">
            <div className="litenotechatbot-header-contain">            <h2>Good Morning User</h2>
            <span className="litenotechatbot-spanner"
            onClick={
            () =>
              setToggleChatBot(!toggleChatBot)}
            ><CgClose /></span></div>
          
        </section>
        </>
  )
}

export default chatHeader