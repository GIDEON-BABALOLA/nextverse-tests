import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import ConnectivityToast from './connectivityToast'
const Layout = ({setShowTermsAndConditions, setShowCookieConsent}) => {
  return (
    <>
   
    <NavBar /> 
    <ConnectivityToast />
    <Outlet  />
<Footer setShowTermsAndConditions={setShowTermsAndConditions} setShowCookieContent={setShowCookieConsent}/>
    </>
  )
}
export default Layout