import { MdLogout } from "react-icons/md"
const LogoutConsent = ({ setOpenModal }) => {
  return (
<>
<div>
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
                    <span 
                    
                    style={{ cursor : "pointer" , paddingTop : "4%", paddingBottom : "4%", backgroundColor : "#FF5E62 !important", }}>Yes, logout</span>
                    <span style={{border : "none", backgroundColor : "#E5E5E5", cursor : "pointer",  paddingTop : "4%", paddingBottom : "4%"}}
                    onClick={() =>{setOpenModal(false)}}
                    ><b>Cancel</b></span>
                    </div>
</div>
</>
  )
}

export default LogoutConsent 