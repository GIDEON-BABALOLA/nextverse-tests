import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import "../../../styles/components/Dashboard/common.css"
import { Navigate } from 'react-router-dom'
import ChatBot from '../../ChatBot/ChatBot'
import LoadingPage from '../../../Pages/LoadingPage'
import { useAuthContext } from '../../../hooks/useAuthContext'
import ConnectivityToast from '../../common/connectivityToast'
const DashboardLayout = ({sidebarRef, dashboardToast, setDashboardToast}) => {
  const { user, appLoading } = useAuthContext();
  const style = {
    fontSize : "14px"
  }
  return (
    <>
    { 
      appLoading ? (
      <LoadingPage /> 
      )
      : user ? (
      <>
    <section className='full-dashboard'>
    <ConnectivityToast/>
    <div className='litenote-dashboard-container'>
    <SideBar sidebarRef={sidebarRef} style={style} dashboardToastRef={dashboardToast} setDashboardToast={setDashboardToast}/>
    <Outlet />
    </div>
    </section>
<ChatBot />
</>
      ) : (
        <Navigate to={"/login"}/>
      )
 
    }
    </>
  )
}
export default DashboardLayout