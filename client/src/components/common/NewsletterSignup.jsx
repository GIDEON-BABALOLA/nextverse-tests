import "../../styles/components/common/newslettersignup.css"
import { FaTimes } from "react-icons/fa"
import {  useRef, useEffect, useState } from "react"
import useWindowScroll from "../../hooks/useWindowScroll"
import useWindowSize from "../../hooks/useWindowSize"
import { setCookie } from "../../helpers/CookiesConfiguration"
const NewsletterSignup = ({ page, showNewsLetter, setShowNewsLetter}) => {
   const [i, setI] = useState()
   const fullNewsletter = useRef()
   const  { y } = useWindowScroll()
   const { height, width} = useWindowSize()
// const [close, setClose] = useState(null)
const closeNewsletter = () => {
   setShowNewsLetter(false)
}
const subScribeToNewsletter = () => {
   setCookie("newsletter-mode", false, 10)
}
useEffect(() => {
   const scrollPercent = ((y / (parseInt(page.current.scrollHeight) - height)) * 100) + 20;
if(showNewsLetter === true){
   setI( scrollPercent + "%")
}
}, [showNewsLetter])

  return (
    <>
        <main 
      //   style={{top : i}}
        className={`litenote-newsletter-main`}>
   <div className={`litenote-newsletter-container litenote-newsletter-news litenote-newsletter-flow ${showNewsLetter  ? 'slide-down'  : "" }`}   ref={fullNewsletter}>
<div style={{display : 'flex', flexDirection : "row", justifyContent : "space-between"}}>
<div> 
{/* <img src={litenote} alt="lite note" width="150px" height="100" /> */}
      <h2 className="litenote-newsletter-news__title">Sign up for newsletters</h2></div> 

      <svg
      style={{cursor : "pointer"}}
      onClick={closeNewsletter}
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
            <div className="litenote-newsletter-card active">
               <input className="litenote-newsletter-custom" type="checkbox" id="check1"   />
               <label htmlFor="check1">
                  <h5 className="litenote-newsletter-h-five">Fiction</h5>
                  <p className="litenote-newsletter-p">Get Latest fictional stories</p>
               </label>
            </div>
            <div className="litenote-newsletter-card">
               <input className="litenote-newsletter-custom" type="checkbox" id="check2" />
               <label htmlFor="check2">
                  <h5 className="litenote-newsletter-h-five">Non Fiction</h5>
                  <p className="litenote-newsletter-p">The week’s biggest news</p>
               </label>
            </div>
         </div>
         <div className="litenote-newsletter-card__group">
            <div className="litenote-newsletter-card">
               <input className="litenote-newsletter-custom" type="checkbox" id="check3" />
               <label htmlFor="check3">
                  <h5 className="litenote-newsletter-h-five">Adventure</h5>
                  <p className="litenote-newsletter-p">Get Exciting  Adventure Stories </p>
               </label>
            </div>
            <div className="litenote-newsletter-card">
               <input className="litenote-newsletter-custom" type="checkbox" id="check4" checked />
               <label htmlFor="check4">
                  <h5 className="litenote-newsletter-h-five">Lite Note Updates</h5>
                  <p className="litenote-newsletter-p">Announcements and Updates</p>
               </label>
            </div>
         </div>
         <div className="litenote-newsletter-card__group">
            <div className="litenote-newsletter-card">
               <input className="litenote-newsletter-custom" type="checkbox" id="check5" />
               <label htmlFor="check5">
                  <h5 className="litenote-newsletter-h-five">True Life Stories </h5>
                  <p className="litenote-newsletter-p">Get exciting experiences </p>
               </label>
            </div>
            <div className="litenote-newsletter-card">
               <input className="litenote-newsletter-custom" type="checkbox" id="check6" checked />
               <label htmlFor="check6">
                  <h5 className="litenote-newsletter-h-five"> Weekly updates </h5>
                  <p className="litenote-newsletter-p"> update for the week</p>
               </label>
            </div>
         </div>
      </div>
      <div className="litenote-newsletter-news__form">
         <input type="email" placeholder="Enter your email address" />
         <button
         onClick={subScribeToNewsletter}
          className="litenote-newsletter-news__btn">Subscribe</button>
      </div>
   </div>
</main>
    </>
  )
}

export default NewsletterSignup