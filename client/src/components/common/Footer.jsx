import "../../styles/components/common/footer.css"
import { FaShieldAlt, FaCookieBite} from "react-icons/fa";
import { FaInstagram, FaTwitter, FaFacebookSquare } from "react-icons/fa";
import { MdLanguage, MdCode, MdInfo } from "react-icons/md";
import { Link } from "react-router-dom"
import { useState } from "react"
import LanguageSelect from "./LanguageSelect";
import SpecialModal from "../../components/common/SpecialModal"
import { useConsentContext } from "../../hooks/useConsentContext";
import gsap from "gsap";
const Footer = () => {
  const { showCookieConsent,
     cookieConsentWrapper,
     showTermsAndConditions,
     showNewsLetter
    } = useConsentContext()
  const [openModal, setOpenModal] = useState(false)
  const showLanguageModal = () => {
    setOpenModal(true)
  }
  return (
  <>
    <footer>
    <SpecialModal openModal={openModal} setOpenModal={setOpenModal} title="Language Select" content={<LanguageSelect />}/>
    <div className="footer-content">
      <div className="logo" style={{display : "flex", flexDirection : "column", gap : "20px"}}>
      <h6>Legal</h6>
      <div style={{display : "flex", flexDirection : "row", gap : "7px", marginTop : "3%"}}>
      <FaShieldAlt/>
      <span style={{cursor : "pointer"}}
      onClick={() =>  showTermsAndConditions(true)}>
      Terms and Conditions 
      
      </span>
      </div>
      <div style={{display : "flex", flexDirection : "row", gap : "7px",  marginTop : "3%"}}>
      <FaCookieBite/>
      <span style={{cursor : "pointer"}}
      onClick={() => { showCookieConsent(true);
        setTimeout(() => {
                gsap.to(cookieConsentWrapper.current, {
                    y: 1,
                    rotation: 3,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    duration: 0.4
                })
            }, 2000);
      }}>
      Cookie Policy
      </span>
      </div>
      </div>
      <div className="logo" style={{display : "flex", flexDirection : "column", gap : "20px"}}>
      <h6>Company</h6>
      
      <div style={{display : "flex", flexDirection : "row", gap : "7px", marginTop : "3%"}}>
      {/* <MdCode size={20}/> */}
      <span style={{cursor : "pointer"}}>
      <Link to = "our-team">
      {"< />"} Our Team

      </Link>
   
      
      </span>
      </div>
      <div style={{display : "flex", flexDirection : "row", gap : "7px",  marginTop : "3%"}}>
      <MdInfo size={15}/>
      <span style={{cursor : "pointer"}}
      onClick={() =>  showCookieConsent(true)}>
      About Us
      </span>
      </div>
      </div>
      <div className="logo" style={{display : "flex", flexDirection : "column", gap : "20px"}}>
      <h6>Policies</h6>
      
      <div style={{display : "flex", flexDirection : "row", gap : "7px", marginTop : "3%"}}>
      <FaShieldAlt/>
      <span style={{cursor : "pointer"}}
     >
     <Link to = "our-developers">
     Developers Page

      </Link>
  
      
      </span>
      </div>
      <div style={{display : "flex", flexDirection : "row", gap : "7px",  marginTop : "3%"}}>
      <FaCookieBite/>
      <span style={{cursor : "pointer"}}
      onClick={() =>  showNewsLetter(true)}>
      Join Our Newsletter
      </span>
      </div>
      </div>
      <div className="social-links-container">
 <div onClick={showLanguageModal} style={{cursor : "pointer"}}>
  <MdLanguage size={25}/>&nbsp;Change Language
 </div>
 <div className="social-links">
 <FaFacebookSquare  className="footer-social-icons" size={35}/>
      <FaTwitter  className="footer-social-icons" size={35}/>
      <FaInstagram  className="footer-social-icons" size={35}/>
   
 </div>

      </div>
    </div>
    <p style={{marginTop : "60px"}}>&copy; 2024 Next Verse. All rights reserved.</p>
  </footer>
  </>
  )
}

export default Footer