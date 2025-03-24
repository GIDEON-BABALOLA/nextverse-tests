
import {
    MdAutoStories,
    MdNotes,
    MdOutlineStickyNote2,
    MdEmojiPeople,
    MdGroup,
    MdVerifiedUser,
    MdOutlinePersonPin,
    MdOutlineCreate
   } from "react-icons/md";
const PersonalStatisticsSession = ({ dashboardProfile }) => {
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
<section style={{display : "flex", flexDirection : "column", gap : "40px"}}>
<div className="personal-small-details">
<span>
<h4>
Followers <MdGroup />
</h4></span>
<span className="stats-numbers">{dashboardProfile.totalFollowers}</span>
</div>
<div className="personal-small-details">
<span>
<h4>
  Following <MdOutlinePersonPin /> 
  </h4>
</span>
<span className="stats-numbers">
  {dashboardProfile.totalFollowing} <MdEmojiPeople />
</span>
</div>

</section>
<section style={{display : "flex", flexDirection : "column", gap : "40px"}}>

<div className="personal-small-details">
<span>
<h4>
Verification Status <MdVerifiedUser />
  </h4>
</span>
<span className="stats-numbers">
  {dashboardProfile.isVerified ? "Verified" : "Not Verified"}
</span>
</div>
<div className="personal-small-details">
<span>
<h4>
Sticky Notes  <MdOutlineStickyNote2 />
</h4></span>
<span className="stats-numbers">{dashboardProfile.totalStickyNotes}</span>
</div>
</section>

</section>
</div>
  </>
  )
}

export default PersonalStatisticsSession