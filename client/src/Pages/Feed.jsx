
import "../styles/components/Feed/feed.css"
import { MdBookmarks, MdCreate, MdFormatListBulleted, MdGridView,
    MdOutlineBookmarks,
    MdOutlineFavoriteBorder,
    MdOutlineBookmarkAdd,
    MdVisibility,

} from "react-icons/md";
import { FaEllipsisH, FaRegHeart } from "react-icons/fa";
import { MdMonitorHeart } from "react-icons/md";
import favour from "../assets/29.jpg"
import useColorMode from "../hooks/useColorMode";
import girly from "../assets/30.jpg"
import blackman from "../assets/3.jpg"
import { MdOutlineCreate } from "react-icons/md";

import gidiboy from "../assets/3.jpg"
import { FaHome,FaSearch, FaTimes } from "react-icons/fa";

import useWindowSize from "../hooks/useWindowSize";
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
const FeedPage = () => {
    const { colorMode } = useColorMode()
    console.log(colorMode)
    useEffect(() => {
        console.log(colorMode)
        if(colorMode == ""){
            console.log("ddhd")
        }
        // }
    switch (colorMode) {
      case "dark-mode":
        document.body.classList.add("dark-theme-variables")
        break;
        case "light-mode":
            document.body.classList.remove("dark-theme-variables")
        break;
    }
      }, [colorMode])
    const [view, setView] = useState({
        list : false,
        grid : true
    })
    const changeView = (e) => {
        if(e.currentTarget.closest("a") === null){
            setView({
                list : !view.list,
                grid : !view.grid
        })
    return;
    }
    switch (e.currentTarget.closest("a").innerText) {
        case "Grid":
            setView({
                list : false,
                grid : true
            })
            break;
            case "List":
                setView({
                    list : true,
                    grid : false
                })
            break;
            case undefined :
            console.log("Ddd") 
            setView({
                list : !view.list,
                grid : !view.grid
            })
            break;
    }
console.log()
    }
    const feedData = [
        {
image : "https://wallpapercave.com/wp/wp11326328.jpg",
category : "Technology",
title : "The Impact of Technology on the Workplace: How Technology is Changing",
avatar : favour,
author : "Gideon Babalola",
date : "April 12, 2025",
time : "3 min read"
        }, 
        {
            image : "https://wallpapercave.com/wp/wp11326335.jpg",
            category : "Technology",
            title : "The Impact of Technology on the Workplace: How Technology is Changing",
            avatar : blackman,
            author : "Gideon Babalola",
            date : "April 12, 2025",
            time : "3 min read"
                    }, 
                    {
                        image : "https://wallpapercave.com/wp/wp11326368.jpg",
                        category : "Technology",
                        title : "The Impact of Technology on the Workplace: How Technology is Changing",
                        avatar : favour,
                        author : "Gideon Babalola", 
                        date : "April 12, 2025",
                        time : "3 min read"
                                }, 
                                {
                                    image : "https://wallpapercave.com/wp/wp11326350.jpg",
                                    category : "Technology",
                                    title : "The Impact of Technology on the Workplace: How Technology is Changing",
                                    avatar : girly,
                                    author : "Gideon Babalola",
                                    date : "April 12, 2025",
                                    time : "3 min read"
                                            }, 
    ]
  const { width } = useWindowSize()
  return (
   <section className="total-feed">
   <div className="galacticus">
   <div className="phone-feed-sidebar-menu">
<ul className="phone-feed-sidebar-list">
    <li className="phone-feed-sidebar-item">
<Link className="phone-feed-sidebar-nav-link" to={"/dashboard/profile"}>
<img src={favour} alt="Author" className="feed-man"/>
<span className="phone-feed-sidebar-nav-name">Profile</span>
</Link>
    </li>
    <li className="phone-feed-sidebar-item">
<Link className="phone-feed-sidebar-nav-link" to={"/"}>
<FaHome className="phone-feed-sidebar-icon"  />
<span className="phone-feed-sidebar-nav-name">Home</span>
</Link>
    </li>
    <li className="phone-feed-sidebar-item">
<Link className="phone-feed-sidebar-nav-link" to={"/dashboard/bookmarks"}>

    <MdOutlineBookmarks className="phone-feed-sidebar-icon" />


<span className="phone-feed-sidebar-nav-name">Bookmarks</span>
</Link>
    </li>
    <li className="phone-feed-sidebar-item">
    <Link className={`phone-feed-sidebar-nav-link ${ view.list && "active-structure"}`} >
<MdFormatListBulleted className="phone-feed-sidebar-icon" onClick={changeView}  />
<span className="phone-feed-sidebar-nav-name">List</span>
</Link>
    </li>
    <li className="phone-feed-sidebar-item">
<Link className="phone-feed-sidebar-nav-link" to={"/dashboard/stories"}>
<MdOutlineCreate className="phone-feed-sidebar-icon" />
<span className="phone-feed-sidebar-nav-name">Write</span>
</Link>
    </li>
    <li className="phone-feed-sidebar-item">
<Link className={`phone-feed-sidebar-nav-link ${ view.grid && "active-structure"}`} >
<MdGridView className="phone-feed-sidebar-icon " onClick={changeView} />
<span className="phone-feed-sidebar-nav-name">Grid</span>
{/* <div className="feed-sidebar-icon" style={{background : "#F5F5F5", borderRadius : "50%"}}><MdGridView size={20} /></div> */}
</Link>
    </li>
</ul>
   </div>
   </div>
 
       <div className="feed-sidebar">
      
        <div className="feed-sidebar-icon">
        <Link to={"/dashboard/profile"}>

         <img src={favour} alt="Author" className="feed-man"/>

         </Link>
       </div>
        <div className="feed-sidebar-icon">
        <Link to={"/"}>
        <FaHome size={20} />
        </Link>
        </div>
        <div className="feed-sidebar-icon">
        <Link to={"/dashboard/bookmarks"}>
        <MdBookmarks size={20}  />
        </Link>
      
        </div>
        <div className="feed-sidebar-icon" style={{background : view.list && "var(--feed-sidebar-icon)", borderRadius : view.list && "50%",
        color : view.list ?  "var(--feed-sidebar-icon-color)" : "#757575"
        }}><MdFormatListBulleted 
        onClick={changeView}
        size={20} 
        /><span style={{display : "none"}} >list</span></div>
        <div className="feed-sidebar-icon">
        <Link to={"/dashboard/stories"}>
        <MdCreate size={20}  />
        </Link>
        </div>
        <div className="feed-sidebar-icon" 
        style={{background : view.grid && "var(--feed-sidebar-icon)", borderRadius : view.grid && "50%",
        color : view.grid ?  "var(--feed-sidebar-icon-color)" : "#757575"}}
        >
        <MdGridView size={20}
        onClick={changeView}
        
         /><span style={{display : "none"}}>grid</span></div>
    </div>
    <div className="feed-main-content">
        <div className="feed-header">
            <div className="feed-logo">Lite Note</div>
           { width < 768 &&<>
            {/* <FaSearch style={{position : "absolute", top : "20%", left : "5%", cursor :"pointer"}} />
            <input type="text" placeholder="Search Anything" className="feed-search-bar" /> */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
  <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
    <FaSearch style={{ position: 'absolute', left: '10px', cursor: 'pointer', bottom : "200px" }} />
    <input
      type="text"
      placeholder="Search Anything"
      className="feed-search-bar"
      style={{
        paddingLeft: '35px', // Add padding to the left to accommodate the search icon
        paddingRight: '35px', // Add padding to the right to accommodate the times icon
        width: '100%',
      }}
    />
    <FaTimes style={{ position: 'absolute', right: '10px', cursor: 'pointer' }} />
  </div>
</div>


           </> }
        </div>
        
        <div className="feed-tabs">
            <span className="feed-headman active">Recommended</span>
            <span
            className="feed-headman"
             >Following</span>
            <span 
            className="feed-headman"
           >Challenges</span>
        </div>
        <hr />
        
        {view.grid && <div className="feed-grid">
{feedData.map((content, index) => (
    <div className="feed-card" key={index}> 
                {/* <div className="feed-card-image"> */}
                    <img src={content.image}
                    className="feed-card-image"
                    ></img>
                {/* </div> */}
                <div className="feed-card-content">
                <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between"}}>
                    <div className="feed-card-tag">{content.category}</div>
                    
                   <span style={{display : "flex", gap : "15px", alignItems : "center"}}>
                    
                        <span style={{alignItems : "center"}}>
                    <MdOutlineFavoriteBorder/> 20
                    </span>
                    <span style={{alignItems : "center"}}>
                    <MdVisibility /> 30
                    </span>
                    <FaEllipsisH />
                    </span>
                    
                    </div>
                    <div className="feed-card-title" style={{marginBottom : "0px"}}>The Impact of Technology on the Workplace: How Technology is Changing</div>
                    
                    <div className="feed-card-meta">
                        {/* <span>3 min read</span> */}
                        <span>
                        <img src={content.avatar} alt="Author" />
                        <span>{content.author}</span>
                        </span>
                        <span>{content.date}</span>
                        <span style={{color : "#777777"}}>{content.time}</span>
                    </div>
                    
                </div>
            </div>
))

}          
        </div>}
        { view.list &&
        <>
        <div className="feed-list-view">
        {feedData.map((content, index) => (
            <>
            <div className="feed-list-view-card" key={index}>
<section className="list-view-card-first-section">
    <div className="list-view-card-profile-section">
    <span style={{display : "flex", flexDirection : "row", alignItems : "center", gap : "4px"}}>
    <img src={content.avatar}></img>
    <div style={{display :"flex", flexDirection : "column", justifyContent : "space-around"}}>
<span><b>{content.author}</b></span>
<span>Blogger</span>
    </div>


    </span>
    </div>
    <div className="list-view-card-story-section">
<h3>Your profile is stopping you from getting that job</h3>
<span>
Victor James Osimhen MON MFR is a Nigerian professional footballer who plays as a striker for Süper Lig club Galatasaray, on loan from 
Victor James Osimhen MON MFR is a Nigerian professional footballer who plays as a striker for Süper Lig club Galatasaray, on loan from
</span>
    </div>
    <div style={{display :"flex", flexDirection : "row",
    
    justifyContent: "space-between",
    paddingTop : "35px"
    }}>
    <span style={{display : "flex",
    flexDirection : "row",
    justifyContent : "space-between",
    gap  : "20px",
    color : "#777777"
    }}>
    <span>8 days ago</span>
    <span>34 min read</span>
     </span>
    <span style={{display : "flex",
    alignItems : "center",
    justifyContent : "space-between",
    gap : "20px"
    }}>
    <span><MdVisibility 
        color=" #333333"
        size={20}/> 30</span>
     <span>
     <MdOutlineFavoriteBorder size={20}
        color="#E0245E" /> 80
     </span>
        <span><MdOutlineBookmarkAdd 
        color="#4A90E2"
        size={20}/> 40</span>
        
       
        </span>
    </div>
</section>
<section
className="list-view-card-second-section"
><img
src={content.image}
>

</img></section>
</div>
<hr  style={{color : "#9CA3AF"}}/>

</>
        ))}



        </div>
        
        </>
        }
    </div>
        
    <div className="feed-right-sidebar">
  
    <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
  <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
    <FaSearch style={{ position: 'absolute', left: '10px', cursor: 'pointer', top : "12px" }} />
    <input
      type="text"
      placeholder="Search Anything"
      className="feed-search-bar"
      style={{
        paddingLeft: '35px', // Add padding to the left to accommodate the search icon
        paddingRight: '35px', // Add padding to the right to accommodate the times icon
        width: '100%',
      }}
    />
    <FaTimes style={{ position: 'absolute', right: '10px', cursor: 'pointer', top : "12px" }} />
  </div>
</div>

       <div className="feed-behind">
        <h3><b>Who to follow</b></h3>
        <div className="feed-follow-suggestion">
            <img src={favour} alt="Elon Jaman" />
            <div>
                <div><b>Elon Jaman</b></div>
                <div>Blogger Researcher Content Manager</div>
            </div>
            <button className="feed-follow-button">Follow</button>
        </div>
        <div className="feed-follow-suggestion">
            <img src={gidiboy} alt="Dogecoin" />
            <div>
                <div><b>Dogecoin</b></div>
                <div>Writer , Dogecoin Expert</div>
            </div>
            <button className="feed-follow-button">Follow</button>
        </div>
        <div className="feed-first">Show more</div>
    </div>

<div style={{marginTop  : "30px"}}>
    <h3><b>Trending Stories</b></h3>
        <div className="feed-trendy-story">
           
            <div>
            <section style={{display : "flex", flexDirection : "row", alignItems : "center", marginBottom  :"5px"}}>
            <img src={favour} alt="Elon Jaman" className="feed-profile-images" style={{width : "10px", height : "10px"}} />
            <div><b>Trending in Colombia</b> <span style={{color : ""}}>- 2 months</span></div>
            </section>
                <div>
                <b>The pros and cons of the new iPhone - Tips and tricks</b></div>
            </div>
            <img src={favour} alt="Trending in Colombia" />
        </div>
        </div>
        <div className="feed-trendy-story-image"></div>
        <div className="feed-first">Show more</div>
        <div style={{marginTop  : "30px"}}>
        <h3>Recommended Topic</h3>
        <div className="feed-topics">
            <span className="feed-topic">Technology</span>
            <span className="feed-topic">Money</span>
            <span className="feed-topic">Business</span>
            <span className="feed-topic">Productivity</span>
            <span className="feed-topic">Art</span>
            <span className="feed-topic">Mindfulness</span>
            <span className="feed-topic">Fitness</span>
            <span className="feed-topic">Love</span>
            <span className="feed-topic">Gaming</span>
        </div>
        </div>
     
    </div>
   </section>
  )
}

export default FeedPage