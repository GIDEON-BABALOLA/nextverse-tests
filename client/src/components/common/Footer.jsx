import "../../styles/components/common/footer.css"
import { FaShieldAlt, FaCookieBite} from "react-icons/fa";
import { FaInstagram, FaTwitter, FaFacebookSquare } from "react-icons/fa";
import { MdLanguage, MdCode, MdInfo } from "react-icons/md";
import { Link } from "react-router-dom"
const Footer = ({ setShowTermsAndConditions, setShowCookieContent}) => {
  return (
  <>
    <footer>
    <div className="footer-content">
      <div className="logo" style={{display : "flex", flexDirection : "column"}}>
      <h6>Legal</h6>
      <div style={{display : "flex", flexDirection : "row", gap : "7px", marginTop : "3%"}}>
      <FaShieldAlt/>
      <span style={{cursor : "pointer"}}
      onClick={() =>  setShowTermsAndConditions(true)}>
      Terms and Conditions 
      
      </span>
      </div>
      <div style={{display : "flex", flexDirection : "row", gap : "7px",  marginTop : "3%"}}>
      <FaCookieBite/>
      <span style={{cursor : "pointer"}}
      onClick={() =>  setShowCookieContent(true)}>
      Cookie Policy
      </span>
      </div>
      </div>
      <div className="logo" style={{display : "flex", flexDirection : "column"}}>
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
      onClick={() =>  setShowCookieContent(true)}>
      About Us
      </span>
      </div>
      </div>
      <div className="logo" style={{display : "flex", flexDirection : "column"}}>
      <h6>Policies</h6>
      
      <div style={{display : "flex", flexDirection : "row", gap : "7px", marginTop : "3%"}}>
      <FaShieldAlt/>
      <span style={{cursor : "pointer"}}
      onClick={() =>  setShowTermsAndConditions(true)}>
    Developers Page
      
      </span>
      </div>
      <div style={{display : "flex", flexDirection : "row", gap : "7px",  marginTop : "3%"}}>
      <FaCookieBite/>
      <span style={{cursor : "pointer"}}
      onClick={() =>  setShowCookieContent(true)}>
      About Us
      </span>
      </div>
      </div>
      <div className="social-links-container">
 <div>
  <MdLanguage size={25}/>&nbsp;Change Language
 </div>
 <div className="social-links">
 <FaFacebookSquare  className="footer-social-icons" size={35}/>
      <FaTwitter  className="footer-social-icons" size={35}/>
      <FaInstagram  className="footer-social-icons" size={35}/>
   
 </div>

      </div>
    </div>
    <p>&copy; 2024 Next Verse. All rights reserved.</p>
  </footer>
  </>
  )
}

export default Footer