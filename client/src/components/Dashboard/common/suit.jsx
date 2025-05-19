
 import { useGetNotificationsCount } from "../../../hooks/useGetNotificationsCount"
import { MdGridView, MdGroups,
   MdBookmarks,
   MdBarChart,
   MdNotifications,
   MdAutoStories, MdPersonOutline, MdReport, MdEmail, MdSettings, MdLogout, MdClose } from 'react-icons/md';
import { FaHome, FaBookmark } from 'react-icons/fa';
import NotificationBadge from "../../../components/common/NotificationBadge"
import { Link, useParams } from "react-router-dom"
import "../../../styles/components/Dashboard/sidebar.css"
import {useAuthContext} from "../../../hooks/useAuthContext"
import { CgFeed} from "react-icons/cg"
import { useThemeContext } from '../../../hooks/useThemeContext';
import { MdDynamicFeed } from "react-icons/md";
import {  useEffect } from 'react';
import useWindowSize from '../../../hooks/useWindowSize';
import useImageLoad from '../../../hooks/useImageLoaded';
import LogoutConsent from "../../../components/common/LogoutConsent"
import SpecialModal from "../../common/SpecialModal";
import { useState } from 'react';
const SideBar = ({sidebarRef, dashboardToast, setDashboardToast}) => {
   const { notificationsCount, getNotificationsCount } = useGetNotificationsCount();
   const { user } = useAuthContext()
   const [openModal, setOpenModal] = useState(false)
   const [loading, setLoading] = useState(true)
   const { loaded, error } = useImageLoad("https://res.cloudinary.com/doctr0fct/image/upload/v1715858874/company/lgudp6d1efith51xwyev.png");
   useEffect(() => {
      if (error) {
       setLoading(true)
      }
    
      if (loaded === true) {
      setLoading(false)
      }
    }, [loaded, error])
   const { colorMode } = useThemeContext()
   const { width } = useWindowSize() 
   useEffect(() => {
      if(colorMode == ""){
        document.body.classList.remove('dark-theme-variables');
        
      }
      // }
  switch (colorMode) {
    case "dark-mode":
      document.body.classList.add('dark-theme-variables');
  
      break;
      case "light-mode":
        document.body.classList.remove('dark-theme-variables');
      
      break;
  }
    }, [colorMode])
   const currentPage = useParams();
   const currentUrl = Object.values(currentPage)[0].split("/")[1]
   const closeSidebar = () => {
sidebarRef.current.classList.add("litenote-sidebar-aside-close")
sidebarRef.current.style.display = "block";
   }
   let startX, startY, endX, endY;
   const minSwipeDistance = 50;
   const handleTouchStart = (event) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }
  const handleTouchEnd = (event) => {
      endX = event.changedTouches[0].clientX;
      endY = event.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
         return;
        } else {
    
      closeSidebar()
        }
      }
    }
   const clickSidebarMenu = () => {
         setDashboardToast(true)   
     
   }
   const dave = (e) => {
      console.log(e.target.innerText)
      if(e.target.innerText == "Notifications"){
         getNotificationsCount()
      }
      if(e.target.innerText == "Logout"){
         setOpenModal(true)
      }
      setDashboardToast(false)
      sidebarRef.current.classList.add("litenote-sidebar-aside-close")
sidebarRef.current.style.display = "block";
   }
   useEffect(()=> {
clickSidebarMenu()
   }, [currentUrl] )
      useEffect(() => {
      getNotificationsCount()
   }, [])
  return (
<>
<SpecialModal openModal={openModal} setOpenModal={setOpenModal} title="" content={<LogoutConsent

setOpenModal={setOpenModal} />} height={350} width={400}/>
<aside className="litenote-sidebar-aside"

ref={sidebarRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>

                    <div className="top" style={{ display : "flex", flexDirection : "row", alignItems : "center", position : width > 767 && "fixed",
                  
                    }}>
                        <div className="logo">
                      {  
                      loading ? 
                      <div className='sidebar-loaders sidebar-loaders-logo'></div>
                      : 
                      <img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1715858874/company/lgudp6d1efith51xwyev.png"} 
                         style={{width : "20%"}}
                         />
}
                         <h2 className="litenote-dashboard-h-two">Lite Note </h2>
                        </div>
             <div className="close" id="close-btn" onClick={closeSidebar}>

               <MdClose size={25}/>
             </div>
                    </div>

                    <div className={`sidebar ${user.role === "user" ? "this-is-a-user" : "this-is-not-a-user"}`}

                    >
                <Link to="/" className={`sidebar-links ${currentUrl === "home" && "active"}`} >
                    <FaHome size={24} />
                           <h3 className="litenote-dashboard-h-three">Home</h3>
        </Link> 
        <Link to="/feed" className={`sidebar-links ${currentUrl === "home" && "active"}`} >
                    <CgFeed size={24} />
                           <h3 className="litenote-dashboard-h-three">Feed</h3>
        </Link>
                 
                    <Link to="/dashboard/bookmarks"  className={`sidebar-links ${currentUrl === "bookmarks" && "active"}`}>
                    <MdBookmarks size={20} />
                           <h3 className="litenote-dashboard-h-three">Bookmarks</h3>
        </Link>
                      
                        
                      { user.role == "admin" &&  <Link to="/dashboard/users" className={`sidebar-links ${currentUrl === "users" && "active"}` } 
                           onClick={dave}
                        >
                        
                        <MdGroups size={24} />

                           <h3 className="litenote-dashboard-h-three"   >Users</h3>
                        </Link>
                     
                      }

                     {  user.role == "admin" && <Link  to="/dashboard/analytics"  className={`sidebar-links ${currentUrl === "analytics" && "active"}`}
                        onClick={dave}
                        >
                        <MdBarChart size={24} />
                           <h3 className="litenote-dashboard-h-three">Analytics</h3>
                        </Link>
                     
                     }
                        <Link to="/dashboard/publish" className={`sidebar-links ${currentUrl === "publish" && "active"}`} 
                        
                        onClick={dave}>
                        <MdAutoStories size={24} />

                           <h3 className="litenote-dashboard-h-three">Publish</h3>
                        </Link>
                        <Link to="/dashboard/messages" className={`sidebar-links ${currentUrl === "messages" && "active"}`}
                        
                        onClick={dave}>
                        <MdEmail size={24} />
                           <h3 className="litenote-dashboard-h-three">Messages</h3>
                           <span className="message-count">0</span>
                        </Link>
                        <Link to="/dashboard/profile" className={`sidebar-links ${currentUrl === "profile" && "active"}`} 
                        
                        onClick={dave}>
                        <MdPersonOutline size={24} />
                           <h3 className="litenote-dashboard-h-three">Profile</h3>
                        </Link>
                        
                       {user.role == "admin" && <Link to="/dashboard/reports" className={`sidebar-links ${currentUrl === "reports" && "active"}`} 
                        
                        onClick={dave}>
                        <MdReport size={24} />
                           <h3 className="litenote-dashboard-h-three">Reports</h3>
                        </Link>
                     
                       }
               
                        <Link to="/dashboard/notifications" className={`sidebar-links ${currentUrl === "notifications" && "active"}`}
                        
                        onClick={dave}>
                             <NotificationBadge fontSize={25} iconColor={"#7d8da1"} badgeColor={"var(--litenote-notification-badge-background)"}                          number={notificationsCount}
                        />
                     

                           <h3 className="litenote-dashboard-h-three" >Notifications</h3>
                           {/* <span className="message-count">26</span> */}
                        </Link>
                        <Link to="/dashboard/settings" className={`sidebar-links ${currentUrl === "settings" && "active"}`} 
                        
                        onClick={dave}>
                        <MdSettings size={24} />
                           <h3 className="litenote-dashboard-h-three">Settings</h3>
                        </Link>
                        
                        <Link href="/dashboard/logout"  className={`sidebar-links special-modal-client ${currentUrl === "logout" && "active"}`}
                           onClick={dave}
                           >
                        <MdLogout size={24} className="special-modal-client"/>
                           <h3 className="litenote-dashboard-h-three special-modal-client">Logout</h3>
                        </Link>
                       
                    </div>
                </aside>
</>
  )
}

export default SideBar
















import React from 'react'
import { useState } from 'react';
import { FaApple } from 'react-icons/fa';
import { FaGooglePlay } from 'react-icons/fa';
const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
      const [accordionOpen, setAccordionOpen] = useState(false)
      const toggleAccordion = (index) => {
        setAccordionOpen((prev) => ({
          ...prev,
          [index]: !prev[index],
        }));
      };
      const sidebarData = [
        {
          title : "Gift Cards",
          content :[
            {
              "image" : "https://ik.imagekit.io/rwgk2b4rf/Sell%20Gift%20Cards.svg?updatedAt=1746608979298",
              "title": "Sell Gift Cards",
              "description": "Exchange unused gift cards in Nigeria at amazing rates."
            },
            {
              "image" : "https://ik.imagekit.io/rwgk2b4rf/Travel%20Gift%20Cards.svg?updatedAt=1746608986861",
              "title": "Travel Gift Cards",
              "description": "Explore the world or create unique experiences at home."
            },
            {
              "image" : "https://ik.imagekit.io/rwgk2b4rf/Supermarket%20Gift%20Cards.svg?updatedAt=1746608980691",
              "title": "Supermarket Gift Cards",
              "description": "Buy anything from online supermarkets and stores."
            },
            {
              "image" : "https://ik.imagekit.io/rwgk2b4rf/Buy%20Gift%20Cards.svg?updatedAt=1746608972601",
              "title": "Buy Gift Cards",
              "description": "Buy from 14,000+ local and international gift cards."
            },
            {
              "image" : "https://ik.imagekit.io/rwgk2b4rf/Lifestyle%20Gift%20Cards.svg?updatedAt=1746608979312",
              "title": "Lifestyle Gift Cards",
              "description": "Purchase items from brands around the world."
            },
            {
              "image" : "https://ik.imagekit.io/rwgk2b4rf/Gaming%20Gift%20Cards.svg?updatedAt=1746608973210",
              "title": "Gaming Gift Cards",
              "description": "Access every possible game for your console."
            },
            {
              "image" : "https://ik.imagekit.io/rwgk2b4rf/Gift%20Card%20Rates.svg?updatedAt=1746608973187",
              "title": "Gift Card Rates",
              "description": "Discover the best rates for selling your gift card."
            },
            {
               "image" : "https://ik.imagekit.io/rwgk2b4rf/Music%20Gift%20Cards.svg?updatedAt=1746608979328",
              "title": "Music Gift Cards",
              "description": "Prepaid codes for any digital music platforms."
            },
            {
              "image" : "https://ik.imagekit.io/rwgk2b4rf/Streaming%20Gift%20Cards.svg?updatedAt=1746608979308",
              "title": "Streaming Gift Cards",
              "description": "Access subscriptions for your favorite streaming services."
            }
          ]
          
        },
        {
          title : "Products",
          content : 
            [
                {
                 "image" : "https://ik.imagekit.io/rwgk2b4rf/Just%20Gadgets.svg?updatedAt=1746608979280",
                  "title": "Just Gadgets",
                  "description": "Buy affordable gadgets from the comfort of your favourite app."
                },
                {
                  "image" : "https://ik.imagekit.io/rwgk2b4rf/Virtual%20Dollar%20Card.svg?updatedAt=1746608987836",
                  "title": "Virtual Dollar Card",
                  "description": "Shop online, pay for services, or make international purchases."
                },
                {
                  "image" : "https://ik.imagekit.io/rwgk2b4rf/Bill%20Payment.svg?updatedAt=1746608973230",
                  "title": "Bill Payment",
                  "description": "Organise and pay all your bills easily and seamlessly."
                },
                {
                  "image" : "https://ik.imagekit.io/rwgk2b4rf/Virtual%20Bank%20Account.svg?updatedAt=1746608987551",
                  "title": "Virtual Bank Account",
                  "description": "Open a Naira virtual bank account for easy topups."
                }
              
              
          ]
        },
        {
          title : "Explore",
          content : [
            {
              "image" : "https://ik.imagekit.io/rwgk2b4rf/Developer%20API.svg?updatedAt=1746608972836",
              "title": "Developer API",
              "description": "Integrate gift card services into your platform."
            },
            {
              "image" : "https://ik.imagekit.io/rwgk2b4rf/Blog.svg?updatedAt=1746608972816",
              "title": "Blog",
              "description": "Get the latest news, articles, and updates from Cardtonic."
            },
            {
              "image" : "https://ik.imagekit.io/rwgk2b4rf/Become%20A%20Partner.svg?updatedAt=1746608972863",
              "title": "Become A Partner",
              "description": "Launch a gifting program for your customers."
            },
            {
              "image" : "https://ik.imagekit.io/rwgk2b4rf/Become%20A%20Partner.svg?updatedAt=1746608972863",
              "title": "Upskill",
              "description": "MacBooks giveaway contest for tech enthusiasts."
            },
            {
              "image" : "https://ik.imagekit.io/rwgk2b4rf/_CTGivesBack.svg?updatedAt=1746608972609",
              "title": "#CTGivesBack",
              "description": "Learn about our community give-back initiatives."
            },
            {
              "image" : "https://ik.imagekit.io/rwgk2b4rf/Get%20In%20Touch.svg?updatedAt=1746608973149",
              "title": "Get In Touch",
              "description": "Reach out to us or follow us on social media."
            }
          ]
          
        },
      ]
  return (
    <div
    className={` flex lg:hidden flex-col fixed top-18 left-0  h-screen pb-[200px] overflow-y-auto 
    w-full bg-[#FFFFFFF2] transform transition-transform duration-600 ease-in-out z-40
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} backdrop-blur-lg `}
  >
    <div className="flex flex-col items-center w-full">
      <ul className="mt-4 space-y-4 text-lg">
      {
        sidebarData.map((content, index) => (
          <div key={index} className='justify-between items-center px-[20px] bg-[#F8F8F9]  min-w-[300px] py-[20px] rounded-2xl'
          onClick={() => toggleAccordion(index)}
          >
          <button
          className='flex justify-between w-full cursor-pointer '>
            <span className='text-[#002444;] font-light'>{content.title}</span>
            { accordionOpen[index] ? <span className='text-3xl text-[#002444;] font-light'>-</span>
            : <span className='text-3xl text-[#002444;] font-light'>+</span> }
          </button>
          <div className={`grid overflow-hidden transition-all duration-500
            ease-in-out text-slate-600 text-sm
            ${accordionOpen[index] ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className='overflow-hidden flex flex-col justify-between gap-[5px] mt-10'>
              {content.content.map((item, index) => (
                <div key={index} className='flex flex-row max-w-[300px] items-center justify-between gap-[20px] py-[20px]'>
                    <img src={item.image}/>
                    <div className='flex flex-col'>
                        <span className='text-[#002444] font-semibold text-[15px]'>{item.title}</span>
                        <span className=' text-[#1B507E] text-[15px] font-light'>{item.description}</span>
                    </div>
                </div>
              ))}
            </div>
          </div>
            
     </div>
        ))
      }
      </ul>
    </div>
    <div className='flex flex-col justify-between gap-[15px] items-center px-[20px] mt-[30px]'>
        <button className='bg-[#252525] flex flex-row text-white px-10 py-8 w-full rounded-full
      cursor-pointer'>
        <div className='flex flex-row items-center justify-center w-full gap-[10px]'>
        <span className='text-center'><FaApple className='text-white' size={30}/></span>
        <span className='text-[20px] text-center font-medium'>Get on iPhone</span>
        </div>
        </button>
        <button className='bg-[#086C30] flex flex-row text-white px-10 py-8 w-full rounded-full
         cursor-pointer'>
          <div className='flex flex-row items-center justify-center w-full gap-[10px]'>
          <span><FaGooglePlay className="text-white" size={25}/></span>
        <span className='text-[20px] font-medium'>Get on Android</span>
        </div>
        </button>
        <button className='bg-[#06284C] flex flex-row text-white px-10 py-8 w-full rounded-full
         cursor-pointer'>
          <div className='flex flex-row items-center justify-center w-full gap-[10px]'>
          <span><img src='https://ik.imagekit.io/rwgk2b4rf/svgexport-7%20(1).svg'/></span>
        <span className='text-[20px] font-medium'>Web Sign Up</span>
        </div>
        </button>
    </div>
  </div>

  )
}

export default Sidebar