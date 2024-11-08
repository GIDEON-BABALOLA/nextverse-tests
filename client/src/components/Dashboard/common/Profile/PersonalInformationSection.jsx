

import useWindowSize from "../../../../hooks/useWindowSize"
import { FaPhoneAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import { MdOutlineCreate } from "react-icons/md"
import { useState } from "react"
const PersonalInformationSection = ({ profile, startEditing }) => {
    const { width } = useWindowSize()
    const [passwordVisibility, setPasswordVisibility] = useState({
        currentPassword : false,
        newPassword : false

    })
    const toggleVisibility = (params) => {
switch (params) {
    case "currentPassword":
        setPasswordVisibility((prevState) => {
            const { currentPassword } = prevState;
            return {...prevState, currentPassword : !currentPassword}
        })
        break;
    case "newPassword":
        setPasswordVisibility((prevState) => {
            const { newPassword } = prevState;
            return {...prevState, newPassword : !newPassword}
        })
        break;
}
    }
  return (
    <>
        { profile["personal"] ? <div className="dashboard-profile-page-personal-information"
>
<section style={{display : "flex", flexDirection : "row", justifyContent : "space-between",
marginBottom : "10px"
}}>
<h4><b>Personal Information</b></h4>
<div
onClick={() => { startEditing("personal")}}
 style={{display : "flex", flexDirection  :"row", alignItems : "center", gap : "1px",
border : "1px solid #777777",
justifyContent : "space-around",
padding : "5px 15px",
borderRadius : "5px",
cursor  :"pointer"
}}>
    <MdOutlineCreate /> Edit
  </div>
</section>
<section className="dashboard-profile-page-personal-full-information">
<section style={{display : "flex", flexDirection : "column", gap : "20px"}}>
<div className="personal-small-details">
<span>
<h6>
Username
</h6></span>
<span>
Gideon Babalola</span>
</div>
<div className="personal-small-details">
<span>
<h6>
  Email address
  </h6>
</span>
<span>
  gideonbabalola69@gmail.com
</span>
</div>
<div className="personal-small-details">
<span>
<h6>
Bio
</h6>
</span>
<span>Software Engineer</span>

</div>
</section>
<section style={{display : "flex", flexDirection : "column", gap : "20px"}}>
<div className="personal-small-details">
<span>
<h6>
Password
</h6></span>
<span itemType="password">••••••••••••</span>
</div>
<div className="personal-small-details">
<span>
<h6>
  Phone Number
  </h6>
</span>
<span>
  +2348149787227
</span>
</div>
</section>
</section>
</div>
:
<div className="dashboard-profile-page-edit-personal-information" style={{display : "flex", flexDirection : "column", justifyContent : "space-between", gap : "10px"}}>
<div>
<h4><b>Mobile Number</b></h4>
<span>Manage Your Accout Mobile Number For Litenote</span>
<section className="editme-profile-page-photo-section-second" style={{padding : "0px 0px"}}>
  <div style={{display : width > 768 && "flex", flexDirection : width > 768 && "row", justifyContent : width > 768 && "space-between",
  marginTop : "5px"
  }}>
  <div style={{display :"flex", flexDirection : "column", gap : "3px"}}>
Current Number
<input type="text" value={"08149787227"}></input>
<FaPhoneAlt style={{position : "relative", left  :"275px", bottom : "30px"}} />
<span style={{position : "fixed", left : "245px", bottom : "335px"}}>

</span>

  </div>
  <div style={{display :"flex", flexDirection : "column", gap : "3px"}}>
 New Number
  <input type="text" value={"+234"}></input>
  <FaPhoneAlt style={{position : "relative", left  :"275px", bottom : "30px"}} />
  </div>

  </div>
</section>
</div>





<div>
<h4><b>Password</b></h4>
<span>Modify Your Current Password</span>

<section className="editme-profile-page-photo-section-second" style={{padding : "0px 0px"}}>
  <div style={{display : width > 768 && "flex", flexDirection : width > 768 && "row", justifyContent : width > 768 && "space-between",
  marginTop : "5px"
  }}>
  <div style={{display :"flex", flexDirection : "column", gap : "3px"}}>
Current Password
<input
style={{fontSize: "1.5rem", paddingLeft : "30px"}}
 type={passwordVisibility["currentPassword"] ? "text" : "password"} value={"currentpassword"}></input>

<FaLock size={10} style={{position : "relative", left  :"10px", bottom : "30px"}} />
{ passwordVisibility["currentPassword"] ? 
    <FaEyeSlash
    onClick={()=> toggleVisibility("currentPassword")}
     size={10} style={{position : "relative", left  :"280px", bottom : "45px", cursor : "pointer"}} />
 : <FaEye size={10} style={{position : "relative", left  :"280px", bottom : "45px", cursor : "pointer"}} 
onClick={()=> toggleVisibility("currentPassword")}

 />
 }




  </div>
  <div style={{display :"flex", flexDirection : "column", gap : "3px"}}>
 New Password
  <input  value={"currentpassword"}
  type={passwordVisibility["newPassword"] ? "text" : "password"}
  style={{fontSize: "1.5rem", paddingLeft : "30px"}}
  ></input>
  <FaLock size={10} style={{position : "relative", left  :"10px", bottom : "30px"}} />
  { passwordVisibility["newPassword"] ? 
    <FaEyeSlash
    onClick={()=> toggleVisibility("newPassword")}
     size={10} style={{position : "relative", left  :"280px", bottom : "45px", cursor : "pointer"}} />
 : <FaEye size={10} style={{position : "relative", left  :"280px", bottom : "45px", cursor : "pointer"}} 
onClick={()=> toggleVisibility("newPassword")}

 />
 }
  </div>

  </div>

</section>
</div>

<div>
<h4><b>Bio</b></h4><section className="editme-profile-page-photo-section-second" style={{padding : "0px 0px"}}>
  <div style={{display : width > 768 && "flex", flexDirection : width > 768 && "row", justifyContent : width > 768 && "space-between",
  marginTop : "5px"
  }}>
  <div style={{display :"flex", flexDirection : "column", gap : "3px"}}>
Current Bio Information
<input  value={"I am a great writer"}
  type="text"
  style={{fontSize: "1.2rem"}}
  ></input>





  </div>
  <div style={{display :"flex", flexDirection : "column", gap : "3px"}}>
 New Bio Information
  <input  value={"Technical Writer"}
  type="text"
  style={{fontSize: "1.2rem"}}
  ></input>

  </div>

  </div>
  <div style={{display : "flex", flexDirection : "row", alignItems : "flex-end", justifyContent : "flex-start"}}>
  <span className="save-changes" onClick={() => { startEditing("personal")}}>
    Save Changes
    </span>
  </div>
</section>
</div>
</div>
        }
    </>
  )
}

export default PersonalInformationSection