
import "../styles/components/Feed/feed.css"
import { MdAccountCircle, MdBookmarks, MdCreate, MdFormatListBulleted, MdGridView  } from "react-icons/md";
import favour from "../assets/29.jpg"
import gidiboy from "../assets/3.jpg"
import { FaHome, FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import useWindowSize from "../hooks/useWindowSize";
import { Link } from "react-router-dom"
import { useRef } from "react"
const FeedPage = () => {
  const { width } = useWindowSize()
  const navExpand = useRef()
  const navExpandList = useRef()
  const navExpandIcon = useRef()
  const showExpand = () => {
    console.log("Dd")
    navExpandList.current.classList.toggle("show-list")
    console.log(navExpandIcon)
  }
  return (
   <section>
   <nav className="phone-feed-nav">
<ul className="phone-feed-nav-list">
<li >
<Link className="phone-feed-nav-link">
<MdAccountCircle size={20} />
</Link>
</li>
<li>
<Link className="phone-feed-nav-link">
<FaHome size={20} />
</Link>
</li>
<li>
    <button className="phone-feed-nav-expand" id="phone-feed-nav-expand" ref={navExpand} onClick={showExpand}>
<FaPlus style={{ transform: 'rotate(45deg)' }} 
id="phone-feed-nav-expand-icon" className="phone-feed-nav-expand-icon" ref={navExpandIcon}/>
    </button>
    <ul className="phone-feed-nav-expand-list" ref={navExpandList}>
<li>
<Link className="phone-feed-nav-expand-link" >
    <MdGridView />
    <span>Grid View</span>
</Link>
</li>
<li>
<Link className="phone-feed-nav-expand-link" >
    <MdFormatListBulleted />
    <span>List View</span>
</Link>
    </li>
    </ul>
</li>

<li>
<Link className="phone-feed-nav-link">
<MdBookmarks size={20} />
</Link>
</li>
<li>
<Link className="phone-feed-nav-link">
<MdCreate size={20} />
</Link>

</li>
</ul>
   </nav>
       <div className="feed-sidebar">
        <div className="feed-sidebar-icon"><MdAccountCircle size={20} /></div>
        <div className="feed-sidebar-icon"><FaHome size={20} /></div>
        <div className="feed-sidebar-icon"><MdBookmarks size={20}  /></div>
        <div className="feed-sidebar-icon"><MdFormatListBulleted size={20}  /></div>
        <div className="feed-sidebar-icon"><MdCreate size={20} /></div>
        <div className="feed-sidebar-icon"><MdGridView size={20} /></div>
    </div>
    <div className="feed-main-content">
        <div className="feed-header">
            <div className="feed-logo">Lite Note</div>
           { width < 768 &&<>
            {/* <FaSearch style={{position : "absolute", top : "20%", left : "5%", cursor :"pointer"}} />
            <input type="text" placeholder="Search Anything" className="feed-search-bar" /> */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
  <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
    <FaSearch style={{ position: 'absolute', left: '10px', cursor: 'pointer' }} />
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
            <span>Recommended</span>
            <span>Following</span>
            <span>Challenges</span>
        </div>
        <hr />
        
        <div className="feed-grid">
            <div className="feed-card">
                <div className="feed-card-image"></div>
                <div className="feed-card-content">
                <div style={{display : "flex", flexDirection : "row", justifyContent : "space-between"}}>
                    <div className="feed-card-tag">Technology</div>
                    <span style={{color : "#777777"}}>3 min read</span>
                    </div>
                    <div className="feed-card-title" style={{marginBottom : "0px"}}>The Impact of Technology on the Workplace: How Technology is Changing</div>
                    
                    <div className="feed-card-meta">
                        {/* <span>3 min read</span> */}
                        <span>
                        <img src={favour} alt="Author" />
                        <span>Tracey Wilson</span>
                        </span>
                        <span>August 20, 2022</span>
                    </div>
                </div>
            </div>
            <div className="feed-card">
                <div className="feed-card-image"></div>
                <div className="feed-card-content">
                    <div className="feed-card-tag">Technology</div>
                    <div className="feed-card-title">The Impact of Technology on the Workplace: How Technology is Changing</div>
                    <div className="feed-card-meta">
                        <span>3 min read</span>
                        <img src="img.jpg" alt="Author" />
                        <span>Jason Francisco</span>
                        <span>August 20, 2022</span>
                    </div>
                </div>
            </div>
            <div className="feed-card">
                <div className="feed-card-image"></div>
                <div className="feed-card-content">
                    <div className="feed-card-tag">Technology</div>
                    <div className="feed-card-title">The Future of AI in Healthcare</div>
                    <div className="feed-card-meta">
                        <span>5 min read</span>
                        <img src="img.jpg" alt="Author" />
                        <span>Sarah Johnson</span>
                        <span>August 22, 2022</span>
                    </div>
                </div>
            </div>
            <div className="feed-card">
                <div className="feed-card-image"></div>
                <div className="feed-card-content">
                    <div className="feed-card-tag">Business</div>
                    <div className="feed-card-title">Remote Work: The New Normal?</div>
                    <div className="feed-card-meta">
                        <span>4 min read</span>
                        <img src="img.jpg" alt="Author" />
                        <span>Michael Brown</span>
                        <span>August 23, 2022</span>
                    </div>
                </div>
            </div>
            <div className="feed-card">
                <div className="feed-card-image"><img src="imgjpg" alt="" /></div>
                <div className="feed-card-content">
                    <div className="feed-card-tag">Productivity</div>
                    <div className="feed-card-title">5 Time Management Techniques for Busy Professionals</div>
                    <div className="feed-card-meta">
                        <span>6 min read</span>
                        <img src="img.jpg" alt="Author" />
                        <span>Emily Chen</span>
                        <span>August 25, 2022</span>
                    </div>
                </div>
            </div>
            <div className="feed-card">
                <div className="feed-card-image"></div>
                <div className="feed-card-content">
                    <div className="feed-card-tag">Mindfulness</div>
                    <div className="feed-card-title">The Benefits of Daily Meditation</div>
                    <div className="feed-card-meta">
                        <span>4 min read</span>
                        <img src="img.jpg" alt="Author" />
                        <span>David Lee</span>
                        <span>August 26, 2022</span>
                    </div>
                </div>
            </div>
        </div>
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