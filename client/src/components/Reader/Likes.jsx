import { useGetStoryLikes } from "../../hooks/useGetStoryLikes"
import "../../styles/components/Reader/likes.css"
import { MdClose } from "react-icons/md"
import { lazy, useEffect, useRef,  useState } from "react"
import LikeCard from "./LikeCard"
const Likes = ({ id, likeModal, likesDrawerOpen, setLikeModal }) => {
  const { getStoryLikes, isLoading, error, data, statusCode, likesCount } = useGetStoryLikes()
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [loadingState, setLoadingState] = useState([{}, {}, {}, {}, {}])
  const [likes, setLikes] = useState([])
  const lastItemRef = useRef();
  const likesSectionRef = useRef();
  useEffect(() => {
    if(likeModal || likesDrawerOpen){
      const skip = (page * limit);
      if (skip >= likesCount && likesCount > 0) {
  return;
      }
        getStoryLikes(page, limit, id)
     }
  }, [page, limit, likeModal, likesDrawerOpen, id, likesCount])
  useEffect(() => {
    if(data.length > 0){
      if (data) {
      setLikes((prev) => {
        const newLikes = data.filter(
          (newLike) => !prev.some((prevLike) => prevLike._id === newLike._id)
        );
        return [...prev, ...newLikes];
      });
      }
    }

  
  }, [data,  likesCount, limit, page])
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
       console.log("I am intersecting")
            setPage((prevPage) => prevPage + 1);
          observer.unobserve(entry.target); // Pause observer to prevent duplicate triggers
        }
      },
      { threshold: 0.1, } // Adjust threshold as needed
    );
  
    if (lastItemRef.current && !isLoading) {
      observer.observe(lastItemRef.current);
    }
  
    return () => {
      if (lastItemRef.current) {
        observer.unobserve(lastItemRef.current);
      }
    };
  }, [lastItemRef, isLoading, data]);
  
  return (
   <section>
    <span style={{display : "flex", flexDirection : "row", alignItems : "center", justifyContent : "space-between"}}>
    <div style={{fontSize : "2rem"}} className="likes-title">Likes</div>
    <span onClick={() => { setLikeModal(!likeModal)}}
      style={{cursor : "pointer"}}
      className="likes-close-icon"
      >
    <MdClose size={30} 
      />
    </span>
    </span>

    <hr />
    <div className="likes-section" ref={likesSectionRef}>
{
        likes.map((like, index) => (
<LikeCard key={index} like={like} isLoading={false}/>
 
 
        ))
        }
        {
          isLoading &&
        loadingState.map((like, index) => (
          <LikeCard key={index} like={like} isLoading={true}/>
           
           
                  ))
                }
      
<div ref={lastItemRef}>

</div>
    </div>
   </section>
  )
}

export default Likes