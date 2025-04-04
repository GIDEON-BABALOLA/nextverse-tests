import "../../styles/components/Home/intro.css"
import { Link } from  "react-router-dom"
const Intro = () => {
  return (
<>
<section className="intro-hero">
      <div className="intro-hero-content">
        <h1 style={{fontFamily :  " 'Poppins', sans-serif"}}>Share Your Stories</h1>
        <p>Connect with others through the power of storytelling.</p>
        <Link to={"/dashboard/publish"} className="intro-btn" style={{fontSize : "1.4rem"}}>Start Writing</Link>
     
     
      </div>
    </section>
</>
  )
}

export default Intro 