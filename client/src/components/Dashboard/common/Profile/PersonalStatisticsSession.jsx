
import { MdOutlineThumbUpAlt,
    MdOutlineInsertComment,
    MdAutoStories,
    MdBookmarks,
    MdNotes,
    MdOutlineStickyNote2,
    MdEmojiPeople,
    MdGroup,
    MdVerifiedUser,
    MdOutlinePersonPin,
    MdOutlineCreate
   } from "react-icons/md";
   import { useAuthContext } from "../../../../hooks/useAuthContext";
const PersonalStatisticsSession = () => {
  const { user } = useAuthContext();
  console.log(user)
  return (
  <>
    <div className="dashboard-profile-page-personal-information"
>
<section style={{display : "flex", flexDirection : "row", justifyContent : "space-between",
marginBottom : "10px"
}}>
<h4><b>My Statistics</b></h4>
<div style={{display : "flex", flexDirection  :"row", alignItems : "center", gap : "1px",
border : "1px solid #777777",
justifyContent : "space-around",
padding : "5px 15px",
borderRadius : "5px",
cursor : "pointer"
}}>
    <MdOutlineCreate /> Edit
  </div>
</section>
<section className="dashboard-profile-page-personal-statistics-information">
<section style={{display : "flex", flexDirection : "column", gap : "20px"}}>
<div className="personal-small-details">
<span>
<h6>
Followers <MdGroup />
</h6></span>
<span>{user.totalfollowers}</span>
</div>
<div className="personal-small-details">
<span>
<h6>
  Following <MdOutlinePersonPin /> 
  </h6>
</span>
<span>
  {user.totalfollowing} <MdEmojiPeople />
</span>
</div>
<div className="personal-small-details">
<span>
<h6>
Likes <MdOutlineThumbUpAlt color="white"/>
</h6>
</span>
<span>50 </span>

</div>
</section>
<section style={{display : "flex", flexDirection : "column", gap : "20px"}}>
<div className="personal-small-details">
<span>
<h6>
Comments <MdOutlineInsertComment />
</h6></span>
<span>600 </span>
</div>
<div className="personal-small-details">
<span>
<h6>
Verification Status <MdVerifiedUser />
  </h6>
</span>
<span>
  Not Verified
</span>
</div>
<div className="personal-small-details">
<span>
<h6>
  Notes <MdNotes />
  </h6>
</span>
<span>
  50 
</span>
</div>
</section>
<section style={{display : "flex", flexDirection : "column", gap : "20px"}}>
<div className="personal-small-details">
<span>
<h6>
Sticky Notes  <MdOutlineStickyNote2 />
</h6></span>
<span>600</span>
</div>
<div className="personal-small-details">
<span>
<h6>
  Stories
  </h6>
</span>
<span>
  12 <MdAutoStories />
</span>
</div>
<div className="personal-small-details">
<span>
<h6>
  Bookmarks  <MdBookmarks />
  </h6>
</span>
<span>
  {user.totalBookmarks}
</span>
</div>
</section>
</section>
</div>
  </>
  )
}

export default PersonalStatisticsSession