

import useWindowSize from "../../../../hooks/useWindowSize"
import { FaPhoneAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import { MdOutlineCreate } from "react-icons/md"
import { bioSuggestions } from "../../../../helpers/bioSuggestions"
import { useUpdateAUser } from "../../../../hooks/useUpdateAUser"
import { cleanObject } from "../../../../helpers/CleanObject"
import { useToastContext } from "../../../../hooks/useToastContext"
import LoadingSpinner from "../../../Loaders/LoadingSpinner"
import { useEffect } from "react"
import { passwordValidate, mobileValidate } from "../../../../helpers/Validator"
import { useState } from "react"
const PersonalInformationSection = ({ profile, startEditing, dashboardProfile, setDashboardProfile }) => {
   const {updateAUser, isLoading, error : updateError, data, statusCode } = useUpdateAUser()
   const { showToast } = useToastContext();
   const initialUpdateData = 
    {
      mobile : "+234",
      password : "",
      bio : bioSuggestions()
     }
   
   const [updateData, setUpdateData] = useState(initialUpdateData)
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
  const saveChanges =  () => {
          if(updateData.mobile  &&  updateData.mobile !== "+234" && !mobileValidate(updateData.mobile) ){
            showToast("Error", "Pls Enter Your Correct Nigerian Number")
            return;
          }
          if(updateData.password && passwordValidate(updateData.password) !== true){
            showToast("Error", passwordValidate(updateData.password), false)
            return;
          }
          if(!updateData.password && !updateData.mobile && !updateData.bio){
            showToast("Error", "Pls Enter The Values You Want To Update", false)
            return;
          }
          let sentData;
          if(updateData.mobile == "+234"){
            sentData = cleanObject({...updateData, mobile : ""})
          }else{
            sentData = cleanObject({...updateData})
          }
          
          console.log(sentData);
          updateAUser(sentData)
  }
        useEffect(() => {
  if(Object.keys(data).length !== 0 && statusCode ==  200){
    showToast("Success", data.message, true)
    setDashboardProfile((prev) => {
      const allowedFields = Object.keys(prev); // Get the allowed keys from initial state
  
      const filteredUserData = Object.keys(data.user).reduce((acc, key) => {
        if (allowedFields.includes(key)) {
          acc[key] = data.user[key]; // Only include allowed fields
        }
        return acc;
      }, {});
      return { ...prev, ...filteredUserData }; // Update state with filtered data

    });
    setUpdateData(initialUpdateData)
    startEditing("personal")
  }
  if(updateError){
    showToast("Error", updateError.message, false)
  }
        }, [data, updateError, statusCode])
  
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
<span className="stats-numbers">
Username
</span></span>
<span className="stats-small-numbers" >{dashboardProfile.username}</span>
</div>
<div className="personal-small-details">
<span>
<span className="stats-numbers">
  Email address
  </span>
</span>
<span className="stats-small-numbers" >
  {dashboardProfile.email}
</span>
</div>
<div className="personal-small-details">
<span>
<span className="stats-numbers">
Bio
</span>
</span>
<span className="stats-small-numbers">{dashboardProfile.bio}</span>

</div>
</section>
<section style={{display : "flex", flexDirection : "column", gap : "20px"}}>
<div className="personal-small-details">
<span>
<span className="stats-numbers">
Password
</span></span>
<span itemType="password">••••••••••••</span>
</div>
<div className="personal-small-details">
<span>
<span className="stats-numbers">
  Phone Number
  </span>
</span>
<span className="stats-small-numbers">
  {dashboardProfile.mobile}
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
<input type="text" value={dashboardProfile.mobile}></input>
<FaPhoneAlt style={{position : "relative", left  :"275px", bottom : "30px"}} />
<span style={{position : "fixed", left : "245px", bottom : "335px"}}>

</span>

  </div>
  <div style={{display :"flex", flexDirection : "column", gap : "3px"}}>
 New Number
  <input type="text" value={updateData.mobile} onChange={(e) => {
    setUpdateData((prev) => {
      return {...prev, mobile : e.target.value}
    })
  }}></input>
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
  <input  
  type={passwordVisibility["newPassword"] ? "text" : "password"}
  value={updateData.password}
  onChange={(e) => {
    setUpdateData((prev) => {
      return {...prev, password : e.target.value}
    })
  }}
  style={{fontSize: "1.5rem", paddingLeft : "30px"}}
  ></input>
  <FaLock size={10} style={{position : "relative", left  :"10px", bottom : "30px"}} />
  { passwordVisibility["newPassword"] ? 
    <FaEyeSlash
    onClick={()=> toggleVisibility("newPassword")}
     size={15} style={{position : "relative", left  :"280px", bottom : "45px", cursor : "pointer"}} />
 : <FaEye size={15} style={{position : "relative", left  :"280px", bottom : "45px", cursor : "pointer"}} 
onClick={()=> toggleVisibility("newPassword")}

 />
 }
  </div>

  </div>

</section>
</div>

<div>
<h4><b>Bio</b></h4><section className="editme-profile-page-photo-section-second" style={{padding : "0px 0px"}}>
  <div 
  className="bio-info-input"
  style={{display : width > 768 && "flex", flexDirection : width > 768 && "row", justifyContent : width > 768 && "space-between",
  marginTop : "5px"
  }}>
  <div style={{display :"flex", flexDirection : "column", gap : "3px"}}>
Current Bio Information
<input  value={dashboardProfile.bio}
  type="text"
  style={{fontSize: "1.2rem"}}
  ></input>





  </div>
  <div style={{display :"flex", flexDirection : "column", gap : "3px"}}>
 New Bio Information
  <input  value={updateData.bio}
  onChange={(e) => {
    setUpdateData((prev) => {
      return {...prev, bio : e.target.value}
    })
  }}
  type="text"
  style={{fontSize: "1.2rem"}}
  ></input>

  </div>

  </div>
  <div style={{display : "flex", flexDirection : "row", alignItems : "flex-end", justifyContent : "space-between", marginTop : "10px"}}>

      <span className="save-changes" onClick={() => saveChanges()}>
        {
          isLoading ? 
          <span style={{padding : "30px 30px"}}>
          <LoadingSpinner/>
          </span>
           : "Save Changes"
        }
        </span>
        <span className="save-changes" onClick={() => startEditing("personal")}>
       Cancel
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