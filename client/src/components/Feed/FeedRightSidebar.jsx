import { FaSearch, FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom"
const FeedRightSidebar = () => {
  return (
    <div className="feed-right-sidebar">
  
    <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
  <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
    <FaSearch className="search-mag" />
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
    <FaTimes
    className="searchX" />
  </div>
</div>

       <div className="feed-behind">
        <h3><b>Who to follow</b></h3>
        <div className="feed-follow-suggestion">
            <img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"} alt="Elon Jaman" />
            <div>
                <div><b>Elon Jaman</b></div>
                <div>Blogger Researcher Content Manager</div>
            </div>
            <button className="feed-follow-button">Follow</button>
        </div>
        <div className="feed-follow-suggestion">
            <img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"} alt="Dogecoin" />
            <div>
                <div><b>Dogecoin</b></div>
                <div>Writer , Dogecoin Expert</div>
            </div>
            <button className="feed-follow-button">Follow</button>
        </div>
        <div className="feed-first"><Link
        style={{textDecoration : "none", color : "#7380EC", cursor : "pointer"}}
         to={"/follow-suggestions"}>Show more</Link>
        </div>
    </div>

<div style={{marginTop  : "30px"}}>
    <h3><b>Trending Stories</b></h3>
        <div className="feed-trendy-story">
           
            <div>
            <section style={{display : "flex", flexDirection : "row", alignItems : "center", marginBottom  :"5px"}}>
            <img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"} alt="Elon Jaman" className="feed-profile-images" style={{width : "10px", height : "10px"}} />
            <div><b>Trending in Colombia</b> <span style={{color : ""}}>- 2 months</span></div>
            </section>
                <div>
                <b>The pros and cons of the new iPhone - Tips and tricks</b></div>
            </div>
            <img src={"https://res.cloudinary.com/doctr0fct/image/upload/v1730507575/Avatars/yxuavl3ckq9ziaw0kavl_ow59tp.jpg"} alt="Trending in Colombia" />
        </div>
        </div>
        <div className="feed-trendy-story-image"></div>
        <div className="feed-first">Show more</div>
        <div style={{marginTop  : "30px"}}>
        <h3>Recommended Topic</h3>
        <div className="feed-topics">
            <span className="feed-topic">Technology</span>
            <span className="feed-topic">Fiction</span>
            <span className="feed-topic">Adventure</span>
            <span className="feed-topic">Nonfiction</span>
            <span className="feed-topic">Romance</span>
            <span className="feed-topic">Memoir</span>
        </div>
        </div>
     
    </div>
  )
}

export default FeedRightSidebar