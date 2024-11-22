import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import "../../../styles/components/Dashboard/common.css"
import ChatBot from '../../ChatBot/ChatBot'
import ConnectivityToast from '../../common/connectivityToast'
const DashboardLayout = ({sidebarRef, dashboardToast, setDashboardToast}) => {
  const style = {
    fontSize : "14px"
  }
  return (
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
  )
}
export default DashboardLayout