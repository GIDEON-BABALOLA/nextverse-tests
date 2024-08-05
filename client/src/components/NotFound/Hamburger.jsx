import { useState} from "react"
import Hamburger from 'hamburger-react'
const HamBurger = ({ nav}) => {
  const triggerMenu = () => {
    nav.current.dataset.state === "closed" ? nav.current.dataset.state = "open" : nav.current.dataset.state = "closed";
  }
  return (
<>
<div className="notfound-hamburger-menu" style={{color : "white"}}>
<Hamburger onToggle={triggerMenu}/>
</div>
</>
  )
}

export default HamBurger