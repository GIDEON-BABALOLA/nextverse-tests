import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import ConnectivityToast from './connectivityToast'
import CookieConsent from "../common/CookieConsent"
import NewsletterSignup from './NewsletterSignup'
import TermsAndConditions from './TermsAndConditions'
const Layout = () => {
  return (
    <>
  <div>
    <NavBar /> 
    <Outlet  />
     {/* This Component Does Not Affect The Outlet Because Of Its Position */}
    <ConnectivityToast />
    <CookieConsent />
    <NewsletterSignup />
    <TermsAndConditions />
<Footer/>
</div>
    </>
  )
}
export default Layout