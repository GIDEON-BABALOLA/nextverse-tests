import DashboardToast from "../../components/common/DashboardToast"
import DashboardHeader from '../../components/Dashboard/common/DashboardHeader';
import RotationLoader from "../../components/Loaders/RotationLoader"
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md"
import "../../styles/components/Dashboard/users-page.css"
import avatar from "../../assets/29.jpg"
import SearchBar from "../../components/Browse/SearchBar"
const SettingsPage = ({dashboardToast, setDashboardToast, sidebarRef}) => {
  const data = [
    {
      "username": "user1",
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
    {
      "username": "user11",
      "followers": 973,
      "following": 678,
      "newsletter": true,
      "stories": 10,
      "likes": 485,
      "dateJoined": "2020-01-14",
      "lastSeen": "2024-03-09",
      "delete": false
    },
    {
      "username": "user12",
      "followers": 866,
      "following": 194,
      "newsletter": true,
      "stories": 78,
      "likes": 99,
      "dateJoined": "2020-05-16",
      "lastSeen": "2024-04-02",
      "delete": false
    },
    {
      "username": "user13",
      "followers": 458,
      "following": 605,
      "newsletter": false,
      "stories": 59,
      "likes": 417,
      "dateJoined": "2020-11-11",
      "lastSeen": "2024-10-04",
      "delete": false
    },
    {
      "username": "user14",
      "followers": 515,
      "following": 919,
      "newsletter": false,
      "stories": 7,
      "likes": 216,
      "dateJoined": "2020-09-23",
      "lastSeen": "2024-11-30",
      "delete": false
    },
    {
      "username": "user15",
      "followers": 99,
      "following": 492,
      "newsletter": true,
      "stories": 11,
      "likes": 121,
      "dateJoined": "2020-10-09",
      "lastSeen": "2024-07-24",
      "delete": false
    },
    {
      "username": "user16",
      "followers": 634,
      "following": 431,
      "newsletter": false,
      "stories": 12,
      "likes": 219,
      "dateJoined": "2020-05-24",
      "lastSeen": "2024-12-03",
      "delete": false
    },
    {
      "username": "user17",
      "followers": 779,
      "following": 520,
      "newsletter": false,
      "stories": 97,
      "likes": 684,
      "dateJoined": "2020-04-02",
      "lastSeen": "2024-02-28",
      "delete": false
    },
    {
      "username": "user18",
      "followers": 132,
      "following": 659,
      "newsletter": true,
      "stories": 41,
      "likes": 290,
      "dateJoined": "2020-12-04",
      "lastSeen": "2024-06-15",
      "delete": false
    },
    {
      "username": "user19",
      "followers": 803,
      "following": 246,
      "newsletter": false,
      "stories": 84,
      "likes": 320,
      "dateJoined": "2020-08-10",
      "lastSeen": "2024-05-09",
      "delete": false
    },
    {
      "username": "user20",
      "followers": 103,
      "following": 747,
      "newsletter": true,
      "stories": 27,
      "likes": 158,
      "dateJoined": "2020-12-12",
      "lastSeen": "2024-09-06",
      "delete": false
    },
    {
      "username": "user21",
      "followers": 648,
      "following": 482,
      "newsletter": true,
      "stories": 54,
      "likes": 607,
      "dateJoined": "2020-09-25",
      "lastSeen": "2024-01-05",
      "delete": false
    },
    {
      "username": "user22",
      "followers": 885,
      "following": 311,
      "newsletter": false,
      "stories": 64,
      "likes": 178,
      "dateJoined": "2020-11-08",
      "lastSeen": "2024-11-12",
      "delete": false
    },
    {
      "username": "user23",
      "followers": 766,
      "following": 698,
      "newsletter": true,
      "stories": 4,
      "likes": 678,
      "dateJoined": "2020-06-28",
      "lastSeen": "2024-05-29",
      "delete": false
    },
    {
      "username": "user24",
      "followers": 546,
      "following": 739,
      "newsletter": true,
      "stories": 93,
      "likes": 501,
      "dateJoined": "2020-12-22",
      "lastSeen": "2024-09-03",
      "delete": false
    },
    {
      "username": "user25",
      "followers": 252,
      "following": 168,
      "newsletter": false,
      "stories": 86,
      "likes": 382,
      "dateJoined": "2020-07-21",
      "lastSeen": "2024-04-10",
      "delete": false
    },
    {
      "username": "user26",
      "followers": 463,
      "following": 894,
      "newsletter": true,
      "stories": 44,
      "likes": 742,
      "dateJoined": "2020-04-21",
      "lastSeen": "2024-07-26",
      "delete": false
    },
    {
      "username": "user27",
      "followers": 527,
      "following": 201,
      "newsletter": false,
      "stories": 42,
      "likes": 295,
      "dateJoined": "2020-01-24",
      "lastSeen": "2024-11-01",
      "delete": false
    },
    {
      "username": "user28",
      "followers": 873,
      "following": 592,
      "newsletter": true,
      "stories": 98,
      "likes": 667,
      "dateJoined": "2020-08-06",
      "lastSeen": "2024-01-13",
      "delete": false
    },
    {
      "username": "user29",
      "followers": 936,
      "following": 649,
      "newsletter": false,
      "stories": 88,
      "likes": 619,
      "dateJoined": "2020-02-12",
      "lastSeen": "2024-05-12",
      "delete": false
    },
    {
      "username": "user30",
      "followers": 222,
      "following": 932,
      "newsletter": true,
      "stories": 77,
      "likes": 498,
      "dateJoined": "2020-03-25",
      "lastSeen": "2024-10-07",
      "delete": false
    },
    {
      "username": "user31",
      "followers": 389,
      "following": 398,
      "newsletter": true,
      "stories": 71,
      "likes": 312,
      "dateJoined": "2020-10-30",
      "lastSeen": "2024-03-15",
      "delete": false
    },
    {
      "username": "user32",
      "followers": 193,
      "following": 519,
      "newsletter": false,
      "stories": 13,
      "likes": 715,
      "dateJoined": "2020-03-05",
      "lastSeen": "2024-12-28",
      "delete": false
    },
    {
      "username": "user33",
      "followers": 518,
      "following": 429,
      "newsletter": false,
      "stories": 48,
      "likes": 192,
      "dateJoined": "2020-12-15",
      "lastSeen": "2024-05-11",
      "delete": false
    },
    {
      "username": "user34",
      "followers": 657,
      "following": 234,
      "newsletter": true,
      "stories": 85,
      "likes": 403,
      "dateJoined": "2020-01-21",
      "lastSeen": "2024-07-18",
      "delete": false
    },
    {
      "username": "user35",
      "followers": 583,
      "following": 562,
      "newsletter": false,
      "stories": 55,
      "likes": 209,
      "dateJoined": "2020-09-02",
      "lastSeen": "2024-02-07",
      "delete": false
    },
    {
      "username": "user36",
      "followers": 486,
      "following": 862,
      "newsletter": true,
      "stories": 15,
      "likes": 839,
      "dateJoined": "2020-10-17",
      "lastSeen": "2024-12-11",
      "delete": false
    },
    {
      "username": "user37",
      "followers": 428,
      "following": 816,
      "newsletter": true,
      "stories": 95,
      "likes": 345,
      "dateJoined": "2020-01-18",
      "lastSeen": "2024-04-28",
      "delete": false
    },
    {
      "username": "user38",
      "followers": 756,
      "following": 144,
      "newsletter": false,
      "stories": 61,
      "likes": 174,
      "dateJoined": "2020-07-30",
      "lastSeen": "2024-09-15",
      "delete": false
    },
    {
      "username": "user39",
      "followers": 345,
      "following": 702,
      "newsletter": true,
      "stories": 73,
      "likes": 289,
      "dateJoined": "2020-12-20",
      "lastSeen": "2024-08-19",
      "delete": false
    },
    {
      "username": "user40",
      "followers": 891,
      "following": 301,
      "newsletter": true,
      "stories": 23,
      "likes": 743,
      "dateJoined": "2020-02-15",
      "lastSeen": "2024-02-26",
      "delete": false
    },
    {
      "username": "user41",
      "followers": 318,
      "following": 842,
      "newsletter": false,
      "stories": 39,
      "likes": 604,
      "dateJoined": "2020-04-05",
      "lastSeen": "2024-07-29",
      "delete": false
    },
    {
      "username": "user42",
      "followers": 571,
      "following": 272,
      "newsletter": true,
      "stories": 89,
      "likes": 178,
      "dateJoined": "2020-10-19",
      "lastSeen": "2024-11-26",
      "delete": false
    },
    {
      "username": "user43",
      "followers": 141,
      "following": 176,
      "newsletter": false,
      "stories": 17,
      "likes": 347,
      "dateJoined": "2020-03-20",
      "lastSeen": "2024-01-10",
      "delete": false
    },
    {
      "username": "user44",
      "followers": 917,
      "following": 683,
      "newsletter": true,
      "stories": 68,
      "likes": 437,
      "dateJoined": "2020-11-06",
      "lastSeen": "2024-03-02",
      "delete": false
    },
    {
      "username": "user45",
      "followers": 824,
      "following": 537,
      "newsletter": false,
      "stories": 28,
      "likes": 147,
      "dateJoined": "2020-08-04",
      "lastSeen": "2024-10-02",
      "delete": false
    },
    {
      "username": "user46",
      "followers": 204,
      "following": 851,
      "newsletter": false,
      "stories": 6,
      "likes": 248,
      "dateJoined": "2020-05-14",
      "lastSeen": "2024-06-30",
      "delete": false
    },
    {
      "username": "user47",
      "followers": 685,
      "following": 355,
      "newsletter": true,
      "stories": 90,
      "likes": 213,
      "dateJoined": "2020-09-11",
      "lastSeen": "2024-02-24",
      "delete": false
    },
    {
      "username": "user48",
      "followers": 419,
      "following": 987,
      "newsletter": false,
      "stories": 30,
      "likes": 629,
      "dateJoined": "2020-06-09",
      "lastSeen": "2024-11-22",
      "delete": false
    },
    {
      "username": "user49",
      "followers": 554,
      "following": 676,
      "newsletter": false,
      "stories": 3,
      "likes": 509,
      "dateJoined": "2020-03-13",
      "lastSeen": "2024-06-12",
      "delete": false
    },
    {
      "username": "user50",
      "followers": 591,
      "following": 471,
      "newsletter": true,
      "stories": 45,
      "likes": 675,
      "dateJoined": "2020-07-07",
      "lastSeen": "2024-02-19",
      "delete": false
    }
  ]
  const combineData = (data) => {
  const result = data.reduce((acc, dat) => {
    acc.usernames = acc.usernames || [];
    acc.followers = acc.followers || [];
    acc.following = acc.following || [];
    acc.likes = acc.likes || [];
    acc.delete = acc.delete || [];
    acc.stories = acc.delete || [];
    acc.dateJoined = acc.dateJoined || [];
    acc.lastSeen = acc.lastSeen || [];

    acc.usernames.push({user : dat.username});
    acc.followers.push({followers : dat.followers});
    acc.following.push({following : dat.following});
    acc.likes.push({likes : dat.likes});
    acc.delete.push({delete : dat.delete});
    acc.stories.push({stories : dat.stories});

    return acc;
  }, {});

  return result;
};
const globe = Object.entries(combineData(data)).map(([key, value]) => {
  return value
})
console.log(globe)
console.log(globe[0])
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
    <section style={{width : "100%"}}>
   <DashboardToast dashboardToast={dashboardToast} setDashboardToast={setDashboardToast}/>
<div className="users-page-header">
<div className="users-page-filter-data">
Filter Users Data
</div>
<div className="users-page-search-data">
{/* <SearchBar /> */}
</div>


</div>
<section>
  <div className="users-table-container">

    <div className="users-table-children-now">

     <section className="legoo">
     <span>Users</span>
    {
     
      globe[0].map((content, index) => (
        
 

      

<span key={index}>{content.user}</span>


      ))}
    
      
      </section>
         <section className="legoo">
         <span>Followers</span>
    {
     
      globe[1].map((content, index) => (
        
 

      

<span key={index}>{content.followers}</span>


      ))}
      
      </section>
              <section className="legoo">
               <span>Following</span>
    {
     
      globe[2].map((content, index) => (
        
 

      

<span key={index}>{content.following}</span>


      ))}
      
      </section>
                  <section className="legoo">
                   <span>likes</span>
    {
     
      globe[3].map((content, index) => (
        
 

      

<span key={index}>{content.likes}</span>


      ))}
      
      </section>
       
     
                        <section className="legoo">
                         <span>Delete</span>
    {
     
      globe[4].map((content, index) => (
        
 

      

<span key={index}><MdDelete /></span>


      ))}
      
      </section>
  





    </div>

  
      <div>
      
      </div>
  </div>
</section>

    </section>
   

    {/* <div className="litenote-dashboard-right">
    <DashboardHeader sidebarRef={sidebarRef} contextMenu={contextMenu} setContextMenu={setContextMenu}/>
    </div> */}
    </>
    }
    </>
  )
}

export default SettingsPage