import { useState, useEffect } from "react";
import FollowToast from "../Follow/FollowToast";
import LoadingSpinner from "../Loaders/LoadingSpinner"
import { useFollowUser } from "../../hooks/useFollowUser";
import { useProfileContext } from "../../hooks/useProfileContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import SpecialModal from "../common/SpecialModal";
import { MdVerified } from "react-icons/md";
const Bio = ({ isLoading, isFollowing }) => {
const [imPossibleToFollow, setImPossibleToFollow] = useState(false)
const [openModal, setOpenModal] = useState(false)
const [following, setFollowing] = useState(false)
const [followToast, setFollowToast] = useState(false)
const { profile } = useProfileContext()
const { user } = useAuthContext(); 
const triggerFollow = useFollowUser()
useEffect(() => {
  console.log(profile)
  console.log(profile.email, user.email)
if(profile.email == user.email){
  setImPossibleToFollow(true)
}else{
  setImPossibleToFollow(false)
}
}, [profile, user.email])
  const triggerFollowUser = () => {
    setFollowing(true)
triggerFollow.followUser(profile.email)
  }
  useEffect(() => {
    if(Object.keys(triggerFollow.data).length > 0){
      setFollowing(false)
      setFollowToast(true)
    }
      }, [triggerFollow.data])
  const triggerUnFollow = () => {
    setOpenModal(!openModal)
  }
  const renderFollowButton = () => {
    if (Object.keys(triggerFollow.data).length === 0 && !following) {
      return (
        <button className="follow" onClick={() => triggerFollowUser()}>
          <span className="spinner-loader-container text">Follow</span>
        </button>
      );
    }
  
    if (following && !triggerFollow.error) {
      return (
        <button className="follow">
          <span className="spinner-loader-container">
            <LoadingSpinner />
          </span>
        </button>
      );
    }
  
    if (!following && Object.keys(triggerFollow.data).length > 0) {
      return (
        <button className="follow special-modal-client" onClick={() => triggerUnFollow()}>
          <span className="spinner-loader-container text special-modal-client">Following</span>
        </button>
      );
    }
  
    if (triggerFollow.error) {
      return (
        <button className="follow" onClick={() => triggerFollowUser()}>
          <span className="spinner-loader-container text">Follow</span>
        </button>
      );
    }
  
    return null; // Fallback in case no condition matches
  };
  
  const previewUnfollowHtml = () => {
        
    return (
    <div
    className="unfollow-modal"
     style={{display : "flex", flexDirection : "column", justifyContent :"space-between", gap : "20px", fontFamily : "Poppins"}}>
  <section style={{display : "flex", flexDirection : "column", justifyContent : "space-between", textAlign : "left"}}>
 <div style={{fontWeight : "1000"}}>
 <h4>Unfollow @{profile.username}</h4>
 </div>
 <div style={{textAlign : "left"}}>
 Their posts will no longer show up frequently in your feed. You can still view their profile, unless their posts are protected. 
 </div>
    </section>
<section style={{display : "flex", flexDirection : "column", justifyContent : "space-between", textAlign : "center", gap : "10px"}}>
<button className="unfollow-button">Unfollow</button>
<button className="unfollow-cancel-button" onClick={() => setOpenModal(!openModal)}>Cancel</button>
</section>
    
    </div>)
  }
  return (
   <>
   <FollowToast followToast={followToast} setFollowToast={setFollowToast} message={`You have successfully followed ${profile.username}`}/>
   { isLoading ? <section style={{display : "flex", flexDirection : "column", gap : "6px", alignItems : "flex-start"}}>
   <div style={{display : "flex", flexDirection : "row", gap : "6px", alignItems : "center"}}>
<div className="profile-loader profile-loader-username"></div>
{/* <div className="profile-loader profile-loader-verification"></div> */}
<div className="profile-loader profile-loader-follow-button"></div>

</div>
<div  style={{display : "flex", flexDirection : "column", gap : "6px", alignItems : "flex-start"}}>
<div className="profile-loader profile-loader-title"></div>
<div className="profile-loader profile-loader-bio"></div>
</div>
   </section>
    :
<section>
<div style={{display : "flex", flexDirection : "row", alignItems : "center", gap : "10px" }}>


            <h2 className="litenote-profile-name">{profile["username"]} 
            {/* <FcRating style={{marginLeft : "1%"}} /> */}

          {/* <span className="checkbot">
    
          <FaCertificate style={{color : "#ff5e62", margin: "1%"}} />
            <FaCheck className="checkman"  size={14}/> 
          </span> */}
        
      
        
          </h2>
          <MdVerified style={{marginLeft : "1%", color : "black", fill : "#FF4B33"}} size={30}/>
          <span>{
          !imPossibleToFollow &&
          <>
            {
              isFollowing ? 
              <button
              className="follow special-modal-client"
              onClick={() => { triggerUnFollow()}}
              >
                 <span className="spinner-loader-container text-following special-modal-client">
        Following
        </span>
              </button>
              :
<>
  {renderFollowButton()}
</>





            }
          </>
    
        }
        </span>
        </div>
          <span><b>{profile.email}</b></span>
        <p className="litenote-profile-bio">{profile.bio}</p>
</section>
   }
<SpecialModal openModal={openModal} setOpenModal={setOpenModal}  content={previewUnfollowHtml()} />
   </>
  )
}

export default Bio