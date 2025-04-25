
import { Link } from 'react-router-dom'
const FourZeroFour = () => {
  return (
   <>
            <h1 style={{color : "white"}} className="notfound-h1">404</h1>
        <h2 style={{color : "white"}} className="notfound-h2">UH OH! Youre lost.</h2>
        <p style={{color : "white"}}>The page you are looking for does not exist.
          How you got here is a mystery. But you can click the button below
          to go back to the homepage.
        </p>
        <Link to="/">
        <button className="notfound-btn notfound-home-button">HOME</button> 
        </Link>
   </>
  )
}

export default FourZeroFour