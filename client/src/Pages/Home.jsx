import PopularStories from "../components/Home/PopularStories"
import Intro from "../components/Home/Intro.jsx"
import Faq from "../components/Home/faq.jsx"
import ChatBot from "../components/ChatBot/ChatBot.jsx"
import NewsletterSignup from "../components/common/NewsletterSignup.jsx"
import Testimonial from "../components/Home/Testimonial.jsx"
import TermsAndConditions from "../components/common/TermsAndConditions.jsx"
import { useState, useEffect, useRef } from "react"
import CookieConsent from "../components/common/CookieConsent.jsx"
import ConnectivityToast from "../components/common/connectivityToast.jsx"
import { TrustedBy } from "../components/Home/TrustedBy.jsx"
import LanguageSelect from "../components/common/LanguageSelect.jsx"
import useNewsletterMode from "../hooks/useNewsletterMode.jsx"
const Home = ({ showTermsAndConditions, setShowTermsAndConditions, setShowCookieConsent, showCookieConsent}) => {
const { newsletterMode } = useNewsletterMode()
console.log(newsletterMode)
  const [showNewsLetter, setShowNewsLetter] = useState(null)
const page = useRef()
useEffect(() => {
  if(newsletterMode){
    setTimeout(() => {
        console.log("Fff")
        setShowNewsLetter(!showNewsLetter)
    }, 3000);
  }


}, [newsletterMode])

  return (
    <>
    <main ref={page}>
    <ConnectivityToast />
    
  
    <NewsletterSignup page={page}
    showNewsLetter={showNewsLetter} setShowNewsLetter={setShowNewsLetter} />
    
    <Intro />
    {/* <LanguageSelect /> */}
    <TermsAndConditions showTermsAndConditions={showTermsAndConditions} setShowTermsAndConditions={setShowTermsAndConditions}/>
    <CookieConsent setShowCookieConsent={setShowCookieConsent} showCookieConsent={showCookieConsent}/>
<PopularStories />
{/* <TrustedBy /> */}
<ChatBot />
<Faq />
<Testimonial />
    </main>
    </>
  )
}

export default Home