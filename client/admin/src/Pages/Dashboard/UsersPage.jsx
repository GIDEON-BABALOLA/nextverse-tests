import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import { useState, useEffect, useRef } from "react";
import { MdDelete,  MdClose } from "react-icons/md"
import "../../styles/components/Dashboard/users-page.css"
import useWindowSize from "../../hooks/useWindowSize";
import { MdCheckCircle, MdClear } from "react-icons/md";
import SpecialModal  from "../../components/common/SpecialModal"
import DashboardPagination from "../../components/Dashboard/common/DashboardPagination";
const UsersPage = ({ sidebarRef}) => {
  const { width } =useWindowSize()
  const [openModal, setOpenModal] = useState(false)
  const [userToBePreview, setUserToBePreviewed] = useState()
  const [rangeValue, setRangeValue] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const [dashboardToast, setDashboardToast] = useState(true)
  const [tableFilter, setTableFilter] = useState({
    Delete : true,
    Newsletter : true,
    lastSeen : true,
    dateJoined : true,
    Following : true,
    Likes : true,
    Followers : true,
    Email : true,
    Avatar : true,
    Stories : true,


  })
  const data = [
    {
      "username": "Ghhhhhhhhhhhhhhhhideon-Babaloeee5555555555555555555eela",
      "followers": 381,
      "following": 145,
      "newsletter": false,
      "stories": 29,
      "likes": 245,
      "dateJoined": "2020-11-14",
      "lastSeen": "2024-06-20",
      "email" : "dev@gmail.com",
      "avatar": "https://res.cloudinary.com/doctr0fct/image/upload/v1730507572/Avatars/yqsbhjvpt99uddtuy7tr_htvqzt.jpg",
      
    },
    {
      "username": "user2",
      "followers": 195,
      "following": 937,
      "newsletter": true,
      "stories": 16,
      "likes": 926,
      "dateJoined": "2020-07-19",
      "lastSeen": "2024-12-18",
      "email" : "dev@gmail.com",
      "avatar": "https://res.cloudinary.com/doctr0fct/image/upload/v1730507572/Avatars/yqsbhjvpt99uddtuy7tr_htvqzt.jpg"
    },
    {
      "username": "user3",
      "followers": 505,
      "following": 122,
      "newsletter": true,
      "stories": 65,
      "likes": 457,
      "dateJoined": "2020-10-26",
      "lastSeen": "2024-10-17",
      "email" : "dev@gmail.com",
      "avatar": "https://res.cloudinary.com/doctr0fct/image/upload/v1730507572/Avatars/yqsbhjvpt99uddtuy7tr_htvqzt.jpg"
    },
    {
      "username": "user4",
      "followers": 748,
      "following": 661,
      "newsletter": false,
      "stories": 18,
      "likes": 623,
      "dateJoined": "2020-06-27",
      "lastSeen": "2024-07-25",
      "email" : "dev@gmail.com",
      "avatar":"https://res.cloudinary.com/doctr0fct/image/upload/v1730507572/Avatars/yqsbhjvpt99uddtuy7tr_htvqzt.jpg"
    },
    {
      "username": "user5",
      "followers": 867,
      "following": 455,
      "newsletter": false,
      "stories": 31,
      "likes": 163,
      "dateJoined": "2020-04-18",
      "lastSeen": "2024-09-21",
      "email" : "dev@gmail.com",
      "avatar": "https://res.cloudinary.com/doctr0fct/image/upload/v1730507572/Avatars/yqsbhjvpt99uddtuy7tr_htvqzt.jpg"
    },
    {
      "username": "user6",
      "followers": 131,
      "following": 206,
      "newsletter": true,
      "stories": 35,
      "likes": 289,
      "dateJoined": "2020-03-15",
      "lastSeen": "2024-11-13",
      "email" : "dev@gmail.com",
      "avatar": "https://res.cloudinary.com/doctr0fct/image/upload/v1730507572/Avatars/yqsbhjvpt99uddtuy7tr_htvqzt.jpg"
    },
    {
      "username": "user7",
      "followers": 942,
      "following": 846,
      "newsletter": true,
      "stories": 82,
      "likes": 194,
      "dateJoined": "2020-08-05",
      "lastSeen": "2024-03-06",
      "email" : "dev@gmail.com",
      "avatar": "https://res.cloudinary.com/doctr0fct/image/upload/v1730507572/Avatars/yqsbhjvpt99uddtuy7tr_htvqzt.jpg"
    },
    {
      "username": "user8",
      "followers": 356,
      "following": 241,
      "newsletter": false,
      "stories": 51,
      "likes": 95,
      "dateJoined": "2020-07-11",
      "lastSeen": "2024-05-22",
      "email" : "dev@gmail.com",
      "avatar": "https://res.cloudinary.com/doctr0fct/image/upload/v1730507572/Avatars/yqsbhjvpt99uddtuy7tr_htvqzt.jpg"
    },
    {
      "username": "user9",
      "followers": 674,
      "following": 33,
      "newsletter": true,
      "stories": 57,
      "likes": 75,
      "dateJoined": "2020-08-13",
      "lastSeen": "2024-07-23",
      "email" : "dev@gmail.com",
      "avatar": "https://res.cloudinary.com/doctr0fct/image/upload/v1730507572/Avatars/yqsbhjvpt99uddtuy7tr_htvqzt.jpg"
    },
    {
      "username": "user10",
      "followers": 422,
      "following": 491,
      "newsletter": false,
      "stories": 80,
      "likes": 358,
      "dateJoined": "2020-10-12",
      "lastSeen": "2024-12-14",
      "email" : "solution@gmail.com",
      "avatar": "https://res.cloudinary.com/doctr0fct/image/upload/v1730507572/Avatars/yqsbhjvpt99uddtuy7tr_htvqzt.jpg"
    },
    
  ]

  const handleSearchChange = (e) => { 
    const value = e.target.value.trim()

    setSearchQuery(value)
    if(!value){
        return setSearchResult(data)
    }else{
        setSearchResult(searchArray(value))
    }
}
const searchArray = (search) => {
    //Merge Array without repeating the elements in the array more than once
    const mergeArray = (news, olds) => [...new Set([...news, ...olds])]
    return mergeArray(resultsArray(search), data)
}
const resultsArray = (search) => {
    const resultsArray = data.filter((user) => user.email.toLowerCase().includes(search.toLowerCase()) 
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
    Likes : true,
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
               case "Likes":
                setTableFilter((prevState) => {
                 const { Likes } = prevState;
                 return {...prevState, Likes: !Likes}
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
tableRef.current.style.left = -rangeValue + "%"
}

}, [rangeValue])


  const [loadPage, setLoadPage] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoadPage(false)
      setSearchResult(data)
    }, 2000);
      }, [])
      const [contextMenu, setContextMenu] = useState()
      const previewUserHtml = () => {
        
        return (
        <>{ userToBePreview &&
      <div>
        <div className="preview-user-container">
        <div><img className="table-avatar" src={userToBePreview.avatar}></img></div>
        <h4>{userToBePreview.email} </h4>
        <p>
                        Technical Writer And Litenote User
                       
                    </p>
                    <p>Full Details</p>
                    <ul className="preview-user-container-full-details-container">
                      <li className="preview-user-container-full-details">{userToBePreview.email}</li>
                      <li className="preview-user-container-full-details">{userToBePreview.followers} followers</li>
                      <li className="preview-user-container-full-details">{userToBePreview.followers} following</li>
                      <li className="preview-user-container-full-details">{userToBePreview.likes} likes</li>
                      <li className="preview-user-container-full-details">{userToBePreview.likes} stories</li>
                      <li className="preview-user-container-full-details">{userToBePreview.lastSeen} Last-Seen</li>
                      <li className="preview-user-container-full-details">{userToBePreview.dateJoined} Date-Joined</li>
                    </ul>
                    </div>
                    <div className="preview-user-action-buttons">
                    <span>Delete User</span>
                    <span>View Profile</span>
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
    {loadPage ? 
    <>
    <RotationLoader />
    </>
     : <>
     
   <main className="users-page-phone-help">
   <SpecialModal openModal={openModal} setOpenModal={setOpenModal} title="Current User" content={previewUserHtml()} height={400} width={400}/>
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
     <label htmlFor="click" className="btn-2">Search</label>
  </div>
</div>
<div>
<DashboardPagination />
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
            { tableFilter.Likes &&  <li>Likes<i onClick={filterTable}><MdClose style={{backgroundColor : "#DFDFDF"}}/></i></li>}
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
      {  tableFilter.Likes && <div  className="users-table-column">Likes</div>}
      {  tableFilter.Stories && <div  className="users-table-column">Stories</div>}
      {  tableFilter.dateJoined && <div  className="users-table-column">Date-Joined</div>}
      {  tableFilter.lastSeen && <div  className="users-table-column">Last-Seen</div>}
    {  tableFilter.Newsletter && <div  className="users-table-column">Newsletter</div>}
      {  tableFilter.Delete && <div  className="users-table-column">Delete</div>}

      
    </li>
{
  searchResult.map((user, index) => (
    <li className="users-table-row" key={index} onDoubleClick={ () => previewUserData(user)}>
    <div className="users-table-column" data-label="Job Id">{index}</div>
      <div className="users-table-column" data-label="Job Id"> <input type="checkbox" /></div>
      {  tableFilter.Avatar  && <div    className="users-table-column" >  <img className="table-avatar" src={user.avatar}></img></div>}
      { tableFilter.Email && <div  className="users-table-column" data-label="Amount">{user.email}</div>}
      { tableFilter.Followers && <div  className="users-table-column" data-label="Amount">{user.followers}</div>}
      { tableFilter.Following && <div  className="users-table-column" data-label="Payment Status">{user.following}</div>}
      {  tableFilter.Likes && <div  className="users-table-column" data-label="Payment Status">{user.likes}</div>}
      { tableFilter.Stories && <div  className="users-table-column" data-label="Payment Status">{user.stories}</div>}
      { tableFilter.dateJoined && <div  className="users-table-column" data-label="Payment Status">{user.dateJoined}</div>}
      { tableFilter.lastSeen && <div  className="users-table-column" data-label="Payment Status">{user.lastSeen}</div>}
      { tableFilter.Newsletter && <div  className="users-table-column" data-label="Payment Status">{user.newsletter ? <MdCheckCircle style={{color : "green"}} /> : <MdClear style={{color : "red"}}  /> }</div>}
      {  tableFilter.Delete == true && <div  className="users-table-column" data-label="Payment Status"><MdDelete
      className="users-table-delete-button"
       size= {20} style={{ padding : "2px"}}/></div>}
    </li>
  ))
}

  </ul>
  </div>
  {/* <div>
    Golang is one of the best programming languages
  </div> */}
   </main>

   
    </>
    }
 
  
    </>
  )
}

export default UsersPage