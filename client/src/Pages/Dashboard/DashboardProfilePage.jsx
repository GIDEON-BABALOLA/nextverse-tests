import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import useWindowSize from "../../hooks/useWindowSize";
import { MdOutlineCreate  } from "react-icons/md";
import { MdOutlineThumbUpAlt,
   MdOutlineInsertComment,
   MdAutoStories,
   MdBookmarks,
   MdNotes,
   MdOutlineStickyNote2,
   MdEmojiPeople,
   MdGroup,
   MdVerifiedUser,
   MdOutlinePersonPin  
  } from "react-icons/md";
import "../../styles/components/Dashboard/dashboard-profile-page.css"
import profileImage from "../../assets/29.jpg"
import { useState, useEffect } from "react";
const SettingsPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
  const { width } =  useWindowSize()
  const [loadPage, setLoadPage] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoadPage(false)
    }, 2000);
      }, [])
      const [contextMenu, setContextMenu] = useState()
      // useEffect(() => {
  
      //   if (contextMenu) {
      //     window.addEventListener('scroll', () => {
      //       console.log("dave")
      //       contextMenu.current.style.visibility = "hidden";
      //     });
      //   }
    
      //   return () => {
      //     if (contextMenu) {
      //       window.removeEventListener('scroll', () => {
      //         contextMenu.current.style.visibility = "hidden";
      //       });
      //     }
      //   };
      // }, [contextMenu]);
  return (
    <>
    {loadPage ? 
    <>
    <RotationLoader />
    </>
     : <>
    <main  className="dashboard-profile-page">
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
   <span style={{textDecoration:"bolder"}}>
   
   <h4><b>My Profile</b></h4>   </span>
   <section className="our-profile-content">
   <div className="dashboard-profile-page-photo-section"
   >
   <div style={{display : "flex", 
   flexDirection : "row", alignItems :"center", gap : width  < 768 ?  "10px" : "20px",
   width :  width < 768 ? "200px" : "500px",
    paddingTop : "10px"}}>
    <img src={profileImage} 
    className="dash-profile-photo-work"/>

  <span>
  {width < 768 ? <h4><b>Gideon Babalola</b></h4> : <h3><b>Gideon Babalola</b></h3>}
  <h6 style={{color: "#9CA3AF"}}>gideonbabalola69@gmail.com</h6>
  <h6 style={{color : "#9CA3AF"}}>Technical Writer</h6>
  </span>
</div>
<div style={{display : "flex", flexDirection  :"row", alignItems : "center", gap : "1px",
border : "1px solid #777777",
justifyContent : "space-around",
padding : "5px 15px",
borderRadius : "5px",
cursor : "pointer"
}}>
    <MdOutlineCreate /> Edit
  </div>
   </div>



<div className="dashboard-edit-profile-page-photo-section">
<section className="editme-profile-page-photo-section">
<div style={{display : "flex", 
   flexDirection : "row", alignItems :"center", gap : width  < 768 ?  "10px" : "20px",
   width :  width < 768 ? "200px" : "400px",
    paddingTop : "10px"}}>
    <img src={profileImage} 
    className="dash-profile-photo-work"/>
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
    <span className="our-buttons upload">
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
Firstname
<input type="text"></input>
  </div>
  <div style={{display :"flex", flexDirection : "column", gap : "3px"}}>
  Lastname
  <input type="text"></input>
  </div>

  </div>
  <div style={{display : "flex", flexDirection : "row", alignItems : "flex-end", justifyContent : "flex-start"}}>
  <span className="save-changes">
    Save Changes
    </span>
  </div>
</section>
</div>



















<div className="dashboard-profile-page-personal-information"
>
<section style={{display : "flex", flexDirection : "row", justifyContent : "space-between",
marginBottom : "10px"
}}>
<h4><b>Personal Information</b></h4>
<div style={{display : "flex", flexDirection  :"row", alignItems : "center", gap : "1px",
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
<span>15,000</span>
</div>
<div className="personal-small-details">
<span>
<h6>
  Following <MdOutlinePersonPin /> 
  </h6>
</span>
<span>
  500 <MdEmojiPeople />
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
  500
</span>
</div>
</section>
</section>
</div>
   </section>
    </main>

    <div className="litenote-dashboard-right" 
    
    style={{
      marginRight: "90px",
    }}>
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
    </div>
    </>
    }
    </>
  )
}

export default SettingsPage