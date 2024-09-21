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
import GetStartedTimeline from "../components/common/GetStartedTimeline.jsx"
const Home = ({ showTermsAndConditions, setShowTermsAndConditions}) => {
const page = useRef()
  return (
    <>
    <main ref={page}>
    <ConnectivityToast />
    
  
    <NewsletterSignup page={page}/>
    
    <Intro />
    {/* <LanguageSelect /> */}
    <TermsAndConditions showTermsAndConditions={showTermsAndConditions} setShowTermsAndConditions={setShowTermsAndConditions}/>
    <CookieConsent/>
<PopularStories />
<GetStartedTimeline />
{/* <TrustedBy /> */}
<ChatBot />
<Faq />
<Testimonial />
    </main>
    </>
  )
}

export default Home