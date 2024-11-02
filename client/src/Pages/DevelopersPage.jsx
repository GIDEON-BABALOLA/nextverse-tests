
import "../styles/components/Team/team-page.css"
import ConnectivityToast from "../components/common/connectivityToast"
import DevelopersCard from "../components/Dashboard/common/DevelopersCard"
import { useState } from "react"
import HamBurger from "../components/NotFound/Hamburger"
import MenuBar from "../components/NotFound/MenuBar"
const TeamPage = () => {
    const [nav, setNav] = useState()
    const developersArray = [
      {
      name : "Great Eyarhono",
      role : "Product Marketer,Graphics Designer",
      avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507571/Avatars/yi07tltxmoaej1ybc0hh_arztoa.jpg",
      linkedin : "",
      twitter : "",
      instagram : ""
      },
{
  name : "Gideon Babalola",
  role : "Software Engineer",
  avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg",
  linkedin : "https://www.linkedin.com/in/gideon-babalola",
  twitter : "https://x.com/_gideonbabalola",
  instagram : "https://www.instagram.com/babalolagideon9/"
},
{
  name : "Favour Adigun",
  role : "Product Designer/Project Manager/Front-end Developer",
  avatar : "https://res.cloudinary.com/doctr0fct/image/upload/v1730507566/Avatars/szqnijp8r22oqll5rzmn_rpuiqj.jpg",
  linkedin : "https://www.linkedin.com/in/favour-damilare-258775298/",
  twitter : "",
  instagram : ""
}
    ]
  return (
    <section className="team">
    <span style={{color : "white"}}> 
    <HamBurger nav={nav} /></span>
       
        <MenuBar  nav={nav} setNav={setNav}/>
    <ConnectivityToast />
    <div className="center">
      <h1>LiteNote Developers </h1>
      <span style={{ display : "flex", alignItems : "center", justifyContent : "center", color : "white"}}>
      <u>  &nbsp;Our Developers&nbsp;</u>
    </span>
    </div>

    <div className="team-content">
    {developersArray.map((content, index) => (
  <DevelopersCard developer={content} key={index}/>
    ))}
      
    
  
    </div>
  </section>
  )
}

export default TeamPage