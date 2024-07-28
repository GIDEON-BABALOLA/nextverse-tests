import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md"
import "../../styles/components/Dashboard/users-page.css"
import avatar from "../../assets/29.jpg"
import SearchBar from "../../components/Browse/SearchBar"
const SettingsPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
  const [loadPage, setLoadPage] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoadPage(false)
    }, 2000);
      }, [])
      const [contextMenu, setContextMenu] = useState()
      useEffect(() => {
  
        if (contextMenu) {
          window.addEventListener('scroll', () => {
            console.log("dave")
            contextMenu.current.style.visibility = "hidden";
          });
        }
    
        return () => {
          if (contextMenu) {
            window.removeEventListener('scroll', () => {
              contextMenu.current.style.visibility = "hidden";
            });
          }
        };
      }, [contextMenu]);
  return (
    <>
    {loadPage ? 
    <>
    <RotationLoader />
    </>
     : <>
    <section style={{width : "100%"}}>
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
<div className="users-page-header">
<div className="users-page-filter-data">
Filter Users Data
</div>
<div className="users-page-search-data">
{/* <SearchBar /> */}
</div>


</div>
<section className="new-grandfather">
      <div className="new-father">
      <div className="new-boy new-boy-dad">
      <span className="new-boy-header">S/N</span>
      <span className="new-boy-header">Check</span>
        
          <span className="new-boy-header">Avatar</span>
          <span className="new-boy-header">Username</span>
          <span className="new-boy-header">Followers</span>
          <span className="new-boy-header">Following</span>
          <span className="new-boy-header">Newsletter</span>
          <span className="new-boy-header">Stories</span>
          <span className="new-boy-header">Likes</span>
          <span className="new-boy-header">Comments</span>
          <span className="new-boy-header">Date Joined</span>
          <span className="new-boy-header">Last Seen</span>
          <span className="new-boy-header">Delete</span>
      </div>
<div className="new-boy">
<input type="checkbox" />
         <img 
         style={{
          width: "30px",
          borderRadius : "50%"
    
         }}
                  src={avatar}/>
          <span>Codesheh</span>
          <span>Veryejejej</span>
          <span>Welljjeje</span>
          <span>Jojejjjej</span>
          <span>Codeskkekek</span>
          <span>Verykek</span>
          <span>Welljjjjjeie</span>
          <span>Joiii</span>
          <span>Codesjj</span>
          <span>Veryrrrrkk</span>
          <span>Welljjjkkk</span>
          <span>Jokkjjkkii</span>
          <span
          style={{backgroundColor : "#E5E5E5"}}
          ><MdDelete size={20}/></span>
</div>
<div className="new-boy">
<input type="checkbox" />
<img 
         style={{
          width: "30px",
          borderRadius : "50%"
    
         }}
                  src={avatar}/>
         <span>Codesheh</span>
          <span>Veryejejej</span>
          <span>Welljjeje</span>
          <span>Jojejjjej</span>
          <span>Codeskkekek</span>
          <span>Verykek</span>
          <span>Welljjjjjeie</span>
          <span>Joiii</span>
          <span>Codesjj</span>
          <span>Veryrrrrkk</span>
          <span>Welljjjkkk</span>
          <span>Jokkjjkkii</span>
          <span
          style={{backgroundColor : "#E5E5E5"}}
          ><MdDelete size={20}/></span>
</div>
<div className="new-boy">
<input type="checkbox" />
<img 
         style={{
          width: "30px",
          borderRadius : "50%"
    
         }}
                  src={avatar}/>
           <span>Codesheh</span>
          <span>Veryejejej</span>
          <span>Welljjeje</span>
          <span>Jojejjjej</span>
          <span>Codeskkekek</span>
          <span>Verykek</span>
          <span>Welljjjjjeie</span>
          <span>Joiii</span>
          <span>Codesjj</span>
          <span>Veryrrrrkk</span>
          <span>Welljjjkkk</span>
          <span>Jokkjjkkii</span>
          <span
          style={{backgroundColor : "#E5E5E5"}}
          ><MdDelete size={20}/></span>
</div>
<div className="new-boy">
<input type="checkbox" />
<img 
         style={{
          width: "30px",
          borderRadius : "50%"
    
         }}
                  src={avatar}/>
         <span>Codesheh</span>
          <span>Veryejejej</span>
          <span>Welljjeje</span>
          <span>Jojejjjej</span>
          <span>Codeskkekek</span>
          <span>Verykek</span>
          <span>Welljjjjjeie</span>
          <span>Joiii</span>
          <span>Codesjj</span>
          <span>Veryrrrrkk</span>
          <span>Welljjjkkk</span>
          <span>Jokkjjkkii</span>
          <span
          style={{backgroundColor : "#E5E5E5"}}
          ><MdDelete size={20}/></span>
</div>
<div className="new-boy">
<input type="checkbox" />
<img 
         style={{
          width: "30px",
          borderRadius : "50%"
    
         }}
                  src={avatar}/>
        <span>Codesheh</span>
          <span>Veryejejej</span>
          <span>Welljjeje</span>
          <span>Jojejjjej</span>
          <span>Codeskkekek</span>
          <span>Verykek</span>
          <span>Welljjjjjeie</span>
          <span>Joiii</span>
          <span>Codesjj</span>
          <span>Veryrrrrkk</span>
          <span>Welljjjkkk</span>
          <span>Jokkjjkkii</span>
          <span
          style={{backgroundColor : "#E5E5E5"}}
          ><MdDelete size={20}/></span>
</div>
<div className="new-boy">
<input type="checkbox" />
<img 
         style={{
          width: "30px",
          borderRadius : "50%"
    
         }}
                  src={avatar}/>
        <span>Codesheh</span>
          <span>Veryejejej</span>
          <span>Welljjeje</span>
          <span>Jojejjjej</span>
          <span>Codeskkekek</span>
          <span>Verykek</span>
          <span>Welljjjjjeie</span>
          <span>Joiii</span>
          <span>Codesjj</span>
          <span>Veryrrrrkk</span>
          <span>Welljjjkkk</span>
          <span>Jokkjjkkii</span>
          <span
          style={{backgroundColor : "#E5E5E5"}}
          ><MdDelete size={20}/></span>
</div>
<div className="new-boy">
<input type="checkbox" />
<img 
         style={{
          width: "30px",
          borderRadius : "50%"
    
         }}
                  src={avatar}/>
         <span>Codesheh</span>
          <span>Veryejejej</span>
          <span>Welljjeje</span>
          <span>Jojejjjej</span>
          <span>Codeskkekek</span>
          <span>Verykek</span>
          <span>Welljjjjjeie</span>
          <span>Joiii</span>
          <span>Codesjj</span>
          <span>Veryrrrrkk</span>
          <span>Welljjjkkk</span>
          <span>Jokkjjkkii</span>
          <span
          style={{backgroundColor : "#E5E5E5"}}
          ><MdDelete size={20}/></span>
</div>
<div className="new-boy">
<input type="checkbox" />
<img 
         style={{
          width: "30px",
          borderRadius : "50%"
    
         }}
                  src={avatar}/>
         <span>Codesheh</span>
          <span>Veryejejej</span>
          <span>Welljjeje</span>
          <span>Jojejjjej</span>
          <span>Codeskkekek</span>
          <span>Verykek</span>
          <span>Welljjjjjeie</span>
          <span>Joiii</span>
          <span>Codesjj</span>
          <span>Veryrrrrkk</span>
          <span>Welljjjkkk</span>
          <span>Jokkjjkkii</span>
          <span
          style={{backgroundColor : "#E5E5E5"}}
          ><MdDelete size={20}/></span>
</div>
<div className="new-boy">
<input type="checkbox" />
<img 
         style={{
          width: "30px",
          borderRadius : "50%"
    
         }}
                  src={avatar}/>
         <span>Codesheh</span>
          <span>Veryejejej</span>
          <span>Welljjeje</span>
          <span>Jojejjjej</span>
          <span>Codeskkekek</span>
          <span>Verykek</span>
          <span>Welljjjjjeie</span>
          <span>Joiii</span>
          <span>Codesjj</span>
          <span>Veryrrrrkk</span>
          <span>Welljjjkkk</span>
          <span>Jokkjjkkii</span>
          <span
          style={{backgroundColor : "#E5E5E5"}}
          ><MdDelete size={20}/></span>
</div>
<div className="new-boy">
<input type="checkbox" />
<img 
         style={{
          width: "30px",
          borderRadius : "50%"
    
         }}
                  src={avatar}/>
          <span>Codesheh</span>
          <span>Veryejejej</span>
          <span>Welljjeje</span>
          <span>Jojejjjej</span>
          <span>Codeskkekek</span>
          <span>Verykek</span>
          <span>Welljjjjjeie</span>
          <span>Joiii</span>
          <span>Codesjj</span>
          <span>Veryrrrrkk</span>
          <span>Welljjjkkk</span>
          <span>Jokkjjkkii</span>
          <span
          style={{backgroundColor : "#E5E5E5"}}
          ><MdDelete size={20}/></span>
</div>
<div className="new-boy">
<input type="checkbox" />
<img 
         style={{
          width: "30px",
          borderRadius : "50%"
    
         }}
                  src={avatar}/>
            <span>Codesheh</span>
          <span>Veryejejej</span>
          <span>Welljjeje</span>
          <span>Jojejjjej</span>
          <span>Codeskkekek</span>
          <span>Verykek</span>
          <span>Welljjjjjeie</span>
          <span>Joiii</span>
          <span>Codesjj</span>
          <span>Veryrrrrkk</span>
          <span>Welljjjkkk</span>
          <span>Jokkjjkkii</span>
          <span
          style={{backgroundColor : "#E5E5E5"}}
          ><MdDelete size={20}/></span>
</div>
<div className="new-boy">
<input type="checkbox" />
<img 
         style={{
          width: "30px",
          borderRadius : "50%"
    
         }}
                  src={avatar}/>
           <span>Codesheh</span>
          <span>Veryejejej</span>
          <span>Welljjeje</span>
          <span>Jojejjjej</span>
          <span>Codeskkekek</span>
          <span>Verykek</span>
          <span>Welljjjjjeie</span>
          <span>Joiii</span>
          <span>Codesjj</span>
          <span>Veryrrrrkk</span>
          <span>Welljjjkkk</span>
          <span>Jokkjjkkii</span>
          <span
          style={{backgroundColor : "#E5E5E5"}}
          ><MdDelete size={20}/></span>
</div>
<div className="new-boy">
<input type="checkbox" />
<img 
         style={{
          width: "30px",
          borderRadius : "50%"
    
         }}
                  src={avatar}/>
        <span>Codesheh</span>
          <span>Veryejejej</span>
          <span>Welljjeje</span>
          <span>Jojejjjej</span>
          <span>Codeskkekek</span>
          <span>Verykek</span>
          <span>Welljjjjjeie</span>
          <span>Joiii</span>
          <span>Codesjj</span>
          <span>Veryrrrrkk</span>
          <span>Welljjjkkk</span>
          <span>Jokkjjkkii</span>
          <span
          style={{backgroundColor : "#E5E5E5"}}
          ><MdDelete size={20}/></span>
</div>
      </div>
    </section>
    </section>
   

    {/* <div className="litenote-dashboard-right">
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
    </div> */}
    </>
    }
    </>
  )
}

export default SettingsPage