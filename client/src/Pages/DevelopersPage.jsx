
import "../styles/components/Team/team-page.css"
import ConnectivityToast from "../components/common/connectivityToast"
import DevelopersCard from "../components/Dashboard/common/DevelopersCard"
import { useGetAllDevelopers } from "../hooks/useGetAllDevelopers"
import ErrorMessage from "../components/common/ErrorMessage"
import { useState, useEffect } from "react"
import HamBurger from "../components/NotFound/Hamburger"
import { useThemeContext } from "../hooks/useThemeContext"
import MenuBar from "../components/NotFound/MenuBar"
import Toast from "../components/common/Toast"
const TeamPage = () => {
    const [nav, setNav] = useState()
    const { getAllDevelopers, isLoading, error, data, statusCode } = useGetAllDevelopers()
    const {  dispatch } = useThemeContext()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(3)
    const [developersArray, setDevelopersArray] = useState([{}, {}, {}])
    const resendRequest = () => {
getAllDevelopers(page, limit)
    }
    useEffect(() => {
dispatch({type : "dark-mode", payload : "dark-mode"})
getAllDevelopers(page, limit)
    }, [page, limit, dispatch])
    useEffect(() => {
      console.log("let me log twice")
      console.log(data)
      if(data.length > 1){
        console.log("wow")
        setDevelopersArray(data)
      }
   
    }, [data])

    useEffect(() => {
console.log(isLoading)
    }, [isLoading])

  return (
    <section className="team">
    <Toast />
    <span style={{color : "white"}}> 
    <HamBurger nav={nav} /></span>
       
        <MenuBar  nav={nav} setNav={setNav}/>
    <ConnectivityToast />
<>{
  !error ? <>
  <div className="center">
      <h1>LiteNote Developers </h1>
      <span style={{ display : "flex", alignItems : "center", justifyContent : "center", color : "white"}}>
      <u>  &nbsp;Our Developers&nbsp;</u>
    </span>
    </div>
    

    <div className="team-content">
    
    {  developersArray.map((content, index) => (
  <DevelopersCard developer={content} key={index} isLoading={isLoading}/>
    ))}

      
      
    
  
    </div>
  </>
  :
  
    <ErrorMessage
  fireClick={resendRequest}  
  title={<span style={{color : "white"}}>Something went wrong</span>} 
  message={<span style={{color : "white"}}>We are unable to load this content, check your connection</span>}
  height={70}
 />
}
 </>
  </section>
  )
}

export default TeamPage