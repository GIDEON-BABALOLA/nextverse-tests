import "../../styles/components/common/cookie-consent.css"
import { FaCookieBite } from "react-icons/fa"
import { setCookie } from "../../helpers/CookiesConfiguration"
import { useConsentContext } from "../../hooks/useConsentContext"
import { useRef } from "react"
const CookieConsent = () => {
    const {
cookieConsentWrapper,
showCookieConsent,
closeCookieConsent,
cookieConsent
    } = useConsentContext()
    let startX, startY, endX, endY;
    const minSwipeDistance = 50;
    const handleTouchStart = (event) => {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    console.log("start")
      }
    const handleTouchEnd = (event) => {
        endX = event.changedTouches[0].clientX;
        endY = event.changedTouches[0].clientY;
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        console.log(deltaY)
    
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
           console.log("left")
          } else {
        showCookieConsent(false)
        
          }
        }
      }
    const buttons = useRef()

  return (
    <div className={`litenote-cookie-wrapper ${cookieConsent ? "show" : ""}`} 
    onTouchStart={handleTouchStart}
    ref={cookieConsentWrapper} onTouchEnd={handleTouchEnd}>
<header className="litenote-cookie-header">

    
<h3>
<FaCookieBite  style={{transform : ""}}
    className="cookie-image"
    size={30}
/>
        &nbsp;&nbsp;Cookies Constent
    
</h3>
</header>
    <div className="litenote-cookie-data">
        <p>
            This website use cookies to help you have a superior and more relevant
            browsing experience on the website.
            <a href="#">Read more...</a>
        </p>
        </div>


    <div className="litenote-cookie-buttons" ref={buttons}>
        <button className="litenote-cookie-button" id="acceptBtn" onClick={()=> {
               setCookie("cookie-consent", true, 30); //cookie consent will only appear 30 days, after if you accept it
               showCookieConsent(false)
        }}>Accept</button>
        <button className="litenote-cookie-button decline" onClick={() => {
          closeCookieConsent()
        }}>Decline</button>
    </div>

</div>
  )
}

export default CookieConsent