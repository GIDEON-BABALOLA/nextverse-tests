import {  useEffect, useState } from "react"
import "./waiting-list.css"
import axiosConfig from "./axiosConfig"
import { MdDelete } from "react-icons/md"
import Pagination from "./Pagination"
import { FaHome } from "react-icons/fa"
import { Link } from "react-router-dom"
import Download from "./Download"
import toast, { Toaster } from "react-hot-toast"
// import { MdDelete } from "react-icons/md"
const WaitingListPage = () => {
  const [users, setUsers] = useState([])
  const [userCount, setUserCount] = useState(0)
  const [paginationNumbers, setPaginationNumbers] = useState([1, 2, 3])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState({
    email : "",
    load : false
  })
  const [dataLoading, setDataLoading] = useState(false)
  const deleteSubscribedUser = async (email) => {
    setIsLoading({email : email, load : true})
try{
const response = await axiosConfig.delete(`/delete-subscribed-user/${email}`, {
  email : email
})
if(response.status == 204){
  setIsLoading({email : email, load : false})
  setUsers( users.filter((user) => user.email !== email))
  setUserCount(userCount - 1)
  toast.success(`You have successfully deleted the user with the email ${email}`)
}
}catch(error){
  setIsLoading({email : email, load : false})
  if(error.message == "Network Error"){
    toast.error("Our Service Is Offline")
  }else{
  toast.error(error.response.data.message)
  }
}
  }

  const handleSearchChange = (e) => {
setSearchQuery(e.target.value)
  }
  const getWaitingList = async (page, limit) => {
    setDataLoading(true)
try{
const response = await axiosConfig.get(`/get-waiting-list?page=${page}&limit=${limit}`)
if(response && response.data){
  setDataLoading(false)
  setUserCount(response.data.waitingListNumber)
  if(response.data.waitingListNumber <= 5){
    setPaginationNumbers([1])
  }else if(response.data.waitingListNumber > 5 && response.data.waitingListNumber <= 10){
    setPaginationNumbers([1, 2])
  }
  // setPaginationNumbers([response.data.waitingListNumber])
  setUsers(response.data.waitingList)
  return response.data.waitingList
}
}catch(error){
  console.log(error)
  setDataLoading(false)
}
  }
  useEffect(() => {
getWaitingList(1, 5)

  }, [])
  
  return (
    <>
    <Toaster />
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
<Pagination 
paginationNumbers={paginationNumbers}
setPaginationNumbers={setPaginationNumbers}
 userCount={userCount} getWaitingList={getWaitingList}/>
</div>
</section>
<ul className="users-table-container" 
style={{left : "-2%"}}>
<li className="users-table-row first">
  <div className="users-table-column">S/N</div>
  <div className="users-table-column">Checkmark</div>
  <div className="users-table-column">Email</div>
  <div className="users-table-column">Date</div>

 <div className="users-table-column">Delete</div>
</li>
{ dataLoading ? 
  <div 
  style={{display : "flex", alignItems : "center", justifyContent : "center", placeItems : "center",
  margin : "100px"
  }}>
    <div className="box-loader" style={{textAlign : "center"}}></div>
    </div>  :
    ( 
      users.length !== 0 ?
  users.filter((user) => searchQuery ? user.email.includes(searchQuery) : true).map((content, index) => (
<li className="users-table-row" key={index}>
<div className="users-table-column">{index}</div>
 <div className="users-table-column"> <input type="checkbox" /></div>
<div  className="users-table-column">{content.email}</div>
<div  className="users-table-column">{content.date}</div>
    <div  className="users-table-column"
    >
    
    { isLoading.load && isLoading.email == content.email ? 
    <div style={{display : "flex", alignItems : "center", justifyContent : "center", placeItems : "center"}}>
    <div className="box-loader" style={{textAlign : "center"}}></div>
    </div>
    
       :
    <MdDelete
       onClick={
      ()=>{
        deleteSubscribedUser(content.email)
      }
     }
 className=""
  size= {20} style={{ padding : "2px", background : "#F2F2F2"}}/> 
    }
  
  </div>
</li>
))
: <span style={{color : "white", fontFamily : "Poppins"}}>This Page Does Not Exist</span>
)
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
<Download />

<div>
<b>© 2024 Next Verse. All rights reserved.</b>
</div>
    </>

 
  )
}

export default WaitingListPage