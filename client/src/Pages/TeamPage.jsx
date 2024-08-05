import Gid from "../assets/Great.jpg"
import favour from "../assets/29.jpg"
import Great from "../assets/Great.jpg"
import "../styles/components/Team/team-page.css"
import ConnectivityToast from "../components/common/connectivityToast"
import { FaXTwitter, FaInstagram,  FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom"
import { useState } from "react"
import HamBurger from "../components/NotFound/Hamburger"
import MenuBar from "../components/NotFound/MenuBar"
const TeamPage = () => {
    const [nav, setNav] = useState()
  return (
    <section className="team">
    <span style={{color : "white"}}> 
    <HamBurger nav={nav} /></span>
       
        <MenuBar  nav={nav} setNav={setNav}/>
    <ConnectivityToast />
    <div className="center">
      <h1>LiteNote Developers </h1>
      <span style={{ display : "flex", alignItems : "center", justifyContent : "center", color : "white"}}>
      <u>  &nbsp;Our Team&nbsp;</u>
    </span>
    </div>

    <div className="team-content">
      <div className="box">
       <img src={Great} alt="" />
       <h3>Great</h3>
       <h5> Product Designer, <br/> 
          Front-end Developer </h5>
       <div className="icons">
       <FaXTwitter />
       <FaInstagram />
         <FaLinkedin />
       </div>
      </div>
    
      <div className="box">
       <img src={Gid} alt="" />
       <h3>Babalola Gideon</h3>
       <h5>Software Engineer </h5>
       <div className="icons">
       <FaXTwitter />
       <FaInstagram />
       <Link>
       <FaLinkedin />
       </Link>
         
       </div>
      </div>
      <div className="box">
       <img src={favour} alt="" />
       <h3>Adigun Favour</h3>
       <h5>Product Designer/Project Manager/Front-end Developer</h5>
       <div className="icons">
       <FaXTwitter />
       <FaInstagram />
         <FaLinkedin />
       </div>
      </div>
    </div>
  </section>
  )
}

export default TeamPage