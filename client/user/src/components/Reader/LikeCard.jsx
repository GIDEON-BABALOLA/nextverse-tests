import LikesAvatar from "./LikesAvatar"
import {  MdOutlineFavorite  } from 'react-icons/md';
const LikeCard = ({ like, isLoading }) => {
  return (
    <>
    {
      isLoading ?
      <div className="like-card like-card-loader" style={{display : "flex",
        flexDirection : "row",
       justifyContent : "space-between",
       alignItems: "center"
       }}>
   <div className="likes-profile-section">
     <div>
     <div
       className="likes-loader likes-loader-avatar"></div>
     </div>
   
     <div className="likes-profile-section-details">
       <div className=" likes-loader likes-loader-username"></div>
       <div  className=" likes-loader likes-loader-bio"></div>
       </div>
   </div>
   <div>
    
    <div className="likes-loader likes-loader-button"></div></div>
       </div>
      :
      <div className="like-card" style={{display : "flex",
        flexDirection : "row",
       justifyContent : "space-between",
       alignItems: "center"
       }}>
   <div className="likes-profile-section">
     <div>
     <LikesAvatar 
     image={like["likedBy"].picture}
        className="likes-avatar"
     />
     </div>
   
     <div className="likes-profile-section-details">
       <span style={{fontSize : "1rem"}}>{like["likedBy"].username}</span>
       <span style={{fontSize : "0.8rem"}}>{like["likedBy"].bio}</span>
       </div>
   </div>
   <div>
    <MdOutlineFavorite color="#E0245E" size={20}/>
    {/* <button className="like-follow-button">Follow</button> */}
    </div>
       </div>
    }
    
    
    </>
    
  )
}

export default LikeCard