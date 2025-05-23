import PopularStories from "../components/Home/PopularStories"
import { TrustedBy } from "../components/Home/TrustedBy.jsx"
import { PopularStoriesContextProvider } from "../context/PopularStoriesContext.jsx"
import Intro from "../components/Home/Intro.jsx"
import Faq from "../components/Home/faq.jsx"
import ChatBot from "../components/ChatBot/ChatBot.jsx"
import NewsletterSignup from "../components/common/NewsletterSignup.jsx"
import Testimonial from "../components/Home/Testimonial.jsx"
import { useAuthContext } from "../hooks/useAuthContext.jsx"
import { useRef } from "react"
import GetStartedTimeline from "../components/common/GetStartedTimeline.jsx"
import { useThemeContext } from "../hooks/useThemeContext.jsx"
import { useModalContext } from "../hooks/useModalContext.jsx"
import GoogleOneTap from "../components/Dashboard/common/GoogleOneTap.jsx"
import { useEffect } from "react"
const Home = () => {
  useEffect(()=>{
if (!import.meta.env.VITE_REACT_GOOGLE_AUTHENTICATION_REDIRECT_URI ||
    !import.meta.env.VITE_REACT_GOOGLE_AUTHENTICATION_CLIENT_ID) {
  console.error("Google OAuth env variables are missing!");
}
else{
console.log("Google OAuth env variables are not missing!")
}
  }, [])

  const { closeContextMenu } = useModalContext()
  const { user, appLoading } = useAuthContext()
  const { colorMode } = useThemeContext()
const page = useRef()
useEffect(() => {
  if(colorMode == ""){
    document.body.classList.remove("dark-theme-variables")
  }
switch (colorMode) {
case "dark-mode":
  document.body.classList.remove("dark-theme-variables")
  break;
  case "light-mode":
      document.body.classList.remove("dark-theme-variables")
  break;
}
}, [colorMode])
  return (
    <>
    <main ref={page} onClick={closeContextMenu}>
    <NewsletterSignup page={page}/>
    
    <Intro />
       { !user && !appLoading && <GoogleOneTap /> }

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