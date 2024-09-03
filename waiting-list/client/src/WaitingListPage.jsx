import {  useEffect, useState } from "react"
import "./waiting-list.css"
import axiosConfig from "./axiosConfig"
import { MdDelete } from "react-icons/md"
import Pagination from "./Pagination"
import { FaHome } from "react-icons/fa"
import { Link } from "react-router-dom"
// import { MdDelete } from "react-icons/md"
const WaitingListPage = () => {
  const [users, setUsers] = useState([])
  const [userCount, setUserCount] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const handleSearchChange = (e) => {
setSearchQuery(e.target.value)
  }
  const getWaitingList = async (page, limit) => {
    console.log("eeee")
    console.log("Eeke")
try{
const response = await axiosConfig.get(`/get-waiting-list?page=${page}&limit=${limit}`)
console.log(response)
if(response && response.data){
  console.log(response)
  setUserCount(response.data.waitingListNumber)
  setUsers(response.data.waitingList)
}
}catch(error){
console.log(error)
}
  }
  useEffect(() => {
getWaitingList(1, 5)
  }, [])
  
  return (
    <>
    <h2 style={{color : "white"}}>Litenote Admin Portal</h2>
         <h2 style={{color : "white"}}>Waiting List Subscription,  {userCount.toLocaleString()} Subscribed Users</h2>
         <div className="users-page-container">
 
 <section className="users-top-man">

<div className="user-search-wrapper">

<div className="field">
<input type="text" placeholder="Search Users Data" value={searchQuery} onChange={(e) => handleSearchChange(e)}/>
</div>
</div>
<div>
<Pagination />
</div>
</section>
<ul className="users-table-container" 
style={{left : "-2%"}}>
<li className="users-table-row first">
  <div className="users-table-column">S/N</div>
  <div className="users-table-column">Checkmark</div>
  <div className="users-table-column">Email</div>
  <div className="users-table-column">Date</div>

 <div className="users-table-column">Date</div>
</li>
{users.filter((user) => searchQuery ? user.email.includes(searchQuery) : true).map((content, index) => (
<li className="users-table-row" key={index}>
<div className="users-table-column">{index}</div>
 <div className="users-table-column"> <input type="checkbox" /></div>
<div  className="users-table-column">{content.email}</div>
<div  className="users-table-column">{content.date}</div>
    <div  className="users-table-column">
    
    
    <MdDelete
 className="users-table-delete-button"
  size= {20} style={{ padding : "2px"}}/> 
  
  </div>
</li>
))
}

</ul>
</div>
<Link 
to={"/"}
style={{textDecoration : "none"}}>
<span style={{color  : "white", textDecoration : "none"}}>
 <FaHome /> Go Home
</span>
</Link>

<div>
<b>© 2024 Next Verse. All rights reserved.</b>
</div>
    </>

 
  )
}

export default WaitingListPage