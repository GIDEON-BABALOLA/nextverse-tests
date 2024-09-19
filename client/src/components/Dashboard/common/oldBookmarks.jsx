import "../../../styles/components/Dashboard/bookmark-card.css"
import { FaEllipsisH } from "react-icons/fa";
import { FaRegBookmark, FaBookOpen, FaTimes, FaShareAlt } from "react-icons/fa";
import { MdClose, MdShare } from "react-icons/md";
import { useRef } from "react"
const BookmarkCard = () => {
  const settingsRef = useRef()
  
    // Sample data for stories
const stories = [
    {
      title: 'The Endless Joourney',
      excerpt: "A thrilling tale of adventure and self-discovery.A thrilling tale of adventure and self-discoveryA thrilling tale of adventure and self-discovery and self-discoveryA thrilling tale of adventure and self-discovery",
      category: 'Adventure',
      date : "April 3, 2022"
    },
    {
      title: 'The Endless Joooourney',
      excerpt: "A thrilling tale of adventure and self-discovery.A thrilling tale of adventure and self-discoveryA thrilling tale of adventure and self-discovery and self-discoveryA thrilling tale of adventure and self-discovery",
      category: 'Adventure',
        date : "April 3, 2022"
      
    },
    {
      title: 'The Endless oJourney',
      excerpt: "A thrilling tale of adventure and self-discovery.A thrilling tale of adventure and self-discoveryA thrilling tale of adventure and self-discovery and self-discoveryA thrilling tale of adventure and self-discovery",
      category: 'Adventure',
        date : "April 3, 2022"
    },
    {
      title: 'The Endless lJourney',
      excerpt: "A thrilling tale of adventure and self-discovery.A thrilling tale of adventure and self-discoveryA thrilling tale of adventure and self-discovery and self-discoveryA thrilling tale of adventure and self-discovery",
      category: 'Adventure',
        date : "April 3, 2022"
    },
    {
      title: 'The Endless kJourney',
      excerpt: "A thrilling tale of adventure and self-discovery.A thrilling tale of adventure and self-discoveryA thrilling tale of adventure and self-discovery and self-discoveryA thrilling tale of adventure and self-discovery",
      category: 'Adventure',
        date : "April 3, 2022"
    },
    {
      title: 'Love Conquers All',
      excerpt: "A thrilling tale of adventure and self-discovery.A thrilling tale of adventure and self-discoveryA thrilling tale of adventure and self-discovery and self-discoveryA thrilling tale of adventure and self-discovery",
      category: 'Romance',
        date : "April 3, 2022"
    },
    {
      title: 'The Untold Truth',
      excerpt: "A thrilling tale of adventure and self-discovery.A thrilling tale of adventure and self-discoveryA thrilling tale of adventure and self-discovery and self-discoveryA thrilling tale of adventure and self-discovery",
      category: 'Memoir',
        date : "April 3, 2022"
    },
    {
      title: 'The Mythical Realm',
      excerpt: "A thrilling tale of adventure and self-discovery.A thrilling tale of adventure and self-discoveryA thrilling tale of adventure and self-discovery and self-discoveryA thrilling tale of adventure and self-discovery",
      category: 'Fiction',
        date : "April 3, 2022"
    },
    {
      title: 'The Science Behind Miracles',
      excerpt: "A thrilling tale of adventure and self-discovery.A thrilling tale of adventure and self-discoveryA thrilling tale of adventure and self-discovery and self-discoveryA thrilling tale of adventure and self-discovery",
      category: 'Non-Fiction',
        date : "April 3, 2022"
    }
  ];
  const showSettings = () => {
  
    
  
  }
  return (
    <>

    {stories.map((story, index) => (
      <div className="litenote-browse-bookmark-card" key={index}>
<h3>{story.title}</h3>
<p>{story.excerpt}</p>
<hr className="line-divider"/>
<div className="bookmark-buttom">
<span>{story.date}</span>
<div>
<div className="bookmark-settings">
<FaEllipsisH  
style={{cursor: "pointer"}}
className="bookmark-card-button" 
onMouseEnter={showSettings}

/>
<ul className="bookmark-settings-menu" ref={settingsRef}>
<li><FaTimes />Close</li>
<li><FaBookOpen />Read</li>
<li><FaShareAlt />Share</li>
<li><FaRegBookmark />Unbookmark</li>
</ul>
</div>
</div>
</div>

        </div>
    ))}
    </>
  )
}

export default BookmarkCard