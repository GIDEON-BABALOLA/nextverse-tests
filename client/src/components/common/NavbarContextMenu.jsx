import { useEffect, useRef, useState } from 'react'
import avatar from "../../assets/3.jpg"
import { Link } from "react-router-dom"
import { FaUser, FaTimes } from "react-icons/fa"
import { MdGridView, MdLogout, MdSettings, MdClose }from "react-icons/md"
import { FaHandsHelping } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import "../../styles/components/common/navbar-context-menu.css"
const NavbarContextMenu = ({contextMenu, setContextMenu, contextMenuData}) => {
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

<div className='user-info' style={{cursor : "pointer"}}>
<img src={avatar}
className="navbar-context-profile-photo-home"/> 
<h4>Gideon Babalola</h4>
<span className="close-topper">
<FaTimes

onClick={closeMe}
/>
</span>


</div>
<hr />
{
  contextMenuData.map((item, id) => (
    <Link className='sub-menu-link' key={id}  to={item.link}>
  {item.icon}
  <p>{item.label}</p>
  <span>{item.arrow}</span>
</Link>
  ))
}

</div>
</div>
  )
}

export default NavbarContextMenu