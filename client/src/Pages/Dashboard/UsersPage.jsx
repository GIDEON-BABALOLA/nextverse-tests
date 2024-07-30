import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md"
import "../../styles/components/Dashboard/users-page.css"
import avatar from "../../assets/29.jpg"
import useWindowSize from "../../hooks/useWindowSize";
const SettingsPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
  const { width } =useWindowSize()
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
      "delete": false
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
      "delete": false
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
      "delete": false
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
      "delete": false
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
      "delete": false
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
      "delete": false
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
      "delete": false
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
      "delete": false
    },
    {
      "username": "user9",
      "followers": 674,
      "following": 33,
      "newsletter": true,
      "stories": 57,
      "likes": 547,
      "dateJoined": "2020-08-13",
      "lastSeen": "2024-07-23",
      "delete": false
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
      "delete": false
    },
    
  ]
  const tabRef = useRef()
  const combineData = (data) => {
  const result = data.reduce((acc, dat) => {
    acc.usernames = acc.usernames || [];
    acc.followers = acc.followers || [];
    acc.following = acc.following || [];
    acc.likes = acc.likes || [];
    acc.delete = acc.delete || [];
    acc.stories = acc.stories || [];
    acc.dateJoined = acc.dateJoined || [];
    acc.lastSeen = acc.lastSeen || [];

    acc.usernames.push({user : dat.username});
    acc.followers.push({followers : dat.followers});
    acc.following.push({following : dat.following});
    acc.likes.push({likes : dat.likes});
    acc.delete.push({delete : dat.delete});
    acc.stories.push({stories : dat.stories});
    acc.dateJoined.push({dateJoined : dat.dateJoined});
    acc.lastSeen.push({lastSeen : dat.lastSeen});

    return acc;
  }, {});

  return result;
};
const globe = Object.entries(combineData(data)).map(([key, value]) => {
  return value
})
const [slideDistance, setSlideDistance] = useState(0)
const [tabs, setTab] = useState({
  all : true,
  category : false,
  date : false,
  read : false
})
const clickMe = (e) => {

  switch (e.target.innerText) {
    case "All":
      setSlideDistance(0)
      setTab({
        all : true,
        category : false,
        date : false,
        read : false
      })
      break;
      case "Category":
        setSlideDistance(200)
        setTab({
          all : false,
          category : true,
          date : false,
          read : false
        })
      break;
      case "Date Added":
        setSlideDistance(400)
        setTab({
          all : false,
          category : false,
          date : true,
          read : false
        })
      break;
      case "Read Time":
        setSlideDistance(600)
        setTab({
          all : false,
          category : false,
          date : false,
          read : true
        })
      break;
    default:
      setSlideDistance(0)
      break;
  }
}
let startX, startY, endX, endY;
const minSwipeDistance = 50;
const handleTouchStart = (event) => {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
console.log("start")
}
const handleTouchEnd = (event) => {
  endX = event.changedTouches[0].clientX;
  endY = event.changedTouches[0].clientY;
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  console.log(deltaY)

  if (Math.abs(deltaX) > minSwipeDistance) {
    if (deltaX > 0) {
      // Swipe right
      tabRef.current.style.animation = "2s slideright forwards"
    } else {
      console.log("swipe left")
       tabRef.current.style.animation = "2s slideleft forwards"
    }
  }
}
// const gold = Object.entries(combineData(data)).flatMap(([key, value]) => value)
// console.log(gold)
  const [loadPage, setLoadPage] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoadPage(false)
    }, 2000);
      }, [])
      const [contextMenu, setContextMenu] = useState()
      useEffect(() => {
  
        if (contextMenu) {
          window.addEventListener('scroll', () => {
            console.log("dave")
            contextMenu.current.style.visibility = "hidden";
          });
        }
    
        return () => {
          if (contextMenu) {
            window.removeEventListener('scroll', () => {
              contextMenu.current.style.visibility = "hidden";
            });
          }
        };
      }, [contextMenu]);
  return (
    <>
    {loadPage ? 
    <>
    <RotationLoader />
    </>
     : <>
   <main>
   <div className="litenote-dashboard-right">
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
    
    </div>
   <div className="users-page-container">
   <ul className="responsive-table">
    <li className="table-header">
      <div className="col col-1">Job Id</div>
      <div className="col col-2">Customer Name</div>
      <div className="col col-3">Amount Due</div>
      <div className="col col-4">Payment Status</div>
      <div className="col col-5">Delete</div>
    </li>
    <li className="table-row">
      <div className="col col-1" data-label="Job Id"> <input type="checkbox" /></div>
      <div className="col col-1" data-label="Job Id">42235</div>
      <div className="col col-2" data-label="Customer Name">John Doe</div>
      <div className="col col-3" data-label="Amount">$350</div>
      <div className="col col-4" data-label="Payment Status">Pending</div>
      <div className="col col-5" data-label="Payment Status"><span className="material-symbols-outlined">
        delete
        </span></div>
    </li>
    <li className="table-row">
      <div className="col col-1" data-label="Job Id"> <input type="checkbox" /></div>
      <div className="col col-1" data-label="Job Id">42442</div>
      <div className="col col-2" data-label="Customer Name">Jennifer Smith</div>
      <div className="col col-3" data-label="Amount">$220</div>
      <div className="col col-4" data-label="Payment Status">Pending</div>
      <div className="col col-5" data-label="Payment Status"><span className="material-symbols-outlined">
        delete
        </span></div>
    </li>
    <li className="table-row">
      <div className="col col-1" data-label="Job Id"> <input type="checkbox" /></div>
      <div className="col col-1" data-label="Job Id">42257</div>
      <div className="col col-2" data-label="Customer Name">John Smith</div>
      <div className="col col-3" data-label="Amount">$341</div>
      <div className="col col-4" data-label="Payment Status">Pending</div>
      <div className="col col-5" data-label="Payment Status"><span className="material-symbols-outlined">
        delete
        </span></div>
    </li>
    <li className="table-row">
     
      <div className="col col-1" data-label="Job Id"> <input type="checkbox" /></div>
      <div className="col col-1" data-label="Job Id">42311</div>
      <div className="col col-2" data-label="Customer Name">John Carpenter</div>
      <div className="col col-3" data-label="Amount">$115</div>
      <div className="col col-4" data-label="Payment Status">Pending</div>
      <div className="col col-5" data-label="Payment Status"><span className="material-symbols-outlined">
        delete
        </span></div>
    </li>
    <li className="table-row">
      <div className="col col-1" data-label="Job Id"> <input type="checkbox" /></div>
      <div className="col col-1" data-label="Job Id">42311</div>
      <div className="col col-2" data-label="Customer Name">John Carpenter</div>
      <div className="col col-3" data-label="Amount">$115</div>
      <div className="col col-4" data-label="Payment Status">Pending</div>
      <div className="col col-5" data-label="Payment Status"><span className="material-symbols-outlined">
        delete
        </span></div>
    </li>
    <li className="table-row">
      <div className="col col-1" data-label="Job Id"> <input type="checkbox" /></div>
      <div className="col col-1" data-label="Job Id">42311</div>
      <div className="col col-2" data-label="Customer Name">John Carpenter</div>
      <div className="col col-3" data-label="Amount">$115</div>
      <div className="col col-4" data-label="Payment Status">Pending</div>
      <div className="col col-5" data-label="Payment Status"><span className="material-symbols-outlined">
        delete
        </span></div>
    </li>
    <li className="table-row">
      <div className="col col-1" data-label="Job Id"> <input type="checkbox" /></div>
      <div className="col col-1" data-label="Job Id">42311</div>
      <div className="col col-2" data-label="Customer Name">John Carpenter</div>
      <div className="col col-3" data-label="Amount">$115</div>
      <div className="col col-4" data-label="Payment Status">Pending</div>
      <div className="col col-5" data-label="Payment Status"><span className="material-symbols-outlined">
        delete
        </span></div>
    </li>
  </ul>
  </div>
   </main>

    {/* <div classNameName="litenote-dashboard-right">
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
    </div> */}
    </>
    }
 
  
    </>
  )
}

export default SettingsPage