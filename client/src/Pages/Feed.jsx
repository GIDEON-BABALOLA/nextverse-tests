
import "../styles/components/Feed/feed.css"
import { MdAccountCircle, MdBookmarks, MdCreate, MdFormatListBulleted, MdGridView  } from "react-icons/md";
import favour from "../assets/29.jpg"
import gidiboy from "../assets/3.jpg"
import { FaHome, FaSearch } from "react-icons/fa";
import useWindowSize from "../hooks/useWindowSize";
const FeedPage = () => {
  const { width } = useWindowSize()
  return (
   <section>
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
           { width < 768 && <input type="text" placeholder="Search" className="feed-search-bar" /> }
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
                    <div className="feed-card-tag">Technology</div>
                    <div className="feed-card-title">The Impact of Technology on the Workplace: How Technology is Changing</div>
                    <div className="feed-card-meta">
                        <span>3 min read</span>
                        <img src="img.jpg" alt="Author" />
                        <span>Tracey Wilson</span>
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
    <input type="text" placeholder="Search Anything" className="feed-search-bar" />
    <FaSearch style={{position : "absolute", top : "5.5%", left : "85%", cursor :"pointer"}} />
       <div className="feed-behind">
        <h3><b></b>Who to follow</h3>
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
                <div>Trending in Colombia . 2 months</div>
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