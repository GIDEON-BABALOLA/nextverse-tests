import { MdLogout } from "react-icons/md"
import { useLogoutAccount } from "../../hooks/useLogOutAccount"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToastContext } from "../../hooks/useToastContext";
import SpinnerLoader from "../Loaders/SpinnerLoader";
import { useAuthContext } from "../../hooks/useAuthContext";
const LogoutConsent = ({ setOpenModal }) => {
  const router = useNavigate()
  const  {logoutAccount, isLoading, error, data, statusCode} = useLogoutAccount();
  const { dispatch } = useAuthContext();
  const { showToast } = useToastContext()
  useEffect(() => {
    if(error){
showToast("Error", error, false)
    }
  }, [error, showToast])
  useEffect(() => {
    if(statusCode == 204){
    dispatch({type : "LOGOUT"})
      showToast("Success", "Successfully Logged Out", true)
      setTimeout(() => {
        router("/login")
      }, 2000);
    }
  }, [data, statusCode, router, showToast, dispatch])
  const handleLogOut = () => {
    logoutAccount();
  }
  return (
<>
<div style={{overflowY : "hidden", overflowX : "hidden"}}>
<MdLogout
size={80} 
style={{color: "#FF5E62", backgroundColor : "#E5E5E5",borderRadius : "50%", padding : "5%",
background : "rgba(239, 179, 180, 0.3)",

}}
  />
</div>
<div style={{marginTop : "5% "}}>
<b>
<h2>
Already Leaving?
</h2>
</b>
</div>
<div style={{color : "#777777", textDecoration : "bold"}}>

Are you sure you want to log out?
</div>

<div>
<div className="preview-user-action-buttons">
                  
                 {   <span style={{border : "none", color:  "white",  backgroundColor : "#FF5F62", cursor : "pointer",  paddingTop : "4%", paddingBottom : "4%"}}
                    onClick={() =>{handleLogOut()}}
                    >
                    {isLoading ? 
                      <section style={{display : "flex", alignItems :"center", justifyContent : "center"}}>
  <SpinnerLoader width={15} />
  </section>
                    : 
                    <section style={{paddingTop : "1%", paddingBottom : "1%"}}>Yes, Logout</section>
                  }
                  
                    
                    </span>
                    
                    }
                    <span style={{border : "none", backgroundColor : "#E5E5E5", cursor : "pointer",  paddingTop : "4%", paddingBottom : "4%"}}
                    onClick={() =>{setOpenModal(false)}}
                    ><b>Cancel</b></span>
                    </div>
</div>
</>
  )
}

export default LogoutConsent 