import { useEffect, useRef, useState } from 'react'
import avatar from "../../assets/3.jpg"
import { Link } from "react-router-dom"
import { FaUser, FaTimes } from "react-icons/fa"
import "../../styles/components/common/navbar-context-menu.css"
import { useAuthContext } from '../../hooks/useAuthContext'
import Avatar from './Avatar'
import { MdLogout, MdOpenInNew } from 'react-icons/md'
const NavbarContextMenu = ({contextMenu, setContextMenu, contextMenuData, setOpenModal}) => {
  const { user } = useAuthContext()
  const context = useRef()
  const closeMe = () => {
    contextMenu.current.style.visibility = "hidden"
    context.current.classList.remove("active")
  
  }
  useEffect(() => {
      setContextMenu(context)
 
  }, [setContextMenu])
  return (
<div className="sub-menu-wrap" ref={context}

style={{
    margin: 0,
    paddingLeft: 0,
    position: "fixed",
    visibility: "hidden",
    fontFamily: "Poppins, sans-serif", // Corrected line
}}>
<div className='sub-menu'>
<div className='arrow-pointer'>&nbsp;</div>

<div className='user-info' style={{cursor : "pointer", display :"flex", flexDirection : "row", justifyContent : "space-between"}}>
{user ? 
<div style={{display : "flex", flexDirection : "row", alignItems : "center"}}>
<Avatar className="navbar-context-profile-photo-home" image={user["picture"]}/>
<h4>{user["username"]}</h4>
</div>
:
<div style={{display : "flex", flexDirection : "row", alignItems : "center"}}>

<div className="defaultavatar">
  <FaUser color="#525252" size={20}/>
 </div>
 <h4>&nbsp;&nbsp;Guest</h4>
 </div>
}
{/* <img src={avatar}
className="navbar-context-profile-photo-home"/>  */}
<span className="close-topper">
<FaTimes

onClick={closeMe}
/>
</span>


</div>

<hr />
{
  contextMenuData
  .filter((content) => user ? 
  content.access == "user"
  :content.access == "guest")
  .map((item, id) => (
    <Link className='sub-menu-link' key={id}  to={item.link}
    >
  {item.icon}
  <p>{item.label}</p>
  <span>{item.arrow}</span>
</Link>
  ))
}
{user && <span className='sub-menu-link'
style={{cursor : "pointer"}}
 onClick={() => setOpenModal(true)}>
  <MdLogout className="imags" size={40}/>
  <p>Sign Out</p>
  <span><MdOpenInNew /></span>
</span>
}
</div>
</div>
  )
}

export default NavbarContextMenu