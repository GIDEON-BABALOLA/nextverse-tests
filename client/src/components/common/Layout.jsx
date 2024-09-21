import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import ConnectivityToast from './connectivityToast'
const Layout = ({setShowTermsAndConditions}) => {
  return (
    <>
  <div>
    <NavBar /> 
    <ConnectivityToast />
    <Outlet  />
<Footer setShowTermsAndConditions={setShowTermsAndConditions}/>
</div>
    </>
  )
}
export default Layout