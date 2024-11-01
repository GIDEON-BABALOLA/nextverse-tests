import PopularStories from "../components/Home/PopularStories"
import { PopularStoriesContextProvider } from "../context/PopularStoriesContext.jsx"
import Intro from "../components/Home/Intro.jsx"
import Faq from "../components/Home/faq.jsx"
import ChatBot from "../components/ChatBot/ChatBot.jsx"
import NewsletterSignup from "../components/common/NewsletterSignup.jsx"
import Testimonial from "../components/Home/Testimonial.jsx"
import { useRef } from "react"
import ConnectivityToast from "../components/common/connectivityToast.jsx"
import { TrustedBy } from "../components/Home/TrustedBy.jsx"
import GetStartedTimeline from "../components/common/GetStartedTimeline.jsx"
const Home = () => {
const page = useRef()
  return (
    <>
    <main ref={page}>
    <ConnectivityToast />
    
  
    <NewsletterSignup page={page}/>
    
    <Intro />
    {/* <LanguageSelect /> */}
    <PopularStoriesContextProvider>
    <PopularStories />
    </PopularStoriesContextProvider>

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