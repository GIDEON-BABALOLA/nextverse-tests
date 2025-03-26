
import useWindowSize from "../../../../hooks/useWindowSize"
// dashboard-profile-page-loading-avatar
import { MdOutlineCreate } from "react-icons/md"
import { useEffect, useState } from "react"
import useImageLoad from "../../../../hooks/useImageLoaded"
import { useUpdateAUser } from "../../../../hooks/useUpdateAUser"
import { MdClose } from "react-icons/md"
import SpecialModal from "../../../common/SpecialModal"
import { useGetAllAvatars } from "../../../../hooks/useGetAllAvatars"
import ErrorMessage from "../../../common/ErrorMessage"
import { FaCheck } from "react-icons/fa"
import ProfileAvatar from "./ProfileAvatar"
import { useToastContext } from "../../../../hooks/useToastContext"
import LoadingSpinner from "../../../Loaders/LoadingSpinner"
import { usernameValidate } from "../../../../helpers/Validator"
import { axiosConfig } from "../../../../api/axiosConfig"
import { FaTimes } from "react-icons/fa"
const ProfilePictureSection = ({ profile, startEditing, dashboardProfile, setDashboardProfile }) => {
  const {updateAUser, isLoading, error : updateError, data, statusCode } = useUpdateAUser()
  const { showToast } = useToastContext()
  const getAllAvatars = useGetAllAvatars();
  const [isChecking, setIsChecking] = useState(false)
    const [avatarLoading, setAvatarLoading] = useState(true)
    const [avatars, setAvatars] = useState([])
    const [usernameError, setUsernameError] = useState(false)
    const [updateData, setUpdateData] = useState({
      username: "",
      picture: ""
    });
      const checkIfUsernameExists = async () => {
        setIsChecking(true)
        try{
    const response = await axiosConfig.post("/user/duplicate-username", {
      username  : updateData.username
    })
    if(response){
      setIsChecking(false)
      setUsernameError(false)
    }
        }catch(error){
          setUsernameError(true)
          setIsChecking(false)
        }
      }
    const updateUserData = () => {
      const correctUsername = usernameValidate(updateData.username)
      if(!updateData.username){
        showToast("Error", "Pls Enter Your New Username", false)
        return;
      }
      if(usernameError){
        showToast("Error", "This username is taken already", false)
        return;
      }
      if(!correctUsername){
        showToast("Error", "Username Can Only Contain Alphanumerics, Hyphens And Underscores", false)
        return;
          }
      
      updateAUser(updateData)
    }
    let profileImage = dashboardProfile.picture
    const [openModal, setOpenModal] = useState(false)
    const { width } = useWindowSize() 
    const { loaded, error} = useImageLoad(profileImage) //This is hard coded
    useEffect(() => {
      if(openModal){
        getAllAvatars.getAllAvatars(50);
      }
          }, [openModal])
          useEffect(() => {
console.log(dashboardProfile)
          }, [dashboardProfile])
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
  console.log(filteredUserData)
    return { ...prev, ...filteredUserData }; // Update state with filtered data
  });
  startEditing("names")
}
setUpdateData({username : "", picture : ""})
if(updateError){
  showToast("Error", updateError.message, false)
}
      }, [data, updateError, statusCode])
          useEffect(() => {
console.log(getAllAvatars.error)
          }, [getAllAvatars])
    useEffect(() => {
      if(getAllAvatars.data.length > 0){
        console.log(getAllAvatars.data)
        setAvatars(getAllAvatars.data)
      }
    }, [getAllAvatars.data])
    const resendRequest = () => {
      getAllAvatars.getAllAvatars(50);
    }
    const previewUserHtml = () => {
      return <>
      <div className="avatars-closer">
      <MdClose size={30} onClick={() => {setOpenModal(false)}}/>
      </div>
      <> { !getAllAvatars.error &&
      <>
      {getAllAvatars.isLoading ? 
      <div className="avatars-spinners">
        <LoadingSpinner />
      </div>
      : 
            <div 
            className="flex-avatars"
            >
      {
        avatars.map((avatar, index) => (
          <ProfileAvatar 
          onClick={() => { setUpdateData((prev) => {
            console.log(avatar.url)
            return {...prev, picture : avatar.url}
          });
            setDashboardProfile((prev) => {
              return {...prev, picture : avatar.url}
            })
          }}
          key={index} image={avatar.url} width="20px" className={`profile-man ${updateData.picture == avatar.url ? "selected" : ""}`}/>
        ))
      }
      </div>
    }
    </>
  }
      </>
              {getAllAvatars.error && <>


{ getAllAvatars.error?.code == "ERR_NETWORK" ? 
  <ErrorMessage title={"Check Your Internet Connection"} 
message={"We are unable to load this content, check your connection"}
height={60}
type={error.code}
fireClick = {resendRequest}
/>
:
getAllAvatars.error?.code == "ERR_CANCELED"

?
<ErrorMessage title={"Timeout Error"} 
message={"Sorry, Your Request Has Timed Out, Pls click on the refresh button"}
height={60}
type={error.code}
fireClick = {resendRequest}
/>
:
<ErrorMessage title={"Something went wrong"} 
message={"We are unable to load this content,Pls click on the refresh button"}
height={60}
type={error.code}
fireClick = {resendRequest}
/>
}
</>
}
      </>

    }
useEffect(() => {
if(loaded){
    setAvatarLoading(false)
}
if(error){
setAvatarLoading(true)
}
}, [error, loaded])
const saveChanges = () => {
  updateUserData()
}
const uploadNewPicture = () => {

}
const choosePicture = () => {
setOpenModal(true)
}

  return (
    <>
       <SpecialModal openModal={openModal} setOpenModal={setOpenModal}
       content={previewUserHtml()} height={400} width={800}/>
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
  <div style={{display : width > 768 && "flex", flexDirection : width > 768 && "row", justifyContent : width > 768 && "space-between"}}>
  <div style={{display :"flex", flexDirection : "column", gap : "3px"}}>
<span style={{fontSize : "1.2rem"}}>Username</span>
<div className="profile-username-container">
<input type="text"
className="username-input-field"
onKeyUp = { () => { checkIfUsernameExists() }}
onChange={(e) => {
  setUpdateData((prev) => {
    return {...prev, username : e.target.value}
  })
  
}}></input>
{
  isChecking ? 
<LoadingSpinner className="username-loader"/>
:
usernameError ?
updateData.username && <span className="username-checkmark" ><FaTimes size={10} color="#ff5e62" /></span>
:
updateData.username &&<span className="username-checkmark" ><FaCheck size={10} color="green" /></span>
}
</div>
  </div>
  <span className="choose-new-picture-button special-modal-client" onClick={() => choosePicture()}>
      Choose New Picture
    </span>


  </div>
  <div style={{display : "flex", flexDirection : "row", alignItems : "flex-end", justifyContent : "flex-start"}}>
  <span className="save-changes" onClick={() => saveChanges()}>
    {
      isLoading ? 
      <span style={{padding : "30px 30px"}}>
      <LoadingSpinner/>
      </span>
       : "Save Changes"
    }
    </span>
  </div>
</section>

</div>}
    </>
  )
}

export default ProfilePictureSection