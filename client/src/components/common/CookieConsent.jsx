import "../../styles/components/common/cookie-consent.css"
import { FaCookieBite } from "react-icons/fa"
import { setCookie } from "../../helpers/CookiesConfiguration"
import { useConsentContext } from "../../hooks/useConsentContext"
import { useRef, useState } from "react"
const CookieConsent = () => {
    const {
cookieConsentWrapper,
showCookieConsent,
closeCookieConsent,
cookieConsent
    } = useConsentContext()
    const [readMore, setReadMore] = useState(false)
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
    <div className="litenote-cookie-data" style={{textAlign : "center"}}>
        <p>
            This website use cookies to help you have a superior and more relevant
            browsing experience on the website.
            { readMore && <span className="cookie-consent-read-more">
            Cookies are used to track the activities of our users and helps us to deliver content that  fits the interest of our users, disabling cookies on our website will lead to the inactivity of
            some features on our website.
            <p>
            <span
            style={{textDecoration : "underline", color : "#FF5E62", cursor : "pointer"}}
             onClick={() => { setReadMore(false)}}> Close Read more...</span>
            </p>
            </span> }
            {!readMore && <span  
             style={{textDecoration : "underline", color : "#FF5E62", cursor : "pointer"}}
             onClick={() => { setReadMore(true)}}>Read more...</span>}
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