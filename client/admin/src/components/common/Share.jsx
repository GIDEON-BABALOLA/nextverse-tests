import { useState, useEffect } from "react"
import { FaLink } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import "../../styles/components/common/share.css"
import useWindowSize from "../../hooks/useWindowSize";
const Share = ( { share, shareModal, shareUrl, setShareUrl}) => {
  const [shareType, setShareType] = useState("")
  useEffect(() => {
    console.log(shareUrl);
    
if(shareUrl?.split("/").includes("profile")){
  setShareType("Profile")
}else{
  setShareType("Story")
}
  }, [shareUrl])
  const { width } = useWindowSize();
const [text, setText] = useState(false)
  const closeShareModal = () => {
    shareModal.current.classList.remove("slide-dow")
    setTimeout(() => {
      shareModal.current.close()
    }, 400);
    setText(false)
    setShareUrl(null)
  }
  const handleShareClick = (storyUrl) => {
    window.open(storyUrl, '_blank', 'noopener,noreferrer');
  };
  const copyLink = () => {
navigator.clipboard.writeText(shareUrl);
setText(!text)
  }
  useEffect(() => {
console.log(shareUrl);

  }, [shareUrl])
  return (
    <section>

    <dialog className="litenote-copy-link-dialog litenote-share-slide-down show"
    style={{backgroundColor : "white"}}
     ref={share}>
        <form>
            <header>
                <h2>Share this { shareType == "Profile" ? "Profile" : "story" }</h2>
                <button className="litenote-close-btn secndary" type="button" onClick={closeShareModal}>
                <span>
                <FaTimes style={{outline : "none"}}/>

                
                </span>
            
                </button>
            </header>
            <div className="litenote-copy-link-dialog__content">
                <div className="litenote-copy-link-wrapper">
                    <input id="copy-link-input" type="text" required value={shareUrl} readOnly />
                    <button
                    style={{color : "#ff5e62"}}
                     className="litenote-copy-btn" type="button" onClick={copyLink}>
                     <FaLink />
                        <span id="copy-text">
                           { text ?  "Copied" :"Copy Link"}
                        </span>
                    </button>
                </div>
                <span className="litenote-share-social-icons">
     
                
                <img src="https://res.cloudinary.com/doctr0fct/image/upload/v1733759374/Assets/images/svgexport-76_gtndts.svg" style={{width :  width < 768 ?  "40px" :" 60px"}}
 onClick={() =>
            handleShareClick(
`mailto:?subject=${encodeURIComponent( shareType == "Profile" ? "Check Out This Profile" :"Check Out This Amazing Story")}&body=${encodeURIComponent(shareUrl)}`
            )
          }

        />
        <img src="https://res.cloudinary.com/doctr0fct/image/upload/v1733755868/Assets/images/svgexport-75_jiabxg.svg" style={{width :  width < 768 ?  "40px" :" 60px"}}
 onClick={() =>
            handleShareClick(
              `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shareUrl
              )}&text=${encodeURIComponent(shareType == "Profile" ? "Check Out This Profile" :"Check Out This Amazing Story")}`
            )
          }

        />
               <img src="https://res.cloudinary.com/doctr0fct/image/upload/v1733755869/Assets/images/svgexport-77_ubgpnv.svg" style={{width :  width < 768 ?  "40px" :" 60px"}}
 onClick={() =>
            handleShareClick(
           `https://api.whatsapp.com/send?text=${encodeURIComponent(
            shareType == "Profile" ? "Check Out This Profile" :"Check Out This Amazing Story" + " " + shareUrl
      )}`
            )
          }

        />
        

<img src="https://res.cloudinary.com/doctr0fct/image/upload/v1733755870/Assets/images/svgexport-80_1_jhad3u.svg"  style={{width :  width < 768 ?  "40px" :" 60px"}}
onClick={() => {
  handleShareClick(
    `https://www.reddit.com/submit?url=${encodeURIComponent(
  shareUrl
)}&title=${encodeURIComponent(shareType == "Profile" ? "Check Out This Profile" :"Check Out This Amazing Story")}`
  )
}}

/>
<img src="https://res.cloudinary.com/doctr0fct/image/upload/v1733758823/Assets/images/telegram_kulvjb.svg" style={{width :  width < 768 ?  "40px" :" 60px"}}
 onClick={() =>
            handleShareClick(
            `https://t.me/share/url?url=${encodeURIComponent(
  shareUrl
)}&text=${encodeURIComponent(shareType == "Profile" ? "Check Out This Profile" :"Check Out This Amazing Story")}`
            )
          }

        
/>

                </span>
            
            </div>
        </form>
    </dialog>
</section>
  )
}

export default Share