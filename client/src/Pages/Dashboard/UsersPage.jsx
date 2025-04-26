import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import useNavigateProfile from "../../hooks/useNavigateProfile";
import RotationLoader from "../../components/Loaders/RotationLoader"
import NoContent from "../../components/common/NoContent";
import { useState, useEffect, useRef } from "react";
import { MdDelete,  MdClose } from "react-icons/md"
import "../../styles/components/Dashboard/users-page.css"
import useWindowSize from "../../hooks/useWindowSize";
import LoadingSpinner from "../../components/Loaders/LoadingSpinner";
import CommonAvatar from "../../components/common/CommonAvatar";
import { MdVerified } from "react-icons/md";
import { MdCheckCircle, MdClear } from "react-icons/md";
import SpecialModal  from "../../components/common/SpecialModal"
import ErrorMessage from "../../components/common/ErrorMessage";
import DeleteConsent from "../../components/common/DeleteConsent";
import Toast from "../../components/common/Toast";
import { useToastContext } from "../../hooks/useToastContext";
import DashboardPagination from "../../components/Dashboard/common/DashboardPagination";
import { useDeleteAUser } from "../../hooks/useDeleteAUser";
import { useGetAllMyUsers } from "../../hooks/useGetAllMyUsers";
import { useNavigate } from "react-router-dom";
const UsersPage = ({ sidebarRef}) => {
  const {getAllMyUsers, isLoading, error, data : userData, statusCode, userCount} = useGetAllMyUsers();
  const {deleteAUser, isLoading : deleteIsLoading, error: deleteError, data: deleteData, statusCode: deleteStatusCode } = useDeleteAUser();
  const navigateToProfile = useNavigateProfile();
  const { width } =useWindowSize()
  const [paginationCount, setPaginationCount] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [userToBePreview, setUserToBePreviewed] = useState()
  const [rangeValue, setRangeValue] = useState(0)
 const [paginationNumbers, setPaginationNumbers] = useState([1, 2, 3])
  const [emptyData, setEmptyData] = useState(false)
  const [currentValue, setCurrentValue] = useState(1);
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const [dashboardToast, setDashboardToast] = useState(true)
  const { showToast } = useToastContext();
  const [tableFilter, setTableFilter] = useState({
    Delete : true,
    Newsletter : true,
    lastSeen : true,
    dateJoined : true,
    Following : true,
    Mobile : true,
    Followers : true,
    Email : true,
    Avatar : true,
    Stories : true,
  })
  useEffect(() => {
getAllMyUsers(currentValue, 5, "-followers, -following,  -bookmarks, -refreshToken, -verificationToken, -verificationCode, -verificationTokenExpires, -ipAddress")
  }, [currentValue])
  const resendRequest = () => {
    setEmptyData(false)
    getAllMyUsers(currentValue, 5, "-followers, -following,  -bookmarks, -refreshToken, -verificationToken, -verificationCode, -verificationTokenExpires, -ipAddress")
  }
  useEffect(() => {
    if(userData.length > 0){
setEmptyData(false)
setSearchResult(userData)
    }
    setPaginationCount(userCount)
  }, [userData, userCount])
  useEffect(() => {
  if(!isLoading){
    if(paginationCount <= 5){
      console.log(paginationCount)
      setPaginationNumbers([1])
    }else if(paginationCount > 5 && paginationCount <= 10){
      setPaginationNumbers([1, 2])
    }
  }
  }, [paginationCount, isLoading])
  useEffect(() => {
    if(userData.length == 0 && !error && currentValue == 1 && userCount == 0){
      setEmptyData(true)
    }
  }, [userData, currentValue, userCount, error])


  const handleSearchChange = (e) => { 
    const value = e.target.value.trim()

    setSearchQuery(value)
    if(!value){
        return setSearchResult(userData)
    }else{
        setSearchResult(searchArray(value))
    }
}
const singleSearch = () => {
  const resultsArray = userData.filter((user) => user.email.toLowerCase().includes(searchQuery.toLowerCase()) 
  || user.mobile.includes(searchQuery) ||  user.username.toLowerCase().includes(searchQuery.toLowerCase())
) //Returns Boolean
  setSearchResult(resultsArray)
}
const searchArray = (search) => {
    //Merge Array without repeating the elements in the array more than once
    const mergeArray = (news, olds) => [...new Set([...news, ...olds])]
    return mergeArray(resultsArray(search), userData)
}
const resultsArray = (search) => {
  const resultsArray = userData.filter((user) => user.email.toLowerCase().includes(search.toLowerCase()) 
  || user.mobile.includes(search) ||  user.username.toLowerCase().includes(search.toLowerCase())
) //Returns Boolean
return resultsArray

}
const tableRef = useRef()
const slideValue = useRef()
const inputSlider = useRef()
const math = useRef()
const slideInput = (e) => {
  let value = e.target.value
setRangeValue(value)
  slideValue.current.innerText = value;
  slideValue.current.style.left = (value/2) + "%";
}
const resetTable = () => {
  setTableFilter({
    Delete : true,
    Newsletter : true,
    lastSeen : true,
    dateJoined : true,
    Following : true,
    Mobile : true,
    Followers : true,
    Email : true,
    Avatar : true,
    Stories : true
  })
}

const filterTable = (e) => {
  const textContent = e.currentTarget.closest('li').innerText.trim();
switch (textContent) {
  case "Delete":
   setTableFilter((prevState) => {
    const { Delete } = prevState;

    return {...prevState, Delete : !Delete}
   })
    break;
    case "Newsletter":
      setTableFilter((prevState) => {
       const { Newsletter } = prevState;
       return {...prevState, Newsletter: !Newsletter}
      })
       break;
       case "Email":
        setTableFilter((prevState) => {
         const { Email } = prevState;
         return {...prevState, Email: !Email}
        })
        
         break;
         case "Avatar":
          setTableFilter((prevState) => {
           const { Avatar } = prevState;
           return {...prevState, Avatar: !Avatar}
          })
          
           break;
           case "Following":
            setTableFilter((prevState) => {
             const { Following } = prevState;
             return {...prevState, Following: !Following}
            })
            
             break;
             case "Followers":
              setTableFilter((prevState) => {
               const { Followers } = prevState;
               return {...prevState, Followers: !Followers}
              })
              
               break;
               case "Mobile":
                setTableFilter((prevState) => {
                 const { Mobile } = prevState;
                 return {...prevState, Mobile: !Mobile}
                })
                
                 break;
                 case "Stories":
                  setTableFilter((prevState) => {
                   const { Stories } = prevState;
                   return {...prevState, Stories: !Stories}
                  })
                  
                   break;
                   case "Date-Joined":
                    setTableFilter((prevState) => {
                     const { dateJoined } = prevState;
                     return {...prevState, dateJoined: !dateJoined}
                    })
                    
                     break;
                     case "Last-Seen":
                      setTableFilter((prevState) => {
                       const { lastSeen } = prevState;
                       return {...prevState, lastSeen: !lastSeen}
                      })
                      
                       break;
  

  default:
    break;
}
};

const slideBlur = () => {
  slideValue.classList.remove("show");
}

useEffect(() => {
if(width < 768){
  if(tableRef.current){
tableRef.current.style.left = -rangeValue + "%"
  }
}

}, [rangeValue])
      const [contextMenu, setContextMenu] = useState()
      const deleteUser = (username) => {
        console.log(username)
        deleteAUser(username)
      }
      const handleAccountDeletion = () => {
      deleteAUser(userToBePreview.username)
      }
      useEffect(() => {
if(deleteError){
  showToast("Error", deleteError.message, false)
}
if(Object.keys(deleteData).length !== 0){
  showToast("Success", deleteData.message, true)
  setOpenModal(false)
  setDeleteModal(false)
  console.log("success")
  const newData = [...searchResult].filter((user) => user.email !== userToBePreview.email)
  setSearchResult(newData)
  setPaginationCount(paginationCount - 1)
}
      }, [deleteData, deleteError])
      useEffect(() => {
if(!isLoading){
  if(searchResult.length == 0 && currentValue > 1){
    setCurrentValue(currentValue - 1)
    }
}
      }, [searchResult, isLoading, currentValue])
      const previewUserHtml = () => {
        
        return (
        <>{ userToBePreview &&
      <div>
        <div className="preview-user-container">
        <div>
        <CommonAvatar
   style={{height : "80px", width: "80px"}}
  image={userToBePreview.picture}
  className="table-avatar"

  />

        </div>
        <span style={{display : "flex", flexDirection : "row", justifyContent : "space-between"}}>
        <h4>{userToBePreview.email} </h4>
        { userToBePreview.verification &&
        <MdVerified style={{marginLeft : "1%", color : "black", fill : "#FF4B33"}} size={30}/>
      }
        </span>
        <p style={{display : "flex", flexDirection : "column"}}>
          <span> {userToBePreview.username}</span>
          <span> {userToBePreview.bio}</span>
                    
                    </p>
                    <p>Full Details</p>
                    <ul className="preview-user-container-full-details-container">
                      <li className="preview-user-container-full-details">{userToBePreview.email}</li>
                      <li className="preview-user-container-full-details">{userToBePreview.totalfollowers} followers</li>
                      <li className="preview-user-container-full-details">{userToBePreview.totalfollowing} following</li>
                      <li className="preview-user-container-full-details">{userToBePreview.mobile} mobile</li>
                      <li className="preview-user-container-full-details">{userToBePreview.storyCount} stories</li>
                      <li className="preview-user-container-full-details">{userToBePreview.status == true ? "Status Verified" : "Status Unverified"}</li>
                      <li className="preview-user-container-full-details">{userToBePreview.updatedAt.split("T")[0]} Last-Seen</li>
                      <li className="preview-user-container-full-details">{userToBePreview.createdAt.split("T")[0]} Date-Joined</li>
                      
                    </ul>
                    </div>
                    <div className="preview-user-action-buttons">
                   { 
                    deleteIsLoading ? 
                    <span ><LoadingSpinner /></span>
                    :
                    <span onClick={() => deleteUser(userToBePreview.username)}>Delete User</span>
      }
                    <span onClick={() => navigateToProfile(userToBePreview.username)}>View Profile</span>
                    </div>
        </div>

        }
        </>)
      }
      const previewUserData = (currentUser) => {
   setOpenModal(true)
   setUserToBePreviewed(currentUser)
   return;
}
  return (
    <>

    {isLoading ? 
    <>
    <RotationLoader />
    </>
     : <>
     { !error &&
   <main className="users-page-phone-help">
       <DeleteConsent openModal={deleteModal} setOpenModal={setDeleteModal}
                        title={"Are you sure you want to delete?"}
                        message={"This action will permanently delete this Account. This cannot be undone"}
                        buttonText ={"Delete Account"}
                        deleteFunction={handleAccountDeletion}
                        isLoading={deleteIsLoading}
        />
        <Toast />
   <SpecialModal openModal={openModal} setOpenModal={setOpenModal} content={previewUserHtml()} height={400} width={400}/>
   <div className="litenote-dashboard-right">
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
    
    </div>
    <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
   <h2 className="users-page-phone-title" style={{fontWeight : 900}}>Search And Filter Your Users Data</h2>
   { width < 790 && 
   <>
   
    
    <h3 className="table-slider-title" style={{fontWeight : 900}}> Table Slider</h3>
   <div className="range">
        <div className="sliderValue">
          <span className="" ref={slideValue} style={{left : "0%"}}>100</span>
        </div>
<div className="field">
          <div className="value left" style={{marginLeft : "-10px"}}>
{rangeValue}</div>
<input 
ref={inputSlider}
onInput={slideInput}
onBlur={slideBlur}
type="range" min="0" max="60" value={rangeValue} step="1"/>
          <div className="value right">
60</div>
</div>
</div>
</>
   }
   <div className="users-page-headings">
   <section className="users-top-man">
  
  <div className="user-search-wrapper">

  <div className="field">
     <input type="text" placeholder="Search Users Data" value={searchQuery} onChange={(e) => handleSearchChange(e)}/>
     <label htmlFor="click" className="btn-2" onClick={() => singleSearch()}>Search</label>
  </div>
</div>
<div>
<DashboardPagination paginationNumbers={paginationNumbers} setPaginationNumbers={setPaginationNumbers} userCount={paginationCount}
currentValue={currentValue}
setCurrentValue={setCurrentValue}
/>
</div>
  </section>
    <section>
    {
      width > 790 &&
    
    <div className="filter-tags-wrapper">
        {/* <div className="filter-tags-title">
            <h5>Tags</h5>
        </div> */}
        <div className="filter-tags-content">
            <p>Filter Data, Click the x mark to filter data</p>
            <ul>
            {/* <input type="text" /> */}
           { tableFilter.Delete &&   <li>Delete <i onClick={filterTable}><MdClose style={{backgroundColor : "#DFDFDF"}}/></i></li>}
            {tableFilter.Newsletter &&   <li>Newsletter <i onClick={filterTable}><MdClose style={{backgroundColor : "#DFDFDF"}}/></i></li>}
            { tableFilter.lastSeen &&  <li>Last-Seen <i onClick={filterTable}><MdClose style={{backgroundColor : "#DFDFDF"}}/></i></li>}
            { tableFilter.dateJoined &&   <li>Date-Joined <i onClick={filterTable}><MdClose style={{backgroundColor : "#DFDFDF"}}/></i></li>}
            { tableFilter.Following &&   <li>Following <i onClick={filterTable}><MdClose style={{backgroundColor : "#DFDFDF"}}/></i></li>}
            { tableFilter.Mobile &&  <li>Mobile<i onClick={filterTable}><MdClose style={{backgroundColor : "#DFDFDF"}}/></i></li>}
            {  tableFilter.Followers &&  <li>Followers<i onClick={filterTable}><MdClose style={{backgroundColor : "#DFDFDF"}}/></i></li>}
            {  tableFilter.Email &&  <li>Email<i onClick={filterTable}><MdClose style={{backgroundColor : "#DFDFDF"}}/></i></li>}
             { tableFilter.Avatar  && <li>Avatar<i onClick={filterTable}><MdClose style={{backgroundColor : "#DFDFDF"}}/></i></li>}
            { tableFilter.Stories && <li>Stories<i onClick={filterTable}><MdClose style={{backgroundColor : "#DFDFDF"}}/></i></li>}
            
            
            </ul>
        </div>
        <div className="filter-tags-details">
            <p><span>{
               
              Object.values(tableFilter).filter((obj) => obj == true).length
            }</span> tags are remaining</p>
            <button onClick={resetTable}>Reset Table</button>
        </div>
    </div>
    }

    </section>



   </div>
   <div className="users-page-container" ref={math}>
   <ul className="users-table-container" 
   style={{left : "-2%"}}
   ref={tableRef}>
    <li className="users-table-row first">
      { <div className="users-table-column" >S/N</div>}
      {<div className="users-table-column" >Check</div>}
      {  tableFilter.Avatar  && <div className="users-table-column">Avatar</div>}
      {  tableFilter.Email && <div className="users-table-column">Email</div>}
      {  tableFilter.Followers && <div className="users-table-column" >Followers</div>}
      { tableFilter.Following && <div  className="users-table-column">Following</div>}
      {  tableFilter.Mobile && <div  className="users-table-column">Mobile</div>}
      {  tableFilter.Stories && <div  className="users-table-column">Stories</div>}
      {  tableFilter.dateJoined && <div  className="users-table-column">Date-Joined</div>}
      {  tableFilter.lastSeen && <div  className="users-table-column">Last-Seen</div>}
      
    {  tableFilter.Newsletter && <div  className="users-table-column">Newsletter</div>}
      {  tableFilter.Delete && <div  className="users-table-column">Delete</div>}

      
    </li>
    <>
    {
           emptyData ? 
           <div>
             <NoContent message={`Litenote Has No Users`}
                    fireClick={
                     () => {
         
                     
         resendRequest()
                     }}
             />
           </div>
           :
           <>
           {
  searchResult.map((user, index) => (
    <li className="users-table-row" key={index + 1} onDoubleClick={ () => previewUserData(user)}>
    <div className="users-table-column" data-label="Job Id">{index + 1}</div>
      <div className="users-table-column" data-label="Job Id"> <input type="checkbox" /></div>
      {  tableFilter.Avatar  && <div    className="users-table-column" >  
        <CommonAvatar
   style={{height : "40px", width: "40px"}}
  image={user.picture}
  className="table-avatar"

  />
        </div>}
      { tableFilter.Email && <div  className="users-table-column" data-label="Amount">{user.email}</div>}
      { tableFilter.Followers && <div  className="users-table-column" data-label="Amount">{user.totalfollowers}</div>}
      { tableFilter.Following && <div  className="users-table-column" data-label="Payment Status">{user.totalfollowing}</div>}
      {  tableFilter.Mobile && <div  className="users-table-column" data-label="Payment Status">{user.mobile}</div>}
      { tableFilter.Stories && <div  className="users-table-column" data-label="Payment Status">{user.storyCount}</div>}
      { tableFilter.dateJoined && <div  className="users-table-column" data-label="Payment Status">{user.createdAt.split("T")[0]}</div>}
      { tableFilter.lastSeen && <div  className="users-table-column" data-label="Payment Status">{user.updatedAt.split("T")[0]}</div>}
      { tableFilter.Newsletter && <div  className="users-table-column" data-label="Payment Status">{user.newsletter ? <MdCheckCircle style={{color : "green"}} /> : <MdClear style={{color : "red"}}  /> }</div>}
      {  tableFilter.Delete == true && <div  className="users-table-column" data-label="Payment Status"><MdDelete
      className="users-table-delete-button"
      onClick={() => { setDeleteModal(true); setUserToBePreviewed(user)}}
       size= {20} style={{ padding : "2px"}}/>
       <span className="delloader"></span>
       </div>}
    </li>
  ))
}
           </>
    }
    </>

  </ul>
  </div>
  {/* <div>
    Golang is one of the best programming languages
  </div> */}
   </main>
}
{error && <>


{ error?.code == "ERR_NETWORK" ? 
  <ErrorMessage title={"Check Your Internet Connection"} 
message={"We are unable to load this content, check your connection"}
height={100}
type={error.code}
fireClick = {resendRequest}
/>
:
error?.code == "ERR_CANCELED"

?
<ErrorMessage title={"Timeout Error"} 
message={"Sorry, Your Request Has Timed Out, Pls click on the refresh button"}
height={100}
type={error.code}
fireClick = {resendRequest}
/>
:
<ErrorMessage title={"Something went wrong"} 
message={"We are unable to load this content, Pls click on the refresh button"}
height={100}
type={error.code}
fireClick = {resendRequest}
/>
}
</>
}
   
    </>
    }
 
  
    </>
  )
}

export default UsersPage