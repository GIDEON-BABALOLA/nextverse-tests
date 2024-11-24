
import { FaAngleDown } from "react-icons/fa"
const TrendingStories = () => {
  return (
    <section>
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
            <div className="feed-first">Show more <FaAngleDown /></div>
    </section>
  )
}

export default TrendingStories