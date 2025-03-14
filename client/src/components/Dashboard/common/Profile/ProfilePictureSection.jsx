
import useWindowSize from "../../../../hooks/useWindowSize"
// dashboard-profile-page-loading-avatar
import { MdOutlineCreate } from "react-icons/md"
import { useEffect, useState } from "react"
import useImageLoad from "../../../../hooks/useImageLoaded"
import { useAuthContext } from "../../../../hooks/useAuthContext"
const ProfilePictureSection = ({ profile, startEditing, dashboardProfile }) => {
    const { user } = useAuthContext();
    useEffect(() => {
      
    })
    const [avatarLoading, setAvatarLoading] = useState(true)
    let profileImage = dashboardProfile.picture
    const { width } = useWindowSize() 
    const { loaded, error} = useImageLoad(profileImage) //This is hard coded
useEffect(() => {
if(loaded){
    setAvatarLoading(false)
}
if(error){
setAvatarLoading(true)
}
}, [error, loaded])
const saveChanges = () => {
  startEditing("names")
}
const uploadNewPicture = () => {

}
const choosePicture = () => {

}

  return (
    <>
           { profile["names"] ?<div className="dashboard-profile-page-photo-section"
   >
   <div style={{display : "flex", 
   flexDirection : "row", alignItems :"center", gap : width  < 768 ?  "10px" : "20px",
   width :  width < 768 ? "200px" : "500px",
    paddingTop : "10px"}}>
    {
avatarLoading ?
<div
className="dashboard-profile-page-loading-avatar"
></div>
 

:
<img src={profileImage} 
    className="dash-profile-photo-work"/>
   }

  <span>
  {width < 768 ? <h4><b>{dashboardProfile.username}</b></h4> : <h3><b>{dashboardProfile.username}</b></h3>}
  <h6 style={{color: "#9CA3AF"}}>{dashboardProfile.email}</h6>
  <h6 style={{color : "#9CA3AF"}}>{dashboardProfile.bio}</h6>
  </span>
</div>
<div
onClick={() => { startEditing("names")}}
 style={{display : "flex", flexDirection  :"row", alignItems : "center", gap : "1px",
border : "1px solid #777777",
justifyContent : "space-around",
padding : "5px 15px",
borderRadius : "5px",
cursor : "pointer"
}}>
    <MdOutlineCreate /> Edit
  </div>
   </div>

:

<div className="dashboard-edit-profile-page-photo-section">
<section className="editme-profile-page-photo-section">
<div style={{display : "flex", 
   flexDirection : "row", alignItems :"center", gap : width  < 768 ?  "10px" : "20px",
   width :  width < 768 ? "200px" : "400px",
    paddingTop : "10px"}}>
   {
avatarLoading ?
<div
className="dashboard-profile-page-edit-loading-avatar"
></div>
 

:
<img src={profileImage} 
    className="dash-profile-photo-work"/>
   }
    
  <span>
  {width < 768 ? <h4><b>Profile Picture</b></h4> : <h3><b>Profile Picture</b></h3>}
  <h6 style={{color: "#9CA3AF"}}>PNG, SVG under 2MB</h6>
  <h6 style={{color : "#9CA3AF"}}>Technical Writer</h6>
  </span>
</div>
<div style={{display : "flex", flexDirection  :"row", alignItems : "center", gap : "20px",
justifyContent : "space-between",
padding : "5px 15px",
borderRadius : "5px",
cursor : "pointer"
}}>
    <span className="our-buttons upload" onClick={() => {uploadNewPicture()}}>
      Upload New Picture
    </span>
    <span className="our-buttons delete">
      Delete
    </span>
  </div>
</section> 
<section className="editme-profile-page-photo-section-second">
<h6>Full Name</h6>
  <div style={{display : width > 768 && "flex", flexDirection : width > 768 && "row", justifyContent : width > 768 && "space-between"}}>
  <div style={{display :"flex", flexDirection : "column", gap : "3px"}}>
First name
<input type="text"></input>
  </div>
  <span className="choose-new-picture-button" onClick={() => choosePicture()}>
      Choose New Picture
    </span>


  </div>
  <div style={{display : "flex", flexDirection : "row", alignItems : "flex-end", justifyContent : "flex-start"}}>
  <span className="save-changes" onClick={() => saveChanges()}>
    Save Changes
    </span>
  </div>
</section>

</div>}
    </>
  )
}

export default ProfilePictureSection