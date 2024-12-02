import "../../styles/components/common/newslettersignup.css"
import {  useState, useEffect, useRef} from "react"
import useWindowSize from "../../hooks/useWindowSize"
import SpinnerLoader from "../Loaders/SpinnerLoader"
import { useConsentContext } from "../../hooks/useConsentContext"
import { useNewsletterSignup } from "../../hooks/useNewsletterSignup"
import { emailValidate } from "../../helpers/Validator"
import SpecialModal from "./SpecialModal"
import Recaptcha from "./Recaptcha"
import { useToastContext } from "../../hooks/useToastContext"
import { setCookie } from "../../helpers/CookiesConfiguration"
const NewsletterSignup = () => {
   const recaptchaRef = useRef(null);
   const { closeNewsletter, newsletter, showNewsLetter } = useConsentContext()
   const [openModal, setOpenModal] = useState(false)
   const { showToast } = useToastContext()
   const [email, setEmail] = useState()
   const [captchaValue, setCaptchaValue] = useState(null)
   const {newsletterSignup, isLoading, error, data, statusCode } = useNewsletterSignup()
   const fullNewsletter = useRef()
   const {  width } = useWindowSize()
   const [newsletterOptions, setNewsLetterOptions] = useState({
      fiction : false,
      nonFiction : false,
      adventure : false,
      liteNoteUpdates : true,
      romance : false,
      weeklyUpdates : true
   })
   useEffect(() => {
      if(error){
         setCaptchaValue(null)
recaptchaRef.current.reset();
         setEmail("")
  showToast("Error", error, false)
      }
    }, [error, showToast])
  
    useEffect(() => {
  if(data.message){
   setCaptchaValue(null)
   recaptchaRef.current.reset();
    const { message } = data
    setCookie("newsletter-mode", "true", 30) 
    showToast("Success", message, true)
    showNewsLetter(false)
    setEmail("")
  }
    }, [data, statusCode, showToast])

const subScribeToNewsletter = () => {
   const trueEmail = emailValidate(email)
   if(!trueEmail){
      showToast("Error", "Please Enter A Valid Email", false)
      return;
         }
   if(!captchaValue){
      setOpenModal(true)
      return
   }

   const newObj = {}
   Object.entries(newsletterOptions).map(([key, value]) => {
      if(value == true){
         newObj[key] = key;
      }
    });
   newsletterSignup(email, Object.keys(newObj), captchaValue)
}
useEffect(() => {
if(captchaValue){
   setTimeout(() => {
      setOpenModal(!openModal)      
   }, 1000);
   setTimeout(() => {
      subScribeToNewsletter()     
   }, 2000);
 

}
}, [captchaValue])




const pickAnOption = (e) => {
   const optionKey =  e.currentTarget.id.replace("check", "");
   const optionMapping = {
     1: "fiction",
     2: "nonFiction",
     3: "adventure",
     4: "liteNoteUpdates",
     5: "romance",
     6: "weeklyUpdates"
   };

   const selectedOption = optionMapping[optionKey];
   setNewsLetterOptions(prevState => ({
      ...prevState,
      [selectedOption]: !prevState[selectedOption]
   }));
}

  return (
    <>
       <SpecialModal openModal={openModal} setOpenModal={setOpenModal}  content={<Recaptcha message={true} setCaptchaValue={setCaptchaValue} ref={recaptchaRef}/>} height={200} width={400}/>
        <main 
        className={`litenote-newsletter-main`}>
   <div className={`litenote-newsletter-container litenote-newsletter-news litenote-newsletter-flow ${newsletter  ? 'slide-down'  : "" }`}   ref={fullNewsletter}>
<div style={{display : 'flex', flexDirection : "row", justifyContent : "space-between"}}>
<div> 
{/* <img src={litenote} alt="lite note" width="150px" height="100" /> */}
      <h2 className="litenote-newsletter-news__title">Sign up for newsletters</h2></div> 

      <svg
      style={{cursor : "pointer"}}
      onClick={() => {
         closeNewsletter()
      }}
       xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width= {width < 768 ? "20" : "50"} height= {width < 768 ? "20" : "50"} viewBox="0 0 256 256" xmlSpace="preserve">

<defs>
</defs>
<g style={{stroke: "none", strokeWwidth: 0, strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "none", fillRule: "nonzero", opacity: 1}} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
	<path d="M 21.607 89.348 L 0.652 68.393 c -0.869 -0.869 -0.869 -2.279 0 -3.149 L 65.244 0.652 c 0.869 -0.869 2.279 -0.869 3.149 0 l 20.955 20.955 c 0.869 0.869 0.869 2.279 0 3.149 L 24.756 89.348 C 23.887 90.217 22.477 90.217 21.607 89.348 z" style={{stroke: "none", strokeWidth: 1, strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "rgb(0,0,0)", fillRule: "nonzero", opacity: 1,}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
	<path d="M 89.348 68.393 L 68.393 89.348 c -0.869 0.869 -2.279 0.869 -3.149 0 L 0.652 24.756 c -0.869 -0.869 -0.869 -2.279 0 -3.149 L 21.607 0.652 c 0.869 -0.869 2.279 -0.869 3.149 0 l 64.592 64.592 C 90.217 66.113 90.217 67.523 89.348 68.393 z" style={{stroke: "none",  strokewidth: 1, strokeDasharray: "none", strokeLinecap: "butt", strokeLinejoin: "miter", strokeMiterlimit: 10, fill: "rgb(0,0,0)", fillRule: "nonzero", opacity: 1}} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
</g>
</svg>





</div>
   
      <div className="litenote-newsletter-news-grid">
         <div className="litenote-newsletter-card__group">
            <div 
              onClick={pickAnOption}
              id="check1"
            className={`litenote-newsletter-card active  ${newsletterOptions["fiction"] ? "golang" : "" }`}>
          <input className="litenote-newsletter-custom" type="checkbox" id="check1"  
            
            //   checked={newsletterOptions["fiction"]}
             
                />
          
               <label htmlFor="check1">
                  <h5 className="litenote-newsletter-h-five">Fiction</h5>
                  <p className="litenote-newsletter-p" style={{fontSize : "1.2rem"}}>Get Latest fictional stories</p>
               </label>
            </div>
            <div
                      onClick={pickAnOption}
                      id="check2"
             className={`litenote-newsletter-card  ${newsletterOptions["nonFiction"] ? "golang" : "" }`}
             
             >
               <input className="litenote-newsletter-custom" type="checkbox" id="check2"
          
                    
         
                />
               <label htmlFor="check2">
                  <h5 className="litenote-newsletter-h-five">Non Fiction</h5>
                  <p className="litenote-newsletter-p" style={{fontSize : "1.2rem"}}>The week’s biggest news</p>
               </label>
            </div>
         </div>
         <div className="litenote-newsletter-card__group">
            <div 
                 onClick={pickAnOption}
                      id="check3"
                      className={`litenote-newsletter-card  ${newsletterOptions["adventure"] ? "golang" : "" }`}
            >
               <input className="litenote-newsletter-custom" type="checkbox" id="check3"
               
             
               
                />
               <label htmlFor="check3">
                  <h5 className="litenote-newsletter-h-five">Adventure</h5>
                  <p className="litenote-newsletter-p" style={{fontSize : "1.2rem"}}>Get Exciting  Adventure Stories </p>
               </label>
            </div>
            <div
             onClick={pickAnOption}
                      id="check4"
                      className={`litenote-newsletter-card  ${newsletterOptions["liteNoteUpdates"] ? "golang" : "" }`}
            
            >
               <input className="litenote-newsletter-custom" type="checkbox" id="check4"
                     
         
               />
               <label htmlFor="check4">
                  <h5 className="litenote-newsletter-h-five">Lite Note Updates</h5>
                  <p className="litenote-newsletter-p" style={{fontSize : "1.2rem"}}>Announcements and Updates</p>
               </label>
            </div>
         </div>
         <div className="litenote-newsletter-card__group">
            <div 
             id="check5"
             onClick={pickAnOption}
             className={`litenote-newsletter-card  ${newsletterOptions["romance"] ? "golang" : "" }`}
             
             >
               <input className="litenote-newsletter-custom" type="checkbox" id="check5"
              
         
               />
               <label htmlFor="check5">
                  <h5 className="litenote-newsletter-h-five">Romance</h5>
                  <p className="litenote-newsletter-p" style={{fontSize : "1.2rem"}}>Get exciting experiences </p>
               </label>
            </div>
            <div
            id="check6"
             onClick={pickAnOption}
             className={`litenote-newsletter-card  ${newsletterOptions["weeklyUpdates"] ? "golang" : "" }`}
             
            >
               <input className="litenote-newsletter-custom" type="checkbox" id="check6"
          />
               <label htmlFor="check6">
                  <h5 className="litenote-newsletter-h-five">Weekly Updates</h5>
                  <p className="litenote-newsletter-p" style={{fontSize : "1.2rem"}}>Get Updates Every Week</p>
               </label>
            </div>
        
         </div>
      </div>
      <div className="litenote-newsletter-news__form">
         <input type="email" placeholder="Enter your email address" value={email} 
onChange={(e) => setEmail(e.target.value)}

         />
         <button
         onClick={subScribeToNewsletter}
          className="litenote-newsletter-news__btn" style={{fontSize : "1.4rem"}}>
          { isLoading ?
            <span style={{display : "flex", alignItems :"center", justifyContent : "center"}}>
  <SpinnerLoader width={15} />
  </span> 
          :
          <span className="special-modal-client">
Subscribe
          </span>
       
          }
          
          </button>
      </div>
   </div>
</main>
    </>
  )
}

export default NewsletterSignup