import {  MdOutlineFavoriteBorder, MdVisibility, MdOutlineBookmarkAdd} from "react-icons/md"
import { FaEllipsisH } from "react-icons/fa"
import { useEffect, useState } from "react"
import useWindowSize from "../../../hooks/useWindowSize"
import "../../../styles/components/Dashboard/feed-card.css"
import useImageLoad from "../../../hooks/useImageLoaded"
const FeedCard = ({ content, view }) => {
  const { width }  = useWindowSize()
  const [loading, setLoading] = useState(true)
  
  const { loaded, error } = useImageLoad(content.image);
  useEffect(() => {
    if (error) {
      console.log("failed to load images")
    }
  
    if (loaded === true) {
    setLoading(false)
    }
  }, [loaded, error])
  return (
    <>
    {
      view == "grid" ? 
      <>
    {
      
      loading ?  
    
    
      <div className="litenote-profile-story-card" style={{background : "var(--feed-card-background)"}}>
            <div className="litenote-profile-story-card-inner">
              <div className="litenote-profile-story-image">
                <div  className="skeleton-image caller" />
              </div>
              <div className="litenote-profile-story-content">
                <h4 className="litenote-profile-story-title skeleton-title">&nbsp;</h4>
                <p className="litenote-profile-story-category skeleton-subtitle">&nbsp;</p>
                <FaEllipsisH  className="litenote-profile-read-more-share skeleton-options"  />
              
                <a  className="litenote-profile-read-more skeleton-button">&nbsp;</a>
             
              </div>
            </div>
          </div>  
     : 
      <div className="feed-card"> 
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

}

    </>
      : <>
        {loading ? 
        <div>
          <div className="feed-list-view-card">
<section className="list-view-card-first-section">
    <div className="list-view-card-profile-section">
    <span style={{display : "flex", flexDirection : "row", alignItems : "center", gap : "4px"}}>
    {/* <img src={content.avatar}></img> */}
    <div className=" skeleton-image skeleton-image-avatar"></div>
    <div style={{display :"flex", flexDirection : "column", justifyContent : "space-around"}}>
<span className="skeleton-image skeleton-image-author"><b></b></span>
<span className="skeleton-image skeleton-image-bio"></span>
    </div>


    </span>
    </div>
    <div className="list-view-card-story-section">
<h3 className="skeleton-image skeleton-image-title"></h3>
<h3 className="skeleton-image skeleton-image-first"></h3>
<h3 className="skeleton-image skeleton-image-second"></h3>
<h3 className="skeleton-image skeleton-image-third"></h3>
    </div>
    { width > 768 && <div style={{display :"flex", flexDirection : "row",
    
    justifyContent: "space-between",
    paddingTop : "35px"
    }}>
    <span style={{display : "flex",
    flexDirection : "row",
    justifyContent : "space-between",
    gap  : "20px",
    color : "#777777"
    }}>
    <span className="skeleton-image skeleton-image-author"></span>
    <span className="skeleton-image skeleton-image-author"></span>
   
     </span>
    <span style={{display : "flex",
    alignItems : "center",
    justifyContent : "space-between",
    gap : "20px"
    }}>
    <span><MdVisibility 
        color=" #333333"
        size={20}/></span>
     <span>
     <MdOutlineFavoriteBorder size={20}
        color="#E0245E" /> 
     </span>
        <span><MdOutlineBookmarkAdd 
        color="#4A90E2"
        size={20}/></span>
        
       
        </span>
    </div>}
</section>
<section
className="list-view-card-second-section"
>
<div className="skeleton-image"></div>

</section>
</div>
{ width < 768 &&
  <div style={{display :"flex", flexDirection : "row",
    
    justifyContent: "space-between",
    paddingTop : "5px"
    }}>
    <span style={{display : "flex",
    flexDirection : "row",
    justifyContent : "space-between",
    gap  : "20px",
    color : "#777777"
    }}>
    <span className="skeleton-image skeleton-image-author"></span>
    <span className="skeleton-image skeleton-image-author"></span>
     </span>
    <span style={{display : "flex",
    alignItems : "center",
    justifyContent : "space-between",
    gap : "20px"
    }}>
    <span><MdVisibility 
        color=" #333333"
        size={20}/></span>
     <span>
     <MdOutlineFavoriteBorder size={20}
        color="#E0245E" />
     </span>
        <span><MdOutlineBookmarkAdd 
        color="#4A90E2"
        size={20}/></span>
        
       
        </span>
    </div>
}
</div>
         : 
         <div>
          <div className="feed-list-view-card">
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
{ width < 768 ? <h6>
<b>
Your profile is stopping you from getting that job
</b>
</h6> : <h3>Your Profile is stopping you from getting that job</h3>} 
<span>
{content.content.slice(0, width < 768 ? 100 : 200)  + "..." }
</span>
    </div>
    { width > 768 && <div style={{display :"flex", flexDirection : "row",
    
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
    </div>}
</section>
<section
className="list-view-card-second-section"
><img
src={content.image}
>

</img></section>

</div>
{ width < 768 &&
  <div style={{display :"flex", flexDirection : "row",
    
    justifyContent: "space-between",
    paddingTop : "5px"
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
}
</div>

        }
      </>
    }
    </>
 
  )
}

export default FeedCard